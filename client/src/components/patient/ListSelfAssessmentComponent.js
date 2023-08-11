import React, { useEffect, useState } from 'react';
import SelfAssessmentService from '../../services/SelfAssessmentService';
import useAxiosMethods from "../../hooks/useAxiosMethods";



const ListSelfAssessmentComponent= () => {

    const [selfassessments, setSelfAssessments] = useState([]);
    const [res, setRes] = useState('');

    const { get, post, put, del } = useAxiosMethods(); 


    const viewSelfAssessment = (id) => {
        this.props.history.push(`/view-SelfAssessment/${id}`);
    };


    useEffect(() => {
        SelfAssessmentService.getSelfAssessments().then((res) => {
            setSelfAssessments(res.data);
        });
    }, []);

    const addSelfAssessment = () => {
        this.props.history.push('/add-SelfAssessment/_add');}

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
                            <th> First Name</th>
                            <th> Last Name</th>
                            <th> Email Id</th>
                            <th> physicalActivity</th>
                            <th> tobaccoSmoking</th>
                            <th> beetlechewing</th>
                            <th> alcoholConsumption</th>
                            <th> otherSubstance</th>
                            <th> snackIntake </th>
                            
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selfassessments.map((selfassessment) => (
                            <tr key={selfassessment.id}>
                                <td> { selfassessment.firstName} </td>   
                                <td> {selfassessment.lastName}</td>
                                <td> {selfassessment.emailId}</td>
                                <td> {selfassessment.physicalActivity? 'yes' : 'no'}</td>
                                <td> {selfassessment.tobaccoSmoking? 'yes' : 'no'}</td>
                                <td> {selfassessment.beetlechewing ? 'yes' : 'no'}</td>
                                <td> {selfassessment.alcoholConsumption? 'yes' : 'no'}</td>
                                <td> {selfassessment.otherSubstance? 'yes' : 'no'}</td>
                                <td> {selfassessment.snackIntake }</td>
                                
                                <td>
                                    <button onClick={ () => this.editSelfAssessment(selfassessment.id)} className="btn btn-info">Update </button>
                                    <button style={{marginLeft: "10px"}} onClick={ () => this.deleteSelfAssessment(selfassessment.id)} className="btn btn-danger">Delete </button>
                                    <button style={{marginLeft: "10px"}} onClick={ () => this.viewSelfAssessment(selfassessment.id)} className="btn btn-info">View </button>
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
