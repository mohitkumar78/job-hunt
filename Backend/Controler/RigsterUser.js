import { User } from "../Models/userShema.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import cloudinary from '../Utils/Cloudinary.js'
dotenv.config();

export const register = async (req, res) => {
    try {


        const { name, email, fullname, PhoneNumber, password, role } = req.body;

        // Check if required fields are missing

        if (!name || !email || !fullname || !PhoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        // Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        let profileImgUri = '';
        // If a file is included, upload it to Cloudinary using the buffer
        if (req.file) {
            console.log("File received:", req.file.originalname);

            // Wrap the upload stream in a Promise
            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: 'image' },
                    (error, result) => {
                        if (error) {
                            console.error("Error uploading to Cloudinary:", error);
                            return reject(new Error("File upload failed"));
                        }
                        resolve(result.secure_url);
                    }
                );
                uploadStream.end(req.file.buffer);  // Pass the buffer from multer
            });

            profileImgUri = uploadResult;
            console.log("Uploaded file to Cloudinary:", profileImgUri);
        } else {
            console.log("No file found in the request");
        }

        // Create a new user
        const newUser = new User({
            name,
            email,
            fullname,
            PhoneNumber,
            Password: password,
            role,
            profile: {
                profileImg: profileImgUri,  // Assign the uploaded image URL
                resume: req.body.resume || null
            }
        });

        // Save the user to the database

        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: newUser
        });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};



export const login = async (req, res) => {
    try {

        const { email, password, role } = req.body;


        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.Password);

        if (isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect password",
                success: false
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "User does not exist with this role",
                success: false
            });
        }

        const tokenData = { userId: user._id };



        if (!process.env.SECRET_KEY) {
            throw new Error('Secret key is not set in environment variables');
        }

        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
            expiresIn: "30d"
        });

        user = {
            _id: user._id,
            token: token,
            fullname: user.fullname,
            PhoneNumber: user.PhoneNumber,
            role: user.role,
            email: user.email,
            profile: user.profile,

        };


        res.status(200).cookie("token", token, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        }).json({
            user,
            message: `Welcome back ${user.fullname}`,
            success: true
        });

    } catch (error) {
        console.error("Error occurred while logging in:", error.message);
        res.status(500).json({
            message: "Server error occurred",
            success: false
        });
    }
};

export const logout = async (req, res) => {

    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json(
            {
                message: 'Logout Sucessfully',
                success: true
            }
        )
    }
    catch (error) {
        console.log("error is occur while logout", error.message)
    }
}

export const Updateuser = async (req, res) => {
    console.log("Update request received");
    try {
        const { fullname, email, PhoneNumber, bio, skills } = req.body;



        const userid = req.id || req.params.id; // Ensure correct user ID source

        // Convert skills to an array if provided
        let skillArray;
        if (skills) {
            skillArray = skills.split(",").map(skill => skill.trim()); // Trim spaces for cleaner data
        }

        // Find the user by ID
        let user = await User.findById(userid);

        // Check if user exists
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }

        // Update user properties if they are provided
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (PhoneNumber) user.PhoneNumber = PhoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillArray;

        // Handle file upload if a file exists
        let resumeUri = user.profile.resume; // Default to current resume

        if (req.file) {


            const resourceType = req.file.mimetype === 'application/pdf' ? 'raw' : 'image';  // Use 'raw' for PDFs

            // Upload to Cloudinary
            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: resourceType }, // 'image' for images, 'raw' for PDFs
                    (error, result) => {
                        if (error) {
                            console.error("Error uploading to Cloudinary:", error);
                            return reject(error);
                        }
                        resolve(result);
                    }
                );
                uploadStream.end(req.file.buffer);  // Pass the buffer from multer
            });

            resumeUri = uploadResult.secure_url;

        }

        // Update the resume if a new file was uploaded
        user.profile.resume = resumeUri;
        user.profile.resumeFullName = req.file.originalname

        // Save the updated user data
        await user.save();
        console.log(user.profile.resume)
        // Prepare the response object
        const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            PhoneNumber: user.PhoneNumber,
            role: user.role,
            email: user.email,
            profile: user.profile,  // Send entire profile object
        };

        // Send a success response
        return res.status(200).json({
            user: updatedUser,
            message: "Profile Updated Successfully",
            success: true
        });

    } catch (error) {
        console.error("Error occurred while updating user:", error);
        return res.status(500).json({
            message: "Server error occurred while updating user",
            success: false
        });
    }
};
