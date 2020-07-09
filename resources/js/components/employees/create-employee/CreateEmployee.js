import React, {Component} from 'react';
import globalStyles from '../../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import ApiService from '../../../services/api.service';
import classes from './CreateEmployee.css';
import employeesCss from '../Employees.css';
import _ from 'lodash';

class CreateEmployee extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }

      handleSubmit(event) {
            event.preventDefault();

            let formData = new FormData();

            for (const field in this.refs) {
                if (field === 'profile_image') {
                    // formData[field] = this.refs.profile_image.files[0];
                    formData.append(field, this.refs.profile_image.files[0]);
                } else {
                    formData.append(field, this.refs[field].value);
                    // formData[field] = this.refs[field].value;
                }

            }
            console.log(formData);
            ApiService.createEmployee(formData)
            .then(res => {
                if (res.data.type && res.data.type === 'Buffer') {
                    alert("Empty user was created. Please fill again the form.");
                } else {
                    this.props.history.push('/employees', {userCreated: true})
                }
            }).catch(function(error) {
                alert("Something went wrong")
                console.log(error);
            });;


      }

    render() {
        return (

            <div className={employeesCss.Centered}>
                <div>
                    <h1>Create Employee</h1>
                    <a href="#" onClick={() => this.props.history.push('/employees')}>Employees List</a>
                </div>
                <div>
                <form onSubmit={this.handleSubmit} className={classes.CreateEmployee} encType="multipart/form-data">
                    <div className={globalStyles["form-group"]}>
                        <label htmlFor="a">Name</label>
                        <input ref="employee_name" type="text" className={globalStyles['form-control']} id="a" aria-describedby="emailHelp" />
                    </div>
                    <div className={globalStyles["form-group"]}>
                        <label htmlFor="b">Salary</label>
                        <input ref="employee_salary" type="text" className={globalStyles['form-control']} id="b" />
                    </div>
                    <div className={globalStyles["form-group"]}>
                        <label htmlFor="c">Age</label>
                        <input ref="employee_age" type="text" className={globalStyles['form-control']} id="c"  />
                    </div>
                    <div className={globalStyles["form-group"]}>
                        <label htmlFor="exampleFormControlFile1">Profile image</label>
                        <input ref="profile_image" type="file" className={globalStyles["form-control-file"]} id="exampleFormControlFile1" />
                    </div>
                    <button type="submit" className={globalStyles['btn'] + ' ' + globalStyles['btn-primary']}>Submit</button>
                    </form>
                </div>
            </div>

        );
    }
};

export default CreateEmployee;
