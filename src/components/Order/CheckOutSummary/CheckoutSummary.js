import React from "react"
import Burger from "../../Burger/Burger"
import Button from "../../UI/Buttons/Button"
import classes from "./CheckoutSummary.module.scss"

const checkoutSummary = (props) =>{
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width:"100%"}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinue}>CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary;