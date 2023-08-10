import React, { useState, useEffect } from 'react';
import SelfAssessmentService from '../../services/SelfAssessmentService';

// class CreateSelfAssessmentComponent extends Component {
const CreateSelfAssessmentComponent= (props) => {


        const { id } = props;
        // const [id, setId] = useState('');
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [emailId, setemailId] = useState('');

        const [physicalActivity, setphysicalActivity] = useState('');
        const [tobaccoSmoking, settobaccoSmoking] = useState('');
        const [beetlechewing, setbeetlechewing] = useState('');
        const [alcoholConsumption, setalcoholConsumption] = useState('');
        const [otherSubstance, setotherSubstance] = useState('');
        const [snackIntake, setsnackIntake] = useState('');
        const [heartDisease, setheartDisease] = useState('');
        const [HighBloodPressure, setHighBloodPressure] = useState('');
        const [Stroke, setStroke] = useState('');
        const [Diabetes, setDiabetes] = useState('');
        const [Cancer, setCancer] = useState('');
        const [COPD, setCOPD] = useState('');
        const [Asthma, setAsthma] = useState('');
        const [kidneyDiseases, setkidneyDiseases] = useState('');
        const [suddenDeath, setsuddenDeath] = useState('');
        const [otherDiseases, setotherDiseases] = useState('');

        // step 4

        useEffect(() => {
            // step 4
            if (id === '_add') {
                return;
            } else {
                SelfAssessmentService.getSelfAssessmentById(id).then((res) => {
                    const selfAssessment = res.data;
                    setFirstName(selfAssessment.firstName);
                    setLastName(selfAssessment.lastName);

                    setemailId(selfAssessment.emailId);
                    setphysicalActivity(selfAssessment.physicalActivity);
                    settobaccoSmoking(selfAssessment.tobaccoSmoking);
                    setbeetlechewing(selfAssessment.beetlechewing);
                    setalcoholConsumption(selfAssessment.alcoholConsumption);
                    setotherSubstance(selfAssessment.otherSubstance);
                    setsnackIntake(selfAssessment.snackIntake);
                    setheartDisease(selfAssessment.heartDisease);
                    setHighBloodPressure(selfAssessment.HighBloodPressure);
                    setStroke(selfAssessment.Stroke);
                    setDiabetes(selfAssessment.Diabetes);
                    setCancer(selfAssessment.Cancer);
                    setCOPD(selfAssessment.COPD);
                    setAsthma(selfAssessment.Asthma);
                    setkidneyDiseases(selfAssessment.kidneyDiseases);
                    setsuddenDeath(selfAssessment.suddenDeath);
                    setotherDiseases(selfAssessment.otherDiseases);

                });
            }
        }, [id]);


          

    const saveOrUpdateSelfAssessment = (e) => {
        e.preventDefault();
        const selfAssessment = {
            firstName,
            lastName,
            emailId,
            physicalActivity,
            tobaccoSmoking,
            beetlechewing,
            alcoholConsumption,
            otherSubstance,
            snackIntake,

            heartDisease,
            HighBloodPressure,
            Stroke,
            Diabetes,
            Cancer,
            COPD,
            Asthma,
            kidneyDiseases,
            suddenDeath,
            otherDiseases
        };
    
        console.log('SelfAssessment => ', JSON.stringify(selfAssessment));


        // step 5
        if (id === '_add') {
            SelfAssessmentService.createSelfAssessment(selfAssessment).then((res) => {
                // Navigate to the SelfAssessments list after saving
                window.location.href = '/SelfAssessments';
            });
        } else {
            SelfAssessmentService.updateSelfAssessment(selfAssessment, id).then((res) => {
                // Navigate to the SelfAssessments list after updating
                window.location.href = '/SelfAssessments';
            });
        }
    };
    
    const changeFirstNameHandler = (event) => {
        setFirstName(event.target.value);
    };


    const changeLastNameHandler= (event) => {
        setLastName(event.target.value);
    }

    const changeEmailHandler= (event) => {
        setemailId(event.target.value);
    }

    const changephysicalActivityHandler = (event) => {
        const physicalActivity = event.target.checked ? 'true' : 'false';
        setphysicalActivity(physicalActivity);
    }

    const changetobaccoSmokingHandler = (event) => {
        const tobaccoSmoking = event.target.checked ? 'true' : 'false';
        settobaccoSmoking(tobaccoSmoking);
    }

    const changebeetlechewingHandler = (event) => {
        const beetlechewing = event.target.checked ? 'true' : 'false';
        setbeetlechewing(beetlechewing);
    }

    const changealcoholConsumptionHandler = (event) => {
        const alcoholConsumption = event.target.checked ? 'true' : 'false';
        setalcoholConsumption(alcoholConsumption);
    }

    const changeotherSubstanceHandler = (event) => {
        const otherSubstance = event.target.checked ? 'true' : 'false';
        setotherSubstance(otherSubstance);
    }

    //snack intake
    const changeSnackNonConsumer = (event) => {
        if (!event.target.checked) {
          // Exit the function if the checkbox is not checked
          return;
        }
      
        const snackIntake  = 'good';
        setsnackIntake(snackIntake);
      }

      const changeSnackLessThan5 = (event) => {
        if (!event.target.checked) {
          return;
        }
      
        const snackIntake  = 'risky';
        setsnackIntake(snackIntake);
      }

      const changeSnackMoreThan5 = (event) => {
        if (!event.target.checked) {
          return;
        }
      
        const snackIntake  = 'lethal';
        setsnackIntake(snackIntake);
      }
    //snack intake


    ///////////////////////////////
    const changeheartDiseaseHandler = (event) => {
        const heartDisease = event.target.checked ? 'true' : 'false';
        setheartDisease(heartDisease);
    }

    const changeHighBloodPressureHandler = (event) => {
        const HighBloodPressure = event.target.checked ? 'true' : 'false';
        setHighBloodPressure(HighBloodPressure);
    }

    const changeStrokeHandler = (event) => {
        const Stroke = event.target.checked ? 'true' : 'false';
        setStroke(Stroke);
    }

    const changeDiabetesHandler = (event) => {
        const Diabetes = event.target.checked ? 'true' : 'false';
        setDiabetes(Diabetes);
    }

    const changeCancerHandler = (event) => {
        const Cancer = event.target.checked ? 'true' : 'false';
        setCancer(Cancer);
    }

    const changeCOPDHandler = (event) => {
        const COPD = event.target.checked ? 'true' : 'false';
        setCOPD(COPD);
    }

    const changeAsthmaHandler = (event) => {
        const Asthma = event.target.checked ? 'true' : 'false';
        setAsthma(Asthma);
    }

    const changekidneyDiseasesHandler = (event) => {
        const kidneyDiseases = event.target.checked ? 'true' : 'false';
        setkidneyDiseases(kidneyDiseases);
    }

    const changesuddenDeathHandler = (event) => {
        const suddenDeath = event.target.checked ? 'true' : 'false';
        setsuddenDeath(suddenDeath);
    }

    const changeotherDiseasesHandler = (event) => {
        setotherDiseases(event.target.value);
    }
    ///////////////////////////////
    const cancel = () => {
        // Navigate back to the SelfAssessments list
        window.location.href = '/SelfAssessments';
    };
    const getTitle = () => {
        if (id === '_add') {
            return <h3 className="text-center">Add SelfAssessment</h3>;
        } else {
            return <h3 className="text-center">Update SelfAssessment</h3>;
        }
    };

    return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-8 offset-md-3 offset-md-2">
                                {
                                    getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className="form-row">
                                            
                                        <div className = "form-group col-md-6">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={firstName} onChange={changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group col-md-6">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                                value={lastName} onChange={changeLastNameHandler}/>
                                        </div>
                                        </div>

                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={emailId} onChange={changeEmailHandler}/>
                                        </div>
                                        
                                        <div className = "form-group row">
                                            <label className="col-sm-6 col-form-label">Do you actively engage in physical activities?</label>
                                            
                                            <div className="col-sm-6">
                                                <div className="form-check">                                            
                                                    <input type="checkbox" name="physicalActivity" className="form-check-input" 
                                                        value={physicalActivity} onChange={changephysicalActivityHandler}/>
                                                    
                                                </div>
                                            </div>
                                        </div>

                                        <div className = "form-group row">
                                            <label className="col-sm-6 col-form-label">Do you consume tobacco?</label>
                                            
                                            <div className="col-sm-6">
                                                <div className="form-check">                                            
                                                <input type="checkbox" name="tobaccoSmoking" className="form-check-input" 
                                                value={tobaccoSmoking} onChange={changetobaccoSmokingHandler}/>
                                                    
                                                </div>
                                            </div>
                                        </div>

                                        <div className = "form-group row">
                                            <label className="col-sm-6 col-form-label">Do you consume beetle?</label>
                                            
                                            <div className="col-sm-6">
                                                <div className="form-check">                                            
                                                <input type="checkbox" name="beetlechewing" className="form-check-input" 
                                                value={beetlechewing} onChange={changebeetlechewingHandler}/>
                                                    
                                                </div>
                                            </div>
                                        </div>

                                        <div className = "form-group row">
                                            <label className="col-sm-6 col-form-label">Do you consume alcohol?</label>
                                            
                                            <div className="col-sm-6">
                                                <div className="form-check">                                            
                                                <input type="checkbox" name="alcoholConsumption" className="form-check-input" 
                                                value={alcoholConsumption} onChange={changealcoholConsumptionHandler}/>
                                                    
                                                </div>
                                            </div>
                                        </div>

                                        <div className = "form-group row">
                                            <label className="col-sm-6 col-form-label">Do you consume any other substances?</label>
                                            
                                            <div className="col-sm-6">
                                                <div className="form-check">                                            
                                                <input type="checkbox" name="otherSubstance" className="form-check-input" 
                                                value={otherSubstance} onChange={changeotherSubstanceHandler}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className = "form-group">
                                            <label className="col-sm-6 col-form-label">How often do you eat snacks?</label>
                                        </div>

                                        <div className = "form-group row">
                                            <label className="col-sm-6 col-form-label">Non consumer</label>                                            
                                            <div className="col-sm-6">
                                                <div className="form-check">                                            
                                                <input type="checkbox" name="snackIntake " className="form-check-input" 
                                                value={snackIntake } onChange={changeSnackNonConsumer}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className = "form-group row">
                                            <label className="col-sm-6 col-form-label">Consume less than 5 times a week</label>                                            
                                            <div className="col-sm-6">
                                                <div className="form-check">                                            
                                                <input type="checkbox" name="snackIntake " className="form-check-input" 
                                                value={snackIntake } onChange={changeSnackLessThan5}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className = "form-group row">
                                            <label className="col-sm-6 col-form-label">Consume more than 5 times a week</label>                                            
                                            <div className="col-sm-6">
                                                <div className="form-check">                                            
                                                <input type="checkbox" name="snackIntake " className="form-check-input" 
                                                value={snackIntake } onChange={changeSnackMoreThan5}/>
                                                </div>
                                            </div>
                                        </div>

                                        {/* diseases */}
                                        <div className = "form-group">
                                            <label className="col-sm-6 col-form-label">Did your family members suffer from following diseases?</label>
                                        </div>

                                        <div className = "form-group row">
                                            <label className="col-sm-6 col-form-label">Heart Disease</label>                                            
                                            <div className="col-sm-6">
                                                <div className="form-check">                                            
                                                <input type="checkbox" name="heartDisease " className="form-check-input" 
                                                value={heartDisease } onChange={changeheartDiseaseHandler}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className = "form-group row">
                                            <label className="col-sm-6 col-form-label">High Blood Pressure</label>                                            
                                            <div className="col-sm-6">
                                                <div className="form-check">                                            
                                                <input type="checkbox" name="HighBloodPressure " className="form-check-input" 
                                                value={HighBloodPressure } onChange={changeHighBloodPressureHandler}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className = "form-group row">
                                            <label className="col-sm-6 col-form-label">Stroke</label>                                            
                                            <div className="col-sm-6">
                                                <div className="form-check">                                            
                                                <input type="checkbox" name="Stroke " className="form-check-input" 
                                                value={Stroke } onChange={changeStrokeHandler}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className = "form-group row">
                                            <label className="col-sm-6 col-form-label">Diabetes</label>                                            
                                            <div className="col-sm-6">
                                                <div className="form-check">                                            
                                                <input type="checkbox" name="Diabetes " className="form-check-input" 
                                                value={Diabetes } onChange={changeDiabetesHandler}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className = "form-group row">
                                            <label className="col-sm-6 col-form-label">Cancer</label>                                            
                                            <div className="col-sm-6">
                                                <div className="form-check">                                            
                                                <input type="checkbox" name="Cancer " className="form-check-input" 
                                                value={Cancer } onChange={changeCancerHandler}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className = "form-group row">
                                            <label className="col-sm-6 col-form-label">COPD</label>                                            
                                            <div className="col-sm-6">
                                                <div className="form-check">                                            
                                                <input type="checkbox" name="COPD " className="form-check-input" 
                                                value={COPD } onChange={changeCOPDHandler}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className = "form-group row">
                                            <label className="col-sm-6 col-form-label">Asthma</label>                                            
                                            <div className="col-sm-6">
                                                <div className="form-check">                                            
                                                <input type="checkbox" name="Asthma " className="form-check-input" 
                                                value={Asthma } onChange={changeAsthmaHandler}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className = "form-group row">
                                            <label className="col-sm-6 col-form-label">Kidney Diseases</label>                                            
                                            <div className="col-sm-6">
                                                <div className="form-check">                                            
                                                <input type="checkbox" name="kidneyDiseases " className="form-check-input" 
                                                value={kidneyDiseases } onChange={changekidneyDiseasesHandler}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className = "form-group row">
                                            <label className="col-sm-6 col-form-label">Sudden Death</label>                                            
                                            <div className="col-sm-6">
                                                <div className="form-check">                                            
                                                <input type="checkbox" name="suddenDeath " className="form-check-input" 
                                                value={suddenDeath } onChange={changesuddenDeathHandler}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className = "form-group col-md-6">
                                            <label> Other Diseases: </label>
                                            <input placeholder="Name any other diseases" name="otherDiseases" className="form-control" 
                                                value={otherDiseases} onChange={changeotherDiseasesHandler}/>
                                        </div>



                                        {/* diseases */}
                                       
                                    
                                        <button className="btn btn-success" onClick={saveOrUpdateSelfAssessment}>Save</button>
                                        <button className="btn btn-danger" onClick={cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>

                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
}

export default CreateSelfAssessmentComponent