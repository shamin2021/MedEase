import "../../styles/Table.css";
import React, { useState, useEffect } from 'react';
import { GridItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Switch, Input, Box, Text, Image } from '@chakra-ui/react';
import useAuth from "../../hooks/useAuth";

const Table = ({ data }) => {

    const { auth } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);

    const handleBtnClick = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    };

    const downloadPrescription = (image) => {
        const link = document.createElement('a');
        link.href = `data:image/png;base64, ${image}`;
        link.download = 'prescription.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <>
            <div className=" h-3/4 m-1 ml-9">
                <div className=" flex mt-4 text-[17px] font-medium sticky top-3 p-1">
                    <div className="w-1/5 m-1">Prescription ID</div>
                    <div className="w-1/5 m-1">Provided By</div>
                    <div className="w-1/5 m-1">Provided On</div>
                    <div className="w-2/5 m-1 text-center">Manage</div>
                </div>
                <hr className="w-7/8 mx-auto mt-1 mb-0" />
                <div>
                    <div className=" h-96 overflow-y-scroll mb-2">
                        {data.length > 0 ? data.sort((a, b) => b.prescription_id - a.prescription_id).map((item) => (
                            <>
                                <div className=" flex mt-4 text-[15px] font-medium hover:bg-primary p-1 rounded-lg hover:">
                                    <div className="w-1/5 m-1 flex ">{item.prescription_id} </div>
                                    <div className="w-1/5 m-1">{item.doctorName}</div>
                                    <div className="w-1/5 m-1">{item.givenDate}</div>
                                    <div className="w-2/5 m-1 text-center">
                                        <button className="p-2 bg-primary hover:bg-[#7ebcef] hover:text-white rounded-md border-4 border-white" onClick={handleBtnClick}>
                                            View
                                        </button>
                                    </div>
                                    <Modal isOpen={modalOpen} onClose={closeModal}>
                                        <ModalOverlay />
                                        <ModalContent maxWidth="100vw" width="auto" mx={[4, 8, 16]} my={[4, 8, 12]} >
                                            <ModalBody>
                                                <Box>
                                                    <Box mb={2}>
                                                        <Image src={item.prescription ? `data:image/png;base64, ${item.prescription}` : null} className="mx-auto p-1 h-[300px] w-[250px] rounded-xl" />
                                                    </Box>
                                                </Box>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button colorScheme="blue" mr={3} onClick={closeModal}>
                                                    Close
                                                </Button>
                                                <Button colorScheme="teal" onClick={() => downloadPrescription(item.prescription)}>
                                                    Download
                                                </Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </div>
                            </>
                        )) : <div className="mt-5 text-center text-sm">No Prescriptions To Display</div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Table;