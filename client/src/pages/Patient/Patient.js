import React from 'react'
import { Link } from 'react-router-dom'

const Patient = () => {
  return (
    <div>
      <h1>Patient Dashboard</h1>
      <br />
      <Link to={"/users"}>Users</Link>
      <br />
    </div>
  )
}

export default Patient
