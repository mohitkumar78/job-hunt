import multer from 'multer';

// Memory storage for multer
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Allow images and PDFs
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);  // Accept file
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.'), false);
    }
};

const upload = multer({
    storage,
    fileFilter
});

export default upload;
