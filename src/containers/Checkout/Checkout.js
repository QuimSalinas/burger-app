import React from 'react';
import CheckoutSummary from "../../components/Order/CheckOutSummary/CheckoutSummary"
import { Route, Redirect } from "react-router-dom"
import ContactData from "./ContactData/ContactData"
import {connect} from "react-redux"

const Checkout = props => {

    const checkoutCancelledHandler = () =>{
        props.history.goBack();
    }

    const checkoutContinueHandler = () =>{
        props.history.replace("/checkout/contact-data")
    }
    let summary = <Redirect to="/"/>
    if(props.ings){
        const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
        summary=<>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={props.ings} 
                                    checkoutCancel={checkoutCancelledHandler} 
                                    checkoutContinue={checkoutContinueHandler}/>
                    <Route  path={props.match.path  + '/contact-data'} 
                            component={ContactData}/>
                </>
    }
    return (
        <div>
            {summary} 
        </div>
    );
}

const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);