import { useState, useEffect } from "react";
import logo from "../assets/photo-camera.png";
import "../styles/FormInput.css";

const FileInput = ({name, setImage, image}) => {

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    console.log(image);
    if (image) {
      setImageUrl(URL.createObjectURL(image));
    }
  }, [image]);

  return (
    <>
      <input
        accept="image/*"
        type="file"
        id="select-image"
        style={{ display: "none" }}
        onChange={(e) => setImage(e.target.files[0])}
      />
      <label htmlFor="select-image">
        {imageUrl && image ? (
          <div>
            <img
              className="rounded-[100px] mx-auto h-[80px] w-[80px] "
              src={imageUrl}
              alt={image.name}
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
            <div className="rounded-[2px] mx-auto h-[80px] w-[80px] bg-[#f0f0f0]">
              <img htmlFor="select-image" src={logo} className="mx-auto p-3 " />
            </div>
            <div
              className="text-[16px] text-[#353434] text-center p-1"
              variant="contained"
              color="primary"
              component="span"
            >
              {name}
            </div>
          </div>
        )}
      </label>
    </>
  );
};

export default FileInput;
