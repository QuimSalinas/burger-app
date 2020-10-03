import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliar/Auxiliar"
import Button from "../../UI/Buttons/Button"

class OrderSummary extends Component {
    render(){
        const ingredientSummary = Object.entries(this.props.ingredients).map(([key, value]) =>(
            <li key={key}><span style={{textTransform: "capitalize"}}>{`${key}`}</span>{`: ${value}`}</li>
        ))
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious Burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummary;