import React from 'react'
import Buttons from '../components/Buttons' 


import '../styles/TestComponent.css'

const TestComponent = () => {
  return (
    <div className='TestComponent'>
        <div className="btn-set">
          <Buttons variant="contained" label='Click Me' color='primary' onClick={() => console.log('Clicked')} className="btn"/>
          <Buttons variant="text" label='Click Me' color='primary' onClick={() => console.log('Clicked')} className="btn"/>
          <Buttons variant="outlined" label='Click Me' color='primary' onClick={() => console.log('Clicked')} className="btn"/>
        </div>
    </div>
  )
}

export default TestComponent;
