import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliar/Auxiliar"
import Button from "../../UI/Buttons/Button"

const OrderSummary = props => {
        const ingredientSummary = Object.entries(props.ingredients).map(([key, value]) =>(
            <li key={key}><span style={{textTransform: "capitalize"}}>{`${key}`}</span>{`: ${value}`}</li>
        ))
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious Burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
}

export default OrderSummary;