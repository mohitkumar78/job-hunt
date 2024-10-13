import { User } from "../Models/userShema.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
    try {
        console.log("req came")
        const { name, email, fullname, PhoneNumber, password, role } = req.body;
        console.log(name, email, fullname, PhoneNumber, password, role)
        // Check if any required fields are missing
        if (!name || !email || !fullname || !PhoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
        console.log(name)
        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        const newUser = new User({
            name,
            email,
            fullname,
            PhoneNumber,
            Password: password,
            role,
            profile: {
                profileImg: req.file ? req.file.path : "", // Assuming multer file handling
                resume: req.body.resume ? req.body.resume : null
            }
        });

        // Save the new user to the database
        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: newUser
        });
    } catch (error) {
        console.error("Error while registering:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


export const login = async (req, res) => {
    try {

        const { email, password, role } = req.body;
        console.log(email, password, role)

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
        console.log(isPasswordMatch === false)
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
    console.log("Update request coming");
    try {
        const { fullname, email, PhoneNumber, bio, skills } = req.body;
        console.log(fullname, email, PhoneNumber, bio, skills);

        const userid = req.id || req.params.id; // Ensure this is the correct ID source

        // Convert skills to array if provided
        let skillArray;
        if (skills) {
            skillArray = skills.split(",").map(skill => skill.trim()); // Trim spaces for cleaner data
        }

        // Find the user by ID
        let user = await User.findById(userid); // Use the correct user ID

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

        // Save the updated user data
        await user.save(); // Await this call to ensure it's completed

        // Prepare the response object
        const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            PhoneNumber: user.PhoneNumber,
            role: user.role,
            email: user.email,
            profile: user.profile, // Send entire profile object
        };

        // Send a success response
        return res.status(200).json({
            user: updatedUser,
            message: "Profile Updated Successfully",
            success: true
        });

    } catch (error) {
        console.error("Error occurred while updating user:", error); // Improved error message
        return res.status(500).json({
            message: "Server error occurred while updating user",
            success: false
        });
    }
};
