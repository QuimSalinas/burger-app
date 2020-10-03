import * as actionTypes from "./actionTypes"
import axios from "../../axios"

export const addIngredient = (name) =>{
    return {
        ingredientName: name,
        type: actionTypes.ADD_INGREDIENT,
        building: true
    }
}

export const removeIngredient = (name) =>{
    return {
        ingredientName: name,
        type: actionTypes.REMOVE_INGREDIENT,
        building: true
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
        building: false
    }
}

export const fetchIngredientsFailed = () =>{
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAIL
    }
}

export const initIngredients = () =>{
    return dispatch =>{
        axios.get("https://react-my-burger-8fc2b.firebaseio.com/ingredients.json")
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(err=> dispatch(fetchIngredientsFailed()))
    }
}