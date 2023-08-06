import React, { useState } from "react";
import "../styles/FormInput.css";
import ButtonImage from "../components/Button";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  border,
  Center,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
const steps = [
  { title: "General", description: "Contact Info" },
  { title: "PHI Area", description: "Date & Time" },
  { title: "Incharge", description: "Select Rooms" },
];

const Form1 = () => {
  return (
    <>
      <form className="mt-0">
        <div className="container flex">
          <div className="container w-3/4">
            <div className="formInput">
              <label className="form-label">
                Name <text className="text-[#ff2727]">*</text>
              </label>
              <input type="text" id="username" className="form-input" />
              <span className="AddHLC"></span>
            </div>
            <div className="formInput">
              <label className="form-label">
                Mobile Number <text className="text-[#ff2727]">*</text>
              </label>
              <input type="text" id="username" className="form-input" />
              <span></span>
            </div>
          </div>
          <div className="container ml-3 pt-5 justify-right w-1/4">
            <ButtonImage />
          </div>
        </div>
        <div className="container flex">
          <div className="container justify-right">
            <div className="formInput" id="right">
              <label className="form-label">
                Email <text className="text-[#ff2727]">*</text>
              </label>
              <input type="text" id="username" className="form-input" />
              <span></span>
            </div>
          </div>
        </div>
        <div className="formInput">
          <label className="form-label">
            MOH Area <text className="text-[#ff2727]">*</text>
          </label>
          <input type="text" id="username" className="form-input" />
          <span></span>
        </div>
      </form>
    </>
  );
};

const Form2 = () => {
  return (
    <>
      <form className="mt-0">
        <div className="container flex">
          <div className="container">
            <div className="formInput">
              <label className="form-label">
                PHM Area <text className="text-[#ff2727]">*</text>
              </label>
              <input type="text" id="username" className="form-input" />
              <span></span>
            </div>
          </div>
          <div className="container ml-3 justify-right">
            <div className="formInput" id="right">
              <label className="form-label">
                PHI Area <text className="text-[#ff2727]">*</text>
              </label>
              <input type="text" id="username" className="form-input" />
              <span></span>
            </div>
          </div>
        </div>
        <div className="formInput">
          <label className="form-label">
            GN Division <text className="text-[#ff2727]">*</text>
          </label>
          <input type="text" id="username" className="form-input" />
          <span></span>
        </div>
        <div className="formInput" id="right">
          <label className="form-label">
            DS Division <text className="text-[#ff2727]">*</text>
          </label>
          <input type="text" id="username" className="form-input" />
          <span></span>
        </div>
        <div className="formInput">
          <label className="form-label">
            GN Number <text className="text-[#ff2727]">*</text>
          </label>
          <input type="text" id="username" className="form-input" />
          <span></span>
        </div>
      </form>
    </>
  );
};

const Form3 = () => {
  return (
    <>
      <form className="mt-0">
        <div className="container flex">
          <div className="container">
            <div className="formInput">
              <label className="form-label">
                Name of Incharge <text className="text-[#ff2727]">*</text>
              </label>
              <input type="text" id="username" className="form-input" />
              <span></span>
            </div>
            <div className="formInput">
              <label className="form-label">
                Designation <text className="text-[#ff2727]">*</text>
              </label>
              <input type="text" id="username" className="form-input" />
              <span></span>
            </div>
          </div>
        </div>
        <div className="container flex">
          <div className="container justify-right">
            <div className="formInput" id="right">
              <label className="form-label">
                Email <text className="text-[#ff2727]">*</text>
              </label>
              <input type="text" id="username" className="form-input" />
              <span></span>
            </div>
          </div>
        </div>
        <div className="formInput">
          <label className="form-label">
            Mobile Number <text className="text-[#ff2727]">*</text>
          </label>
          <input type="text" id="username" className="form-input" />
          <span></span>
        </div>
      </form>
    </>
  );
};

const AddHLC = (props) => {

    const toast = useToast();
    const [step, setStep] = useState(0);
    const [progress, setProgress] = useState(33.33);

    const { activeStep } = useSteps({
      index: 0,
      count: step,
    });

  return (
    <div className="h-94 py-1 bg-primary">
      <div className="md:w-1/2 h-[26rem] mx-auto shadow-xl rounded-2xl pb-2 py-1 bg-white mt-1 ">
        <div className="container horizontal justify-center text-xs py-1">
          <div className="flex justify-center text-lg font-medium m-3 mb-0">
            HLC Registration
          </div>
          <div className="flex justify-center font-light text-stone-800- text-[14px] text-[#797878]">
            Register the HLC here with the relevant details
          </div>
          <hr className="w-2/3 mx-auto mt-1 mb-0" />
        </div>
        <div className="container horizontal mx-auto mb-0 w-96 justify-left text-xs py-1">
          <Stepper index={step} className="w-3/4 mx-auto">
            {steps.map((step, index) => (
              <Step key={index}>
                <div>
                  <StepStatus
                    complete={
                      <>
                        <StepIndicator
                          className="bg-[#c9c9c9] border-none"
                          height={6}
                          width={6}
                        >
                          <StepIcon
                            fontSize={15}
                            className="text-white text-sm"
                          />
                        </StepIndicator>
                      </>
                    }
                    incomplete={
                      <StepIndicator
                        className="bg-[#c9c9c9] w-10 border-none"
                        height={6}
                        width={6}
                      >
                        <StepNumber
                          fontSize={15}
                          className="text-white text-sm"
                        />
                      </StepIndicator>
                    }
                    active={
                      <StepIndicator
                        className="w-10 border-red-200"
                        height={6}
                        width={6}
                      >
                        <StepNumber
                          fontSize={15}
                          className="text-white text-sm"
                          color={"#645bee"}
                        />
                      </StepIndicator>
                    }
                  />
                  <div className="mx-auto">
                    <StepTitle
                      className="mx-auto"
                      fontSize={12}
                      color={"#b3b3b3"}
                    >
                      {step.title}
                    </StepTitle>
                  </div>
                </div>
                <StepSeparator className="mb-3" />
              </Step>
            ))}
          </Stepper>
          {step === 0 ? <Form1 /> : step === 1 ? <Form2 /> : <Form3 />}
          <ButtonGroup w="100%" mb="5%">
            <Flex w="100%" justifyContent="space-between">
              <Flex className="mx-auto">
                <Button
                  onClick={() => {
                    setStep(step - 1);
                    setProgress(progress - 33.33);
                  }}
                  isDisabled={step === 0}
                  variant="solid"
                  w="4rem"
                  mr="5%"
                  mt="0%"
                  backgroundColor="#645bee"
                  color={"white"}
                  h="1.5rem"
                  borderRadius={20}
                  fontSize={16}
                >
                  Back
                </Button>
                {step === 2 ? (
                  <div className="w-40 text-center">
                    <Button
                      w="6rem"
                      h="1.5rem"
                      float={"center"}
                      mt="0%"
                      fontSize={16}
                      colorScheme="red"
                      borderRadius={20}
                      onClick={() => {
                        setStep(step + 1);
                        setProgress(progress - 33.33);
                      }}
                    >
                      Submit
                    </Button>
                  </div>
                ) : (
                  <div className="w-40"></div>
                )}
                <Button
                  w="4rem"
                  h="1.5rem"
                  borderRadius={20}
                  backgroundColor="#645bee"
                  isDisabled={step === 3}
                  fontSize={16}
                  mt="0%"
                  color={"white"}
                  _hover={"red"}
                  onClick={() => {
                    setStep(step + 1);
                    if (step === 3) {
                      setProgress(100);
                    } else {
                      setProgress(progress + 33.33);
                    }
                  }}
                >
                  Next
                </Button>
              </Flex>
            </Flex>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default AddHLC;
