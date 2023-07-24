import React from 'react'
import { useNavigate } from 'react-router-dom'


const Unauthorized = () => {

  const navigate = useNavigate();
  const backPage = () => navigate(-1);

  return (
    <div>
      <h1>Unauthorized Page </h1>
      <button onClick={backPage}>Go Back</button>
    </div>
  )
}

export default Unauthorized
