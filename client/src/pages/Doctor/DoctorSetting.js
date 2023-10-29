import React, { useEffect, useState } from 'react';
import { GridItem } from '@chakra-ui/react';
import ButtonImage from "../../components/Button";
import useAxiosMethods from '../../hooks/useAxiosMethods';
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from '../../hooks/useAuth';

const MOBILE_REGEX = /^(?:\+94|0)?[0-9]{9,10}$/;

function DoctorSetting() {

    const [image, setImage] = useState(null);
    const [mobileNumber, setMobileNumber] = useState('');
    const [state, setState] = useState(null);
    const [update, setUpdate] = useState(false);
    const [user, setUser] = useState([]);
    const { get, put } = useAxiosMethods();
    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleUpdate = () => {

        setUpdate(true);

        if (!MOBILE_REGEX.test(mobileNumber)) {
            setState({ message: "Please enter valid mobile number" });
            return;
        }

        const prevImage = convertBase64ToFile(user.image).name;

        try {
            if (image != null && image.name !== prevImage) {
                const formData = new FormData();
                formData.append("mobileNumber", mobileNumber);
                formData.append("image", image);
                put(`/doctors/updateProfileWithImage/${auth.user_id}`, formData, setState, true);
            }
            else {
                put(`/doctors/updateProfile/${auth.user_id}`, { mobileNumber }, setState);
            }

        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }


    }

    useEffect(() => {
        try {
            get(`/doctors/getDoctorProfile/${auth.user_id}`, setUser);

        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }, []);

    const convertBase64ToFile = (base64String) => {
        // to decode Base64 string
        const binaryData = new Uint8Array(atob(base64String).split('').map(char => char.charCodeAt(0)));
        //create a Blob and defiine properties
        const blob = new Blob([binaryData]);
        const fileName = "new_file.jpg";
        const lastModified = Date.now();
        const size = binaryData.length;
        const file = new File([blob], fileName, { lastModified, type: 'image/jpeg', size });

        return file;

    }

    useEffect(() => {
        if (user.image != null) {
            setImage(convertBase64ToFile(user.image));
        }
        setMobileNumber(user.mobileNumber);
    }, [user]);

    return (

        <GridItem
            colSpan={6}
            rowSpan={1}
            borderRadius="lg"
            p="4"
        >
            <div className=" h-screen w-3/4 mx-auto mt-[5%]">
                <div className=" m-3 bg-white mt-5 rounded-md p-5 ">

                    <div>
                        <div className="px-4 sm:px-0">
                            <h3 className="text-3xl font-semibold leading-7 text-gray-900 text-center">Personal Profile</h3>
                        </div>
                        <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                {update && state ? state.message : null}
                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Full Name</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">Dr. {user.firstname + " " + user.lastname}</dd>
                                    <ButtonImage name="Add Image" setImage={setImage} image={image} />
                                </div>

                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Specialised in</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.doctor_speciality}</dd>
                                </div>

                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">License Number</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.licenseNumber}</dd>
                                </div>

                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Mobile Number</dt>
                                    <input className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" type="text" value={mobileNumber != null ? mobileNumber : ''} onChange={(e) => setMobileNumber(e.target.value)} />
                                </div>

                            </dl>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button
                                    type="submit"
                                    onClick={handleUpdate}
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </GridItem>
    );
}

export default DoctorSetting;
