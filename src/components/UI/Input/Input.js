import React from "react";
import classes from "./Input.module.scss"

const input = (props) =>{
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }

    switch(props.inputType) {
        case('input'):
            inputElement=<input
                            name={props.name} 
                            onChange={props.changed}
                            className={inputClasses.join(" ")} 
                            {...props.elementConfig}
                            value={props.value}/>
            break;
        case('textarea'):
            inputElement=<textarea 
                            name={props.name}
                            onChange={props.changed}
                            className={inputClasses.join(" ")} 
                            {...props.elementConfig}
                            value={props.value}/>
            break;
        case('select'):
            inputElement=<select
                            name={props.name}
                            className={inputClasses.join(" ")}
                            onChange={props.changed} 
                            value={props.value}>
                            {props.elementConfig.options.map(option => (
                                <option onChange={props.changed} key={option.value} value={option.value}>
                                    {option.displayValue}
                                </option>
                            ))}
                        </select>
        break;
        default:
            inputElement=<input 
                            name={props.name}
                            onChange={props.changed}
                            className={inputClasses.join(" ")} 
                            {...props.elementConfig}
                            value={props.value}/>
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;