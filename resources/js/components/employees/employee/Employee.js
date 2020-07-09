import React from 'react';

import globalStyles from '../../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import defaultPerson from '../../../assets/images/default-person.png';

const employee = ( props ) => {


    return (

        <div className={globalStyles['col-md-6']} key={props.employee.id}>
        <div className={globalStyles.card} style={{width: '18rem', marginBottom: '50px'}} >
            <img className={globalStyles['card-img-top']} src={props.employee.profile_image ? props.employee.profile_image : defaultPerson}  />
            <div className={globalStyles['card-body']}>
                <h5 className={globalStyles['card-title']}>{props.employee.employee_name}</h5>
                <p className={globalStyles['card-text']}>
                    Id: {props.employee.id}
                </p>
                <p className={globalStyles['card-text']}>
                    Salary: {props.employee.employee_salary}
                </p>
                <p className={globalStyles['card-text']}>
                    Age: {props.employee.employee_age}
                </p>
                <a href="#" className={globalStyles['btn'] + " " + globalStyles['btn-danger']} style={{marginLeft:'5px'}} onClick={() => props.removeEmployee(props.employee.id)}>Remove</a>
            </div>
        </div>
    </div>

    );
};

export default employee;
