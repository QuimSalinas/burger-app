import React from "react";
import classes from "./BuildControls.module.scss";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    { label: "Salad", type: 'salad'},
    { label: "Bacon", type: 'bacon'},
    { label: "Cheeese", type: 'cheese'},
    { label: "Meat", type: 'meat'}
]
const buildControls = (props) =>(
    <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl =>(
            <BuildControl   
                key={ctrl.label} 
                label={ctrl.label} 
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}/>
        ))}
        <button disabled={!props.purchasable} 
                className={classes.OrderButton}
                onClick={props.ordered}>
                    {props.isAuth ? "ORDER NOW" : "SIGNUP TO ORDER"}
        </button>
    </div>
)

export default buildControls;