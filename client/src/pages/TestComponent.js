import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';


import '../styles/TestComponent.css'

const TestComponent = () => {

  // const addColor = '#32a852'

  return (
    <div className='TestComponent'>
      <Box mt={2}>

        <Stack spacing={2} direction="row">
          <Button variant="text" className='tex'>Click Me</Button>
          <Button variant="contained" size='small'>Click Me</Button>
          <Button variant="outlined" size='medium' startIcon={<DeleteIcon />}>Click Me</Button>
          <Button variant="contained" disabled>Click Me</Button>
          <Button variant="outlined" disabled>Click Me</Button>
          <Button variant="contained" color="success" size='large'>SUCCESS</Button>
          <Button variant="outlined" color='error' size='small' >ERROR</Button>
        </Stack>
        
      </Box>

    </div>
  )
}

export default TestComponent;
