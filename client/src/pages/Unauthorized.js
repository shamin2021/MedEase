import React from 'react'
import { useNavigate, Link } from 'react-router-dom'


const Unauthorized = () => {

  const navigate = useNavigate();
  const backPage = () => navigate(-1);

  return (
    <>
      <div className="grid min-h-full place-items-center bg-white px-auto py-auto sm:py-32 lg:px-8 text-center">
        <p className="text-base font-semibold text-secondary">403</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Forbidden</h1>
        <p className="mt-6 text-base leading-7 text-gray-600">Unauthorized access to this content.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button onClick={backPage} className='rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-500 hover:bg-indigo-800'>Go back</button>

          <Link to={"/register"} className='rounded-md px-3.5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-slate-200'>Sign Up <span aria-hidden="true">&rarr;</span></Link>

        </div>
      </div>
    </>
  )
}

export default Unauthorized
