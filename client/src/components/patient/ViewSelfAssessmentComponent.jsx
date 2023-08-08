import React, { useState, useEffect } from 'react';
import SelfAssessmentService from '../../services/SelfAssessmentService'
import { useAccordionItemState } from '@chakra-ui/react';

// class ViewSelfAssessmentComponent extends Component {
const ViewSelfAssessmentComponent= () => {
    

    const [selfAssessment, setSelfAssessment] = useAccordionItemState({});
    const id = 'your_id_here'; // Replace with the actual ID you want to view

    useEffect(() => {
        SelfAssessmentService.getSelfAssessmentById(id).then((res) => {
            setSelfAssessment(res.data);
        });
    }, [id]);

        return (
            <div>
                <br></br>
                <div className="card col-md-8 offset-md-2">
                    <h3 className = "text-center"> View SelfAssessment Details</h3>
                    <div className = "card-body">

                            <div className = "row">                        
                            <div className="col-md-6">
                                <label>First Name:</label>
                            </div>
                            <div className="col-md-6">{selfAssessment.firstName}</div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                <label>Last Name:</label>
                            </div>
                            <div className="col-md-6">{selfAssessment.lastName}</div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                <label>Email ID:</label>
                            </div>
                            <div className="col-md-6">{selfAssessment.emailId}</div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                <label>Physical Activity state:</label>
                            </div>
                            <div className="col-md-6">
                                {selfAssessment.physicalActivity ? 'yes' : 'no'}
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                <label> Smoke Tobacco: </label>
                            </div>
                            <div className="col-md-6">
                                { selfAssessment.tobaccoSmoking ? 'yes' : 'no'}
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                <label> Chew Beetle: </label>
                            </div>
                            <div className="col-md-6">
                            { selfAssessment.beetlechewing ? 'yes' : 'no'}
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                <label> Alcohol Consumption: </label>
                            </div>
                            <div className="col-md-6">
                            { selfAssessment.alcoholConsumption ? 'yes' : 'no'}
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                <label> Other Substance: </label>
                            </div>
                            <div className="col-md-6">
                            { selfAssessment.otherSubstance ? 'yes' : 'no'}
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                <label> Snack_intake: </label>
                            </div>
                            <div className="col-md-6">
                            { selfAssessment.snackIntake  }
                            </div>
                            </div>

                            {/* diseases */}
                            

                            {/* diseases */}

                        
                        </div>
                </div>
        </div>
    );
};

export default ViewSelfAssessmentComponent;