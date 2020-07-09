import React, {Component} from 'react';

import classes from './Employees.css';
import Employee from './employee/Employee';
import globalStyles from '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import ApiService from '../../services/api.service';

class Employees extends Component {


    constructor(props){
        super(props);

        this.state = {
            userCreated: false,
            searchTerm: '',
            sortSelect: '',
            employees: [],
            loading: false,
            error: false,
        };
    };

    componentWillMount() {
        let userCreated = this.props.location.state && this.props.location.state.userCreated;
        if (userCreated) {
            this.setState({userCreated: true})
            setTimeout(() => this.setState({userCreated: false}), 3000);
        }
        this.getEmployees();
    };

    getEmployees() {
        this.setState({loading: true});
        console.log({
            sort: this.state.sortSelect,
            term: this.state.searchTerm,
        })
        ApiService.getEmployees({
            sort: this.state.sortSelect,
            term: this.state.searchTerm,
        }).then((response) => {
            console.log("data", response.data);
            this.setState({ employees: response.data, loading: false ,error : false});
        }).catch(function(error) {
            this.setState({loading: false});
            alert("Something went wrong")
            console.log(error);
        });;

    }


    onChange(event) {
        /* signal to React not to nullify the event object */
        event.persist();

        if (!this.debouncedFn) {
          this.debouncedFn =  _.debounce(() => {
            this.getEmployees()
          }, 1000);
        }
        this.setState({searchTerm: event.target.value}, () => this.debouncedFn());
    }

    sort() {
        this.setState({sortSelect: event.target.value}, () => this.getEmployees());
    }
    removeEmployeeHandler(employeeId) {

        this.setState({loading: true});
        ApiService.deleteEmployee({
            id: employeeId,
        }).then((response) => {
            let employees = [...this.state.employees];
            let newArr = employees.filter(emp => emp.id !== employeeId);

            this.setState({employees: newArr, loading: false});
        }).catch(function(error) {
            // this.setState({loading: false});
            alert("Something went wrong")
            this.setState({loading: false});
            console.log(error);
        });;

    }
    reset() {
        this.setState({
            sortSelect: '',
            searchTerm: ''
        }, () => this.getEmployees());
    }

    render() {
        if (this.state.loading) {
            return (<div className={classes.Centered}>Loading...</div>);
        }

        return (



            <div className={globalStyles['container'] + " " + classes.Employees}>


                <div>
                    <h1>Employees</h1>

                    {this.state.userCreated ? <div className={globalStyles['alert'] + " " + globalStyles['alert-success']} role="alert">
  Employee was created!
</div> : null}

                    <div>
                    <button className={globalStyles['btn'] + " " + globalStyles['btn-primary'] + " " + classes.Btns} onClick={() => this.props.history.push('/')}>Go Back</button>
                    </div>
                    <div>
                    <button className={globalStyles['btn'] + " " + globalStyles['btn-success'] + " " + classes.Btns} onClick={() => this.props.history.push('/create-employee')}>Create</button>
                    </div>
                    <div>
                    <button className={globalStyles['btn'] + " " + globalStyles['btn-info']+ " " + classes.Btns} onClick={this.reset.bind(this)}>Reset</button>
                    </div>
                    <div className={globalStyles['form-group']}>
                        <select className={globalStyles['form-control']} onChange={this.sort.bind(this)} value={this.state.sortSelect}>
                        <option value=''>Sort by age</option>
                        <option value="asc">ASC</option>
                        <option value="desc">DESC</option>
                        </select>
                    </div>
                    <div className={globalStyles["input-group"] + " " + globalStyles['mb-3']}>
                        <div className={globalStyles["input-group-prepend"]}>
                            <span className={globalStyles['input-group-text']} id="inputGroup-sizing-default">Search by name</span>
                        </div>
                        <input type="text" value={this.state.searchTerm} onChange={this.onChange.bind(this)} className={globalStyles["form-control"]} aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                    </div>
                </div>

                {

                    this.state.employees.length ?
                        <div className={globalStyles['row']}>

                            {this.state.employees.map(employee => {
                                return (
                                    <Employee employee={employee} key={employee.id} removeEmployee={this.removeEmployeeHandler.bind(this)} />
                                )
                            })}
                        </div>
                        : <div className={classes.Center} style={{textAlign: 'center'}}>No Results Found</div>
                }


            </div>

        );
    }
}


export default Employees;
