// UploadDocument.jsx
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 
import { uploadDocumentForOwner } from "../Services/users"; 

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a file");

    const formData = new FormData();
    formData.append("document", file);

    const userId = localStorage.getItem("userId");

    try {
      await uploadDocumentForOwner(formData, userId); 
      toast.success("Document uploaded successfully!");
      navigate("/login"); // Navigate to login after successful upload
    } catch (err) {
      toast.error("Upload failed!");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Upload Document</h3>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          className="form-control mb-3"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="btn btn-primary" type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadDocument;