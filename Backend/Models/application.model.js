import mongoose from "mongoose";
const applicationSchema = mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,  // Change from array to single ObjectId
        ref: "Job",                            // Ensure correct case sensitivity
        required: true
    },
    applicants: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

export const Application = mongoose.model('Application', applicationSchema);
