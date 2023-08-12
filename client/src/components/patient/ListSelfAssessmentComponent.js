import React, { useEffect, useState } from 'react';
import useAxiosMethods from "../../hooks/useAxiosMethods";
import { useNavigate, useLocation } from "react-router-dom";


const ListSelfAssessmentComponent= () => {

    const [res,setRes] = useState('');

    const { get } = useAxiosMethods();
    const navigate = useNavigate();
    const location = useLocation();

    const [selfassessments, setSelfAssessments] = useState([]);

    useEffect(() => {
        try {
            get(`/SelfAssessments`, setSelfAssessments);

        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }, []);

    useEffect(() => {
        console.log(res);
    }, [res]);

    const addSelfAssessment = () => {
        navigate('/CreateSelfAssessment');}

    return (
        <div>
            <h2 className="text-center">SelfAssessments List</h2>
            <div className="row">
                <button className="btn btn-primary" onClick={addSelfAssessment}>
                    Add SelfAssessment
                </button>
            </div>
            <br></br>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th> Assessment ID</th>

                            <th> Assessment Created</th>
                            
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selfassessments.map((selfassessment) => (
                            <tr key={selfassessment.id}>
                                <td> { selfassessment.id} </td>
                                <td> { selfassessment.date} </td>   
                                
                                <td>
                                    
                                    <button style={{marginLeft: "10px"}} onClick={()=>navigate(`/view-SelfAssessment/${selfassessment.id}`) } className="btn btn-info">View </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListSelfAssessmentComponent;
