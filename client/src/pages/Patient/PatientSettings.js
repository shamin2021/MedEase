import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosMethods from '../../hooks/useAxiosMethods';
import useAuth from '../../hooks/useAuth';
import ButtonImage from "../../components/Button";
import { GridItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Switch, Input, Box, Text } from '@chakra-ui/react';

const MOBILE_REGEX = /^(?:\+94|0)?[0-9]{9,10}$/;

function PatientSetting() {

    const [image, setImage] = useState(null);
    const [reason, setReason] = useState(null);
    const [mobileNumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('');
    const [emergencyName, setEmergencyName] = useState('');
    const [emergencyContact, setEmergencyContact] = useState('');
    const [hlcList, setHlcList] = useState([]);
    const [selectedHlc, setSelectedHlc] = useState(null);
    const [state, setState] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const [user, setUser] = useState([]);
    const [requested, setRequested] = useState(false);
    const [requestState, setRequestState] = useState(null);
    const { get, put, post } = useAxiosMethods();
    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleUpdate = () => {

        setUpdate(true);

        if (!MOBILE_REGEX.test(mobileNumber)) {
            setState({ message: "Please enter valid mobile number" });
            return;
        }

        if (!MOBILE_REGEX.test(emergencyContact)) {
            setState({ message: "Please enter valid emergency contact number" });
            return;
        }

        const prevImage = convertBase64ToFile(user.image).name;

        try {
            if (image != null && image.name !== prevImage) {
                const formData = new FormData();
                formData.append("mobileNumber", mobileNumber);
                formData.append("image", image);
                formData.append("emergencyName", emergencyName);
                formData.append("emergencyContact", emergencyContact);
                formData.append("address", address);
                put(`/patient/updateProfileWithImage/${auth.user_id}`, formData, setState, true);
            }
            else {
                put(`/patient/updateProfile/${auth.user_id}`, { mobileNumber, emergencyName, emergencyContact, address }, setState);
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
            get(`/patient/getPatientProfile/${auth.user_id}`, setUser);
            get(`/meetings/getHLCForSchedule`, setHlcList);

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
        setAddress(user.address);
        setEmergencyContact(user.emergencyContact);
        setEmergencyName(user.emergencyName);
        setRequested(user.requested === 1 ? true : false);
    }, [user]);

    const handleHLCChange = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
        setSelectedHlc(null);
        setReason(null);
    };

    const requestHLCChange = () => {
 
        if (selectedHlc != null && reason != null) {
            try {
                post(`/patient/changeHLCRequest/${auth.user_id}`, {hlc_id:selectedHlc, reason}, setRequestState);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
            setRequested(true);
            closeModal();
        }

    }


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
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Full Name</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{user.firstname + " " + user.lastname}</dd>
                                    <ButtonImage name="Add Image" setImage={setImage} image={image} />
                                </div>

                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
                                </div>

                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Gender</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.gender}</dd>
                                </div>

                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Date of Birth</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.dob}</dd>
                                </div>

                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Assigned HLC Name</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{user.hlc_name}</dd>
                                    <Modal isOpen={modalOpen} onClose={closeModal}>
                                        <ModalOverlay />
                                        <ModalContent maxWidth="90vw" width="auto" mx={[4, 8, 16]} my={[4, 8, 12]} >
                                            <ModalBody>
                                                <Box>
                                                    <Box mb={2}>
                                                        <span>HLC:  </span>
                                                        <select value={selectedHlc} onChange={(e) => setSelectedHlc(e.target.value)}>
                                                            <option value="">Choose One</option>
                                                            {hlcList.map((hlc) => (
                                                                <option key={hlc.hlc_id} value={hlc.hlc_id}>
                                                                    {hlc.hlc_name}
                                                                </option>
                                                            ))}
                                                        </select>

                                                    </Box>
                                                    <Box mb={2}>
                                                        <span className='mb-4'>Reason:  </span>
                                                        <input type='text' value={reason} onChange={(e) => setReason(e.target.value)} className='w-full' />
                                                    </Box>
                                                </Box>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button colorScheme="blue" mr={3} onClick={closeModal}>
                                                    Close
                                                </Button>
                                                <Button colorScheme="teal" onClick={requestHLCChange}>
                                                    Request
                                                </Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                    <button
                                        type="submit"
                                        onClick={handleHLCChange}
                                        disabled={requested}
                                        className="rounded-md bg-indigo-400 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        {requested ? "Requested" : "Request Change"}
                                    </button>
                                </div>

                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Mobile Number</dt>
                                    <input className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 py-0" type="text" value={mobileNumber != null ? mobileNumber : ''} onChange={(e) => setMobileNumber(e.target.value)} />
                                </div>


                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Current Address</dt>
                                    <input className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 py-0" type="text" value={address != null ? address : ''} onChange={(e) => setAddress(e.target.value)} />
                                </div>

                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Emergency Contact Name</dt>
                                    <input className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 py-0" type="text" value={emergencyName != null ? emergencyName : ''} onChange={(e) => setEmergencyName(e.target.value)} />
                                </div>

                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Emergency Contact Number</dt>
                                    <input className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 py-0" type="text" value={emergencyContact != null ? emergencyContact : ''} onChange={(e) => setEmergencyContact(e.target.value)} />
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

export default PatientSetting;
