import React from 'react';
import { useHistory } from "react-router-dom";

import classes from './Home.css';
import Background from '../../assets/images/landing.jpg';

const home = ( props ) => {

    const history = useHistory();

    function handleClick() {
        history.push("/employees");
    }

    return (

        <div>
            <div className="container-fluid">
            <div className="row" style={{backgroundImage: "url(" + Background + ")", height: '100vh'}}>
                <div className={classes.splash + ' col-md-12'}>
                    <a className={classes['home-link']} href="#">
                        <div className={classes.intro}>
                            <h1>Welcome To Exercise</h1>
                        </div>
                        <button type="button"  className={classes.CTA + " btn " + " btn-default "}  onClick={handleClick}>Click here</button>
                    </a>
                </div>
            </div>
            </div>
        </div>

    );
};

export default home;
