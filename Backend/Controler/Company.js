
import { Company } from '../Models/company.model.js'

import cloudinary from "../Utils/Cloudinary.js"
import dotenv from 'dotenv'
dotenv.config()
export const RigisterCompany = async (req, res) => {

    try {
        const { CompanyName, description, website, location } = req.body
        const logo = req.file
        if (!CompanyName) {
            return res.status(400).json({
                message: "company name is missing",
                success: false
            })
        }

        let company = await Company.findOne({ name: CompanyName })

        if (company) {
            return res.status(400).json({
                message: "You can't register same company",
                success: false
            })
        }

        company = await Company.create({
            name: CompanyName,
            description: description,
            website: website,
            location: location,
            userId: req.id

        })

        return res.status(200).json(
            {
                company,
                message: "Company Register Sucessfully",
                success: true
            }
        )


    } catch (error) {
        console.log("error occur while rigister the company")
        return res.status(400).json(
            {
                message: "Internal server error",
                success: false
            }
        )
    }

}
export const getCompany = async (req, res) => {
    try {
        console.log("req is come for comapny")
        const userId = req.id;
        console.log(userId)
        if (!userId) {
            return res.status(400).json({
                message: "user id is not provided",
                success: false
            })
        }
        console.log("fetching----")
        const comapnies = await Company.find({ userId });
        console.log(comapnies)
        if (!comapnies) {
            return res.status(404).json({
                message: "internal server error",
                success: false
            })
        }

        return res.status(200).json(
            {
                comapnies,
                message: "comapnies are found",
                success: true
            }

        )

    } catch (error) {
        console.log("error in getcompanies", error)
        res.status(400).json({
            message: "error occur in code",
            success: false
        })
    }

}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id
        const company = await Company.findById(companyId)
        console.log(company)
        if (!company) {
            return res.status(400).json({
                message: "comapany not found",
                success: false
            })
        }
        return res.status(200).json(
            {
                company,
                message: "company found",
                success: true
            }
        )
    } catch (error) {
        console.log("error in finding comapnie by id controller", error)
        return res.status(400).json(
            {
                message: "internal server error",
                success: false
            }
        )
    }
}

export const findCompanyAndUpdate = async (req, res) => {
    try {
        const { CompanyName, description, website, location } = req.body;
        const companyId = req.params.id;
        console.log("Request received for updating company:", companyId);

        // Check for missing fields
        if (!CompanyName || !description || !website || !location) {
            console.log("Missing fields");
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            });
        }

        let logouri = "";

        // If there's a file, upload it to Cloudinary
        if (req.file) {
            console.log("File detected, starting Cloudinary upload");
            const resourceType = req.file.mimetype === 'application/pdf' ? 'raw' : 'image';

            try {
                const uploadResult = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        { resource_type: resourceType },
                        (error, result) => {
                            if (error) {
                                console.error("Error uploading to Cloudinary:", error);
                                return reject(error);
                            }
                            resolve(result);
                        }
                    );
                    uploadStream.end(req.file.buffer);
                });

                logouri = uploadResult.secure_url || "";
                console.log("Cloudinary upload successful:", logouri);
            } catch (cloudinaryError) {
                console.error("Cloudinary upload failed:", cloudinaryError);
                return res.status(500).json({
                    message: "Failed to upload file",
                    success: false,
                });
            }
        }

        // Update the company in the database
        const findCompany = await Company.findById(companyId);

        if (!findCompany) {
            console.log("Company not found or internal error");
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }

        findCompany.name = CompanyName || findCompany.name;
        findCompany.description = description || findCompany.description;
        findCompany.website = website || findCompany.website;
        findCompany.location = location || findCompany.location;
        findCompany.logo = logouri || findCompany.logo;

        await findCompany.save();

        console.log("Company updated successfully");

        // Return success response
        return res.status(200).json({
            findCompany,
            message: "Company updated successfully",
            success: true,
        });

    } catch (error) {
        console.error("Error in updating company", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
