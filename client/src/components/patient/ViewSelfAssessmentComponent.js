import React, { useState, useEffect } from 'react';
import useAxiosMethods from "../../hooks/useAxiosMethods";
import { useNavigate, useLocation, useParams } from "react-router-dom";


// class ViewSelfAssessmentComponent extends Component {
const ViewSelfAssessmentComponent= () => {
    
    const { id } = useParams(); 
    console.log(id);

    const { get } = useAxiosMethods();
    const navigate = useNavigate();
    const location = useLocation();

    const [selfassessments, setSelfAssessments] = useState([]);


    useEffect(() => {
        try {
            get(`/SelfAssessments/${id}`, setSelfAssessments);

        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }, []);


        return (
            <div>
                <br></br>
                <div className="card col-md-8 offset-md-2">
                    <h3 className = "text-center"> View SelfAssessment Details</h3>
                    <div className = "card-body">

                        <div className = "row">                        
                            <div className="col-md-6">
                                <label>Date Created:</label>
                            </div>
                            <div className="col-md-6">{selfassessments.date}</div>
                            </div>

                            <div className = "row">                        
                            <div className="col-md-6">
                                <label>First Name:</label>
                            </div>
                            <div className="col-md-6">{selfassessments.firstName}</div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                <label>Last Name:</label>
                            </div>
                            <div className="col-md-6">{selfassessments.lastName}</div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                <label>Email ID:</label>
                            </div>
                            <div className="col-md-6">{selfassessments.emailId}</div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                <label>Physical Activity state:</label>
                            </div>
                            <div className="col-md-6">
                                {selfassessments.physicalActivity ? 'yes' : 'no'}
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                <label> Smoke Tobacco: </label>
                            </div>
                            <div className="col-md-6">
                                { selfassessments.tobaccoSmoking ? 'yes' : 'no'}
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                <label> Chew Beetle: </label>
                            </div>
                            <div className="col-md-6">
                            { selfassessments.beetlechewing ? 'yes' : 'no'}
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                <label> Alcohol Consumption: </label>
                            </div>
                            <div className="col-md-6">
                            { selfassessments.alcoholConsumption ? 'yes' : 'no'}
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                <label> Other Substance: </label>
                            </div>
                            <div className="col-md-6">
                            { selfassessments.otherSubstance ? 'yes' : 'no'}
                            </div>
                            </div>


                            <div className="row">
                            <div className="col-md-6">
                                <label> Snack_intake: </label>
                            </div>
                            <div className="col-md-6">
                            { selfassessments.snackIntake  }
                            </div>
                            </div>

                            {/* diseases */}
                            <div className="row">
                            <div className="col-md-6">
                                <label> Has a history in the family for Heart Disease ?</label>
                            </div>
                            <div className="col-md-6">
                            { selfassessments.heartDisease ? 'yes' : 'no'}
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                <label> Has a history in the family for High Blood Pressure ?</label>
                            </div>
                            <div className="col-md-6">
                            { selfassessments.HighBloodPressure ? 'yes' : 'no'}
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                <label> Has a history in the family for Stroke ?</label>
                            </div>
                            <div className="col-md-6">
                            { selfassessments.Stroke ? 'yes' : 'no'}
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                <label> Has a history in the family for Diabetes ?</label>
                            </div>
                            <div className="col-md-6">
                            { selfassessments.Diabetes ? 'yes' : 'no'}
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                <label> Has a history in the family for Cancer ?</label>
                            </div>
                            <div className="col-md-6">
                            { selfassessments.Cancer ? 'yes' : 'no'}
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                <label> Has a history in the family for COPD ?</label>
                            </div>
                            <div className="col-md-6">
                            { selfassessments.COPD ? 'yes' : 'no'}
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                <label> Has a history in the family for Asthma ?</label>
                            </div>
                            <div className="col-md-6">
                            { selfassessments.Asthma ? 'yes' : 'no'}
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                <label> Has a history in the family for Kidney Diseases ?</label>
                            </div>
                            <div className="col-md-6">
                            { selfassessments.kidneyDiseases ? 'yes' : 'no'}
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                <label> Has any of the family had a Sudden Death ?</label>
                            </div>
                            <div className="col-md-6">
                            { selfassessments.suddenDeath ? 'yes' : 'no'}
                            </div>
                            </div>

                            <div className="row">
                            <div className="col-md-6">
                                <label> Is there any other diseases family has suffered from ?</label>
                            </div>
                            <div className="col-md-6">{selfassessments.otherDiseases}</div>
                            </div>


                            {/* diseases */}

                        
                        </div>
                </div>
        </div>
    );
};

export default ViewSelfAssessmentComponent;