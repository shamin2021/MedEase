import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import '../styles/TestComponent.css'

const TestComponent = () => {

  const addColor = '#32a852'

  return (
    <div className='TestComponent'>
      <Stack spacing={2} direction="row">
        <Button variant="text" className='tex'>Text</Button>
        <Button variant="contained" size='small'>Contained</Button>
        <Button variant="outlined" size='medium'>Outlined</Button>
        <Button variant="contained" disabled>Disabled</Button>
        <Button variant="outlined" disabled>Disabled</Button>
        <Button variant="contained" color="success" size='large'>SUCCESS</Button>
        <Button variant="outlined" style={{backgroundColor: addColor}}>ERROR</Button>
      </Stack>

    <div class="flex items-center justify-between">
        <h2 class="font-semibold text-slate-900">Projects</h2>
        <a href="/new" class="hover:bg-blue-400 group flex items-center rounded-md bg-green-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
        <svg width="20" height="20" fill="currentColor" class="mr-2" aria-hidden="true">
          <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
        </svg>
        New
      </a>
    </div>
    </div>
  )
}

export default TestComponent;
