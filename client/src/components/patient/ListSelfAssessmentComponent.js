import React, { useEffect, useState } from "react";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import { useNavigate, useLocation, } from "react-router-dom";
import { GridItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Switch, Input, Box, Text } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";

const ListSelfAssessmentComponent = () => {
  const { auth } = useAuth();
  const [res, setRes] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModelContent] = useState('');

  const { get } = useAxiosMethods();
  const navigate = useNavigate();
  const location = useLocation();

  const [selfassessments, setSelfAssessments] = useState([]);

  const loggedInUser = {
    "user_id": auth.user_id
  };

  useEffect(() => {
    try {
      get(`/SelfAssessments`, setSelfAssessments);
    } catch (err) {
      console.error(err);
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, []);

  useEffect(() => {
    console.log(res);
  }, [res]);

  useEffect(() => {
    console.log(selfassessments);
  }, [selfassessments]);


  // to make sure only per 30 day risk assessment can be done
  const handleAssessment = () => {
    setModalOpen(true);

    if (filteredSelfAssessments.length > 0 && filteredSelfAssessments[0].risk === "PENDING" && filteredSelfAssessments[0].diabetes_risk=== "PENDING") {
      setModalOpen(true);
      setModelContent("Please Complete Assessment In Progress");
    }
    // else if (filteredSelfAssessments.length > 0 && ((new Date() - new Date(filteredSelfAssessments[0].date)) / (1000 * 60 * 60 * 24)) <= 30) {
    //   setModalOpen(true);
    //   setModelContent("Please Wait A Month To Complete New Risk Assessment");
    // } 
    else {
      navigate("/CreateSelfAssessment");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setModelContent("");
  }


  const showPrescriptions = () => {
    navigate(`/PatientPrescriptions/${auth.user_id}`);
  }

  const filteredSelfAssessments = selfassessments.filter(selfassessment => selfassessment.patient === loggedInUser.user_id).sort((a, b) => b.id - a.id);

  return (
    <GridItem colSpan={6} >
      <div className="h-screen py-1 bg-primary mt-[5%]">
        <div className="parent md:w-3/4 h-3/4 mx-auto shadow-xl rounded-md bg-white m-3 mt-9 p-5 ">
          <div className="flex">
            <h2 className="text-left ml-5 w-3/4">Risk Assessments </h2>
            <div className="flex gap-[60px]">
              <div className="w-1/4">
                <button
                  className="btn btn-primary text-[18px] bg-primary p-2 font-semibold"
                  onClick={showPrescriptions}
                >
                  Prescriptions
                </button>
              </div>
              <div className="w-3/4">
                <button
                  className="btn btn-primary text-[18px] bg-primary p-2 font-semibold"
                  onClick={handleAssessment}
                >
                  Add Risk Assessment
                </button>
                <Modal isOpen={modalOpen} onClose={closeModal}>
                  <ModalOverlay />
                  <ModalContent maxWidth="90vw" width="auto" mx={[4, 8, 16]} my={[4, 8, 12]} >
                    <ModalBody>
                      <Box>
                        <Box mb={2}>
                          <span>{modalContent !== '' ? modalContent : ''}</span>
                        </Box>
                      </Box>
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={closeModal}>
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
            </div>
          </div>

          <hr className="m-3 mt-2"></hr>
          <div className="flex h-3/4 ">
            <br></br>
            <div className="md:w-3/4 h-full shadow-xl rounded-md  m-3 mb-1">
              <div className="text-left text-[20px] pb-2  ml-5">
                Previous Assessments
              </div>
              <div className="h-full">
                <div className=" flex text-[18px] text-[#797878] font-medium sticky p-1 ml-5 text-left">
                  <div className="w-1/3 m-1 ">Assessment ID</div>
                  <div className="w-1/3 m-1 ">Assessment Created</div>
                  <div className="w-1/3 m-1 ">Actions</div>
                </div>
                <hr className=" md:w-4/5  ml-5" />
                <div className="max-h-60 overflow-y-scroll">
                  <table className="table-auto">
                    <tbody>
                      {filteredSelfAssessments.map(selfassessment => (
                        <>
                          <tr key={selfassessment.id} className="flex text-[18px] font-medium sticky p-1 text-left ml-5">
                            <div className="w-1/3 m-1"><td> {selfassessment.id} </td></div>
                            <div className="w-1/3 m-1"><td> {selfassessment.date} </td></div>
                            <div className="w-1/3 m-1">
                              <td>
                                <button
                                  onClick={() =>
                                    navigate(
                                      `/view-SelfAssessment/${selfassessment.id}`
                                    )
                                  }
                                  className="btn w-1/3 bg-primary pl-1 pr-1 rounded-lg"
                                >
                                  View{" "}
                                </button>
                              </td>
                            </div>
                          </tr>
                          <hr className="md:w-4/5 ml-5" />
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>

            <div className="md:w-1/4 shadow-xl h-full m-3 mb-1 rounded-md">
              <div className="mt-3">
                <div className="w-3/4 mx-auto mt-3 rounded-md text-[18px]  bg-[#fdc9c9] p-2 font-semibold">
                  {filteredSelfAssessments.length > 0 ? (
                    filteredSelfAssessments[0].risk
                  ) : (
                    <p>Not Submitted</p>
                  )}
                  <div className=" text-[#797878] text-[16px]  font-medium">
                    Recent Cardiovascular Risk
                  </div>
                </div>

                <div className="w-3/4 mx-auto mt-3 rounded-md text-[18px]  bg-[#fdc9c9] p-2 font-semibold">
                  {filteredSelfAssessments.length > 0 ? (
                    filteredSelfAssessments[0].diabetes_risk
                  ) : (
                    <p>Not Submitted</p>
                  )}
                  <div className=" text-[#797878] text-[16px]  font-medium">
                    Recent Diabetes Risk
                  </div>
                </div>

                <div className="w-3/4 mx-auto mt-3 rounded-md text-[17px] bg-primary p-2 font-semibold">
                  {filteredSelfAssessments.length > 0 ? filteredSelfAssessments.length : 0}
                  <div className=" text-[#797878] text-[16px]  font-medium">
                    Assessments
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GridItem>
  );
};

export default ListSelfAssessmentComponent;
