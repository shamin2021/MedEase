import { useState, useEffect } from "react";
import logo from "../assets/photo-camera.png";
import "../styles/FormInput.css";

const FileInput = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  return (
    <>
      <input
        accept="image/*"
        type="file"
        id="select-image"
        style={{ display: "none" }}
        onChange={(e) => setSelectedImage(e.target.files[0])}
      />
      <label htmlFor="select-image">
        {imageUrl && selectedImage ? (
          <div>
            <img
              className="rounded-[100px] mx-auto h-[80px] w-[80px] "
              src={imageUrl}
              alt={selectedImage.name}
            />
            <div
              className="text-[16px] text-[#353434] text-center p-1"
              variant="contained"
              color="primary"
              component="span"
            >
              Edit Image
            </div>
          </div>
        ) : (
          <div>
            <div className="rounded-[2px] mx-auto h-[80px] w-[80px] bg-[#afafaf]">
              <img htmlFor="select-image" src={logo} className="mx-auto p-3 " />
            </div>
            <div
              className="text-[16px] text-[#353434] text-center p-1"
              variant="contained"
              color="primary"
              component="span"
            >
              Add Prescription
            </div>
          </div>
        )}
      </label>
    </>
  );
};

export default FileInput;
