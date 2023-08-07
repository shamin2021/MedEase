import React,{useState} from 'react'
import Stepper from '../components/Stepper';
import StepperControl from '../components/StepperControl';
import { Button } from "@chakra-ui/react";
import '../styles/TestComponent.css'

const AddDoctor = () => {

  const Form4 = () => {
    return (
      <>
        <Heading w="100%" textAlign={"center"} fontWeight="normal">
          Social Handles
        </Heading>
        <SimpleGrid columns={1} spacing={6}>
          <FormControl as={GridItem} colSpan={[3, 2]}>
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: "gray.50",
              }}
            >
              Website
            </FormLabel>
            <InputGroup size="sm">
              <InputLeftAddon
                bg="gray.50"
                _dark={{
                  bg: "gray.800",
                }}
                color="gray.500"
                rounded="md"
              >
                http://
              </InputLeftAddon>
              <Input
                type="tel"
                placeholder="www.example.com"
                focusBorderColor="brand.400"
                rounded="md"
              />
            </InputGroup>
          </FormControl>

          <FormControl id="email" mt={1}>
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: "gray.50",
              }}
            >
              About
            </FormLabel>
            <Textarea
              placeholder="you@example.com"
              rows={3}
              shadow="sm"
              focusBorderColor="brand.400"
              fontSize={{
                sm: "sm",
              }}
            />
            <FormHelperText>
              Brief description for your profile. URLs are hyperlinked.
            </FormHelperText>
          </FormControl>
        </SimpleGrid>
      </>
    );
  };
  const Form3 = () => {
    return (
      <>
        <Heading w="100%" textAlign={"center"} fontWeight="normal">
          Social Handles
        </Heading>
        <SimpleGrid columns={1} spacing={6}>
          <FormControl as={GridItem} colSpan={[3, 2]}>
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: "gray.50",
              }}
            >
              Website
            </FormLabel>
            <InputGroup size="sm">
              <InputLeftAddon
                bg="gray.50"
                _dark={{
                  bg: "gray.800",
                }}
                color="gray.500"
                rounded="md"
              >
                http://
              </InputLeftAddon>
              <Input
                type="tel"
                placeholder="www.example.com"
                focusBorderColor="brand.400"
                rounded="md"
              />
            </InputGroup>
          </FormControl>

          <FormControl id="email" mt={1}>
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: "gray.50",
              }}
            >
              About
            </FormLabel>
            <Textarea
              placeholder="you@example.com"
              rows={3}
              shadow="sm"
              focusBorderColor="brand.400"
              fontSize={{
                sm: "sm",
              }}
            />
            <FormHelperText>
              Brief description for your profile. URLs are hyperlinked.
            </FormHelperText>
          </FormControl>
        </SimpleGrid>
      </>
    );
  };
  const Form2 = () => {
    return (
      <>
        <Heading w="100%" textAlign={"center"} fontWeight="normal">
          Social Handles
        </Heading>
        <SimpleGrid columns={1} spacing={6}>
          <FormControl as={GridItem} colSpan={[3, 2]}>
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: "gray.50",
              }}
            >
              Website
            </FormLabel>
            <InputGroup size="sm">
              <InputLeftAddon
                bg="gray.50"
                _dark={{
                  bg: "gray.800",
                }}
                color="gray.500"
                rounded="md"
              >
                http://
              </InputLeftAddon>
              <Input
                type="tel"
                placeholder="www.example.com"
                focusBorderColor="brand.400"
                rounded="md"
              />
            </InputGroup>
          </FormControl>

          <FormControl id="email" mt={1}>
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: "gray.50",
              }}
            >
              About
            </FormLabel>
            <Textarea
              placeholder="you@example.com"
              rows={3}
              shadow="sm"
              focusBorderColor="brand.400"
              fontSize={{
                sm: "sm",
              }}
            />
            <FormHelperText>
              Brief description for your profile. URLs are hyperlinked.
            </FormHelperText>
          </FormControl>
        </SimpleGrid>
      </>
    );
  };
  // const addColor = '#32a852'
  const [currentStep , setCurrentStep] = useState(1);
  const steps = [
    "1",
    "2",
    "3",
  ];
  const displayStep = (step) =>{
    switch (step) {
      case 1:
        <Form3 />
      case 2:
        <Form4 />
      case 3:
        <Form2 />
      default:
    }
  }
  return (
    <div className="h-screen py-1 bg-primary">
      <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 py-1 bg-white mt-6">
        <div className="container horizontal flex justify-center font-poppins text-xs">
          <Stepper 
          steps = {steps}
          currentStep = {currentStep}/>
        </div>
        <StepperControl />
      </div>
    </div>
  );
}

export default AddDoctor;
