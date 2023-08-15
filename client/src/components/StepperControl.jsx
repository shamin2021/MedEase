import React from 'react'

const StepperControl = () => {
  return (
    <div className='container flex justify-around mt-4 mb-8'>
        <button className='bg-white text-slate-400  py--2 px-4 rounded-xl 
        font-light cursor-pointer border-2 border-slate-300 
        hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out font-poppins text-sm'>
            Back
        </button>
        <button className='bg-secondary text-white py--2 px-4 rounded-xl 
        font-light cursor-pointer
        hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out font-poppins text-sm'>
            Next
        </button>
    </div>
  )
}

export default StepperControl