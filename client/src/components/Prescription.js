import { useState, useEffect } from "react";
import logo from "../assets/photo-camera.png";
import "../styles/FormInput.css";

const PrescriptionInput = ({ name, setImage, image }) => {

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
                            className="mx-auto h-[400px] w-[600px] "
                            src={imageUrl}
                            alt={image.name}
                        />
                    </div>
                ) : (
                    <div>
                        <div className="rounded-[2px] mx-auto h-[400px] w-[400px] bg-[#f0f0f0]">
                            <img htmlFor="select-image" src={logo} className="mx-auto" />
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

export default PrescriptionInput;
