import React, { useState, useEffect } from 'react';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Buttons/Button";
import classes from "./Auth.module.scss"
import * as actions from "../../store/actions/index"
import {connect} from "react-redux"
import Spinner from "../../components/UI/Spinner/Spinner"
import { Redirect } from "react-router-dom"

const Auth = props => {
    const[authForm, setAuthForm] = useState({
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Mail Adress"
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        });
        const [isSignup, setIsSignup] = useState(true)

    const {buildingBurger, authRedirectPath} = props;
    useEffect(()=>{
        if(!props.buildingBurger&&props.authRedirectPath !== "/"){
            props.onSetAuthRedirectPath();
        }
    }, [buildingBurger, authRedirectPath])

    const checkValidity = (value, rules) =>{
        let isValid=true;
        if(rules.required){
            isValid=value.trim()!=="" && isValid;
        }
        if(rules.minLength){
            isValid=value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid=value.length <= rules.minLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    const inputChangedHandler = (evt) => {
        const updatedControls = {
            ...authForm,
            [evt.target.name]: {
                ...authForm[evt.target.name],
                value: evt.target.value,
                valid: checkValidity(evt.target.value, authForm[evt.target.name].validation),
                touched: true
            }
        }
        setAuthForm(updatedControls)
    }

    const submitHandler = (event) =>{
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignup);
    }

    const switchAuthModeHandler = () =>{
        setIsSignup(!isSignup)
    }

        const formElementsArray = [];
        for(let key in authForm){
            formElementsArray.push({
                id: key,
                config: authForm[key]
            })
        }
        let form = (<>
                    <form onSubmit={submitHandler}>
                        {formElementsArray.map(formElement => (
                            <Input 
                                touched={formElement.config.touched}
                                invalid={!formElement.config.valid}
                                inputType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                shouldValidate={formElement.config.validation}
                                value={formElement.config.value}
                                changed={inputChangedHandler}
                                key={formElement.id}
                                name={formElement.id}/>
                        ))}
                        <Button btnType="Success">SUBMIT</Button>  
                    </form>
                    </>);
        if(props.loading){
            form=<Spinner />
        }

        let errorMessage = null;
        if(props.error){
            errorMessage = <p>{props.error.message}</p>
        }
        return (
            <div className={classes.Auth}>
                {props.isAuthenticated ? <Redirect to={props.authRedirectPath} /> : null}
                {errorMessage}
                {form}
                <Button 
                    style={{display: "block"}}
                    clicked={switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {isSignup?"SIGNIN":"SIGNUP"}</Button>
            </div>
        );
}

const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
    }
}

const mapStateToProps = state =>{
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);