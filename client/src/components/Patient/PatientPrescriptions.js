import React, { useState, useEffect } from 'react'
import { GridItem } from '@chakra-ui/react';
import Table from "./PrescriptionTable";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useAxiosMethods from '../../hooks/useAxiosMethods';

const PatientPrescriptions = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { get} = useAxiosMethods();
    const [prescriptions, setPrescriptions] = useState([]);


    useEffect(() => {
        try {
            get(`/patient/getPrescriptions/${parseInt(id)}`, setPrescriptions);

        } catch (err) {
            console.error(err);
            navigate("/login", { state: { from: location }, replace: true });
        }
    }, []);

    console.log(prescriptions);

    return (
        <GridItem colSpan={6}>
            <div className="h-screen py-1 bg-primary ">
                <div className="md:w-3/4 mx-auto shadow-xl rounded-2xl pb-2 py-1 bg-white mt-[5%] p-5">
                    <div className="ml-6 flex w-full">
                        <div className="w-2/4 m-2 mt-5 ">Prescriptions </div>
                    </div>
                    <div>{<Table data={prescriptions} />}</div>
                </div>
            </div>
        </GridItem>
    )
}

export default PatientPrescriptions
