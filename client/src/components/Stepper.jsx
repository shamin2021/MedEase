import { faL } from '@fortawesome/free-solid-svg-icons';
import React,{useEffect,useState,useRef} from 'react'


const Stepper = ({steps, currentStep}) => {
  const [newStep,setNewStep] = useState([]);
  const stepRef = useRef();
  
  const updateStep = (stepNumber,steps) =>{
    const newSteps = [ ... steps]
    let count =0;

    while(count < newSteps.length){
      //current step
      if(count== stepNumber){
        newSteps[count]={
          ...newSteps[count],
          highlighted :true,
          selected:true,
          completed:true,
        };
        count++;
      }
      //step completed
      else if(count < stepNumber){
         newSteps[count]={
          ...newSteps[count],
          highlighted :false,
          selected:true,
          completed:true,
        };
        count++;

      } 
      //step pending 
      else{
         newSteps[count]={
          ...newSteps[count],
          highlighted :false,
          selected:false,
          completed:false,
        };
        count++;
      }
    }
    return newStep;
  }
  useEffect(()=>{
    const stepsState = steps.map((step,index)=>
    Object.assign(
      {},
      {
      description :step,
      completed:false,
      highlighted:index == 0? true:false,
      selected:index == 0? true:false,
      }
    )
    );

    stepRef.current =stepsState;
    const current = updateStep(currentStep -1,stepRef.current);
    setNewStep(current);

  },[steps,currentStep]);

  const displaySteps = newStep.map((step,index)=>{
    return (
      <div key ={index} className= {
          index != newStep.length -1 ? 'w-full flex items-center ' : "flex items center"} >
        <div className = 'relative flex flex-col items-center'>
          <div className='rounded-full transition duration-500 ease-in-out h-8 w-8 flex items-center justify-center py-3 bg-primary'>{/*display number*/}1</div>
          <div className='rounded-full transition duration-500 ease-in-out h-8 w-8 flex items-center justify-center py-3 bg-primary'>{/*display number*/}Description</div>
        </div>
        <div className='flex-auto rounded-xl w-20 border-t-4 m-2 border-primary-100 transition duration-500 ease-in-out'>
          {/*display line*/}
        </div>
      </div>
  ) 
  });

  return (
    <div className='mx-4 p-4 flex justify-between items-center'>
      {displaySteps}
    </div>
  )
}

export default Stepper