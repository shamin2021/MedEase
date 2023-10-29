import React, { useState, useEffect } from 'react';
import useAxiosMethods from '../../hooks/useAxiosMethods';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useLocation } from "react-router-dom";
import ButtonImage from "../../components/Button";
import { GridItem } from '@chakra-ui/react';

const MOBILE_REGEX = /^(?:\+94|0)?[0-9]{9,10}$/;
const EMAIL_REGEX = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;

function HLCSetting() {

    const [image, setImage] = useState(null);
    const [mobileNumber, setMobileNumber] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [mohArea, setMohArea] = useState('');
    const [phmArea, setPhmArea] = useState('');
    const [phiArea, setPhiArea] = useState('');
    const [gnDivision, setGnDivision] = useState('');
    const [dsDivision, setDsDivision] = useState('');
    const [gnNumber, setGnNumber] = useState('');
    const [incharge, setIncharge] = useState('');
    const [designation, setDesignation] = useState('');
    const [inchargeMail, setInchargeMail] = useState('');
    const [inchargeMobile, setInchargeMobile] = useState('');
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

        if (!MOBILE_REGEX.test(inchargeMobile)) {
            setState({ message: "Please enter valid incharge mobile number" });
            return;
        }

        if (!EMAIL_REGEX.test(inchargeMail)) {
            setState({ message: "Please enter valid incharge mail" });
            return;
        }

        const prevImage = convertBase64ToFile(user.image).name;

        try {
            if (image != null && image.name !== prevImage) {
                const formData = new FormData();
                formData.append("mobileNumber", mobileNumber);
                formData.append("image", image);
                formData.append("longitude", longitude);
                formData.append("latitude", latitude);
                formData.append("mohArea", mohArea);
                formData.append("phmArea", phmArea);
                formData.append("phiArea", phiArea);
                formData.append("gnDivision", gnDivision);
                formData.append("dsDivision", dsDivision);
                formData.append("gnNumber", gnNumber);
                formData.append("incharge", incharge);
                formData.append("inchargeMail", inchargeMail);
                formData.append("inchargeMobile", inchargeMobile);
                formData.append("designation", designation);
                put(`/hlc/updateProfileWithImage/${auth.user_id}`, formData, setState, true);
            }
            else {
                put(`/hlc/updateProfile/${auth.user_id}`, { mobileNumber, longitude, latitude, moh_area: mohArea, phm_area: phmArea, phi_area: phiArea, gn_division: gnDivision, ds_division: dsDivision, gn_number: gnNumber, in_charge: incharge, in_charge_email: inchargeMail, in_charge_mobile: inchargeMobile, in_charge_designation:designation }, setState);
            }

        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }


    }

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
        try {
            get(`/hlc/getHlcProfile/${auth.user_id}`, setUser);

        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }, []);

    useEffect(() => {
        console.log(user);
        if (user.image != null) {
            setImage(convertBase64ToFile(user.image));
        }
        setMobileNumber(user.mobileNumber);
        setLongitude(user.longitude);
        setLatitude(user.latitude);
        setMohArea(user.moh_area);
        setPhmArea(user.phm_area);
        setPhiArea(user.phi_area);
        setGnDivision(user.gn_division);
        setDsDivision(user.ds_division);
        setGnNumber(user.gn_number);
        setIncharge(user.in_charge);
        setDesignation(user.in_charge_designation);
        setInchargeMail(user.in_charge_email);
        setInchargeMobile(user.in_charge_mobile);
    }, [user]);

    return (

        <GridItem
            colSpan={6}
            rowSpan={1}
            borderRadius="lg"
            p="4"
        >
            <div className="w-3/4 mx-auto mt-[5%]">
                <div className=" m-3 bg-white mt-5 rounded-md p-5 ">

                    <div>
                        <div className="px-4 sm:px-0">
                            <h3 className="text-3xl font-semibold leading-7 text-gray-900 text-center">Personal Profile</h3>
                        </div>
                        <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                {update && state ? state.message : null}
                                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">HLC Name</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{user.hlc_name}</dd>
                                    <ButtonImage name="Add Image" setImage={setImage} image={image} />
                                </div>

                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>

                                </div>

                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Mobile Number</dt>
                                    <input className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 py-0" type="text" value={mobileNumber != null ? mobileNumber : ''} onChange={(e) => setMobileNumber(e.target.value)} />
                                </div>

                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Longitude</dt>
                                    <input className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 py-0" type="number" value={longitude != null ? longitude : ''} onChange={(e) => setLongitude(e.target.value)} />
                                </div>

                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Latitude</dt>
                                    <input className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 py-0" type="number" value={latitude != null ? latitude : ''} onChange={(e) => setLatitude(e.target.value)} />
                                </div>

                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">MOH Area</dt>
                                    <input className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 py-0" type="text" value={mohArea != null ? mohArea : ''} onChange={(e) => setMohArea(e.target.value)} />
                                </div>

                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">PHM Area</dt>
                                    <input className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 py-0" type="text" value={phmArea != null ? phmArea : ''} onChange={(e) => setPhmArea(e.target.value)} />
                                </div>

                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">PHI Area</dt>
                                    <input className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 py-0" type="text" value={phiArea != null ? phiArea : ''} onChange={(e) => setPhiArea(e.target.value)} />
                                </div>

                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">GN Division</dt>
                                    <input className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 py-0" type="text" value={gnDivision != null ? gnDivision : ''} onChange={(e) => setGnDivision(e.target.value)} />
                                </div>

                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">DS Division</dt>
                                    <input className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 py-0" type="text" value={dsDivision != null ? dsDivision : ''} onChange={(e) => setDsDivision(e.target.value)} />
                                </div>

                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">GN NUmber</dt>
                                    <input className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 py-0" type="number" value={gnNumber != null ? gnNumber : ''} onChange={(e) => setGnNumber(e.target.value)} />
                                </div>

                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Incharge</dt>
                                    <input className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 py-0" type="text" value={incharge != null ? incharge : ''} onChange={(e) => setIncharge(e.target.value)} />
                                </div>

                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Designation</dt>
                                    <input className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 py-0" type="text" value={designation != null ? designation : ''} onChange={(e) => setDesignation(e.target.value)} />
                                </div>

                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Incharge Email</dt>
                                    <input className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 py-0" type="text" value={inchargeMail != null ? inchargeMail : ''} onChange={(e) => setInchargeMail(e.target.value)} />
                                </div>

                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Incharge Mobile</dt>
                                    <input className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 py-0" type="text" value={inchargeMobile != null ? inchargeMobile : ''} onChange={(e) => setInchargeMobile(e.target.value)} />
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

export default HLCSetting;
