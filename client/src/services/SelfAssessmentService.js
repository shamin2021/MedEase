import axios from 'axios';

const SelfAssessment_API_BASE_URL = "http://localhost:8080/api/v1/SelfAssessments";

class SelfAssessmentService {

    getSelfAssessments(){
        return axios.get(SelfAssessment_API_BASE_URL);
    }

    createSelfAssessment(SelfAssessment){
        return axios.post(SelfAssessment_API_BASE_URL, SelfAssessment);
    }

    getSelfAssessmentById(SelfAssessmentId){
        return axios.get(SelfAssessment_API_BASE_URL + '/' + SelfAssessmentId);
    }

    updateSelfAssessment(SelfAssessment, SelfAssessmentId){
        return axios.put(SelfAssessment_API_BASE_URL + '/' + SelfAssessmentId, SelfAssessment);
    }

    deleteSelfAssessment(SelfAssessmentId){
        return axios.delete(SelfAssessment_API_BASE_URL + '/' + SelfAssessmentId);
    }
}

export default new SelfAssessmentService()