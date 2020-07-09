import { EMPLOYEES_END_POINT } from '../constants/api';

const ApiService = {

    getEmployees: function(params) {

        let request = axios.get(EMPLOYEES_END_POINT, {params : params});

        return request;
    },

    createEmployee: function(params) {
        let request = axios.post(EMPLOYEES_END_POINT, params);

        return request;
    },

    deleteEmployee: function(params) {
        let request = axios.delete(EMPLOYEES_END_POINT + "/" + params['id']);

        return request;
    }

};

export default ApiService;
