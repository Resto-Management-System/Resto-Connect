// UploadDocument.jsx
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router"; 
import { uploadDocumentForOwner } from "../Services/users"; 

const UploadDocument = () => {
    
    const [files, setFiles] = useState({
        licenseFile: null,
        idCardFile: null,
        menuFile: null,
        restaurantImages: [],
    });

    const navigate = useNavigate();

    // Handler for a single file input (license, id card, menu)
    const handleFileChange = (e) => {
        setFiles({
            ...files,
            [e.target.name]: e.target.files[0],
        });
    };

    // Handler for the multiple images input
    const handleImageChange = (e) => {
        setFiles({
            ...files,
            restaurantImages: Array.from(e.target.files),
        });
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        // Check if all required files are present
        if (!files.licenseFile || !files.idCardFile || files.restaurantImages.length === 0) {
            toast.error("Please upload the license, ID card, and at least one restaurant image.");
            return;
        }

        const formData = new FormData();
        const userId = localStorage.getItem("userId");
        
        // Append all files to the FormData object with specific keys
        formData.append("license", files.licenseFile);
        formData.append("idCard", files.idCardFile);
        
        // Only append the menu if a file was selected
        if (files.menuFile) {
            formData.append("menu", files.menuFile);
        }

        // Append all restaurant images. Multer will handle this as an array on the server side.
        files.restaurantImages.forEach((image) => {
            formData.append("restaurantImages", image);
        });

        try {
            // Assume the service function takes the FormData and userId
            await uploadDocumentForOwner(formData, userId);
            toast.success("All documents and images uploaded successfully!");
            navigate("/login"); 
        } catch (err) {
            console.error("Upload error:", err);
            toast.error("Failed to upload all files. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4">Upload Documents and Images</h3>
            <form onSubmit={handleUpload}>
                <div className="mb-3">
                    <label className="form-label">Restaurant License</label>
                    <input
                        type="file"
                        name="licenseFile"
                        className="form-control"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Owner's Aadhar/PAN Card</label>
                    <input
                        type="file"
                        name="idCardFile"
                        className="form-control"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Restaurant Images (multiple)</label>
                    <input
                        type="file"
                        name="restaurantImages"
                        className="form-control"
                        onChange={handleImageChange}
                        multiple
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Restaurant Menu (Optional)</label>
                    <input
                        type="file"
                        name="menuFile"
                        className="form-control"
                        onChange={handleFileChange}
                    />
                </div>
                <button className="btn btn-primary" type="submit">
                    Upload All
                </button>
            </form>
        </div>
    );
};
export default UploadDocument;