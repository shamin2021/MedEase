import React from 'react'
import Stepper from '../components/Stepper';
import StepperControl from '../components/StepperControl';
import { Button } from "@chakra-ui/react";
import '../styles/TestComponent.css'

const AddDoctor = () => {

  // const addColor = '#32a852'

  return (
    <div className="h-screen py-1 bg-primary">
      <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 py-1 bg-white mt-6">
        <div className="container horizontal flex justify-center font-poppins text-xs">
          <Stepper />
        </div>
        <StepperControl />
      </div>
    </div>
  );
}

export default AddDoctor;
