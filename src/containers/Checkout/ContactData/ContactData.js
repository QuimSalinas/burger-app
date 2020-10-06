import React, { useState } from 'react';
import Button from "../../../components/UI/Buttons/Button"
import classes from "./ContactData.module.scss"
import axios from "../../../axios"
import Spinner from "../../../components/UI/Spinner/Spinner"
import Input from "../../../components/UI/Input/Input"
import { connect } from "react-redux"
import withErrorHandler from "../../../hoc/WithErrorHandler/withErrorHandler"
import * as actions from "../../../store/actions/index"

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
        },
        street: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Street"
            },
            value: "",
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Zip Code"
            },
            value: "",
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Country"
            },
            value: "",
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: "Your E-mail"
            },
            value: "",
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: "select",
            elementConfig: {
                options: [{value: "fastest", displayValue: "Fastest"},
                            {value: "cheapest", displayValue: "Cheapest"}]
            },
            value: "fastest",
            validation: {},
            valid: true
        }});
    const [formIsValid, setFormIsValid] = useState(false);
    

    const checkValidity = (value, rules) => {
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
        return isValid;
    }

    const inputChangedHandler = (evt) => {
        const newForm = {...orderForm};
        const updatedFormElement = {...newForm[evt.target.name]}
        updatedFormElement.value = evt.target.value;
        updatedFormElement.valid=checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched=true;
        newForm[evt.target.name] = updatedFormElement;

        let formIsValid=true;
        for(let key in newForm){
            formIsValid = newForm[key].valid&&formIsValid;
        }
        setOrderForm(newForm);
        setFormIsValid(formIsValid)
    }

    const orderHandler = (event) =>{
        event.preventDefault();
        const formData = {};
        for(let formElementIdentifyer in orderForm){
            formData[formElementIdentifyer]=orderForm[formElementIdentifyer].value
        };
        const order = {
                ingredients: props.ings,
                price: props.price,
                orderData: formData,
                userId: props.userId
        };
        props.onOrderBurger(order, props.token);
    }

        const formElementsArray = [];
        for(let key in orderForm){
            formElementsArray.push({
                id: key,
                config: orderForm[key]
            })
        }
        let form = (<>
                    <h4>Enter your contact data</h4>
                    <form onSubmit={orderHandler}>
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
                        <Button disabled={!formIsValid} btnType="Success" clicked={orderHandler}>ORDER</Button>    
                    </form>
                    </>);
        if(props.loading) form = <Spinner />
        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        );
}

const mapStateToProps = state =>{
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };   
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));