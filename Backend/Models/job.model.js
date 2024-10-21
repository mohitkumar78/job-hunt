import mongoose from "mongoose";
const jobSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        requirements: [
            {
                type: String,
                required: true,
            },
        ],
        salary: {  // Corrected spelling
            type: Number,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        jobType: {
            type: String,
            required: true,
        },
        opening: {
            type: Number,
            required: true,
        },
        experience: {  // Corrected spelling
            type: Number,
            required: true,
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        applications: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Application", // Ensure proper casing and reference to Application model
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
