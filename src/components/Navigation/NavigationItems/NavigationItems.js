import React from "react";
import classes from "./NavigationItems.module.scss";
import NavigationItem from "./NavigationItem/NavigationItem"

const navigationItems = (props) =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Burger Buider</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {props.isAuthenticated ? <NavigationItem link="/logout">Log Out</NavigationItem>
                                : <NavigationItem link="/auth">Autenticate</NavigationItem>}
    </ul>
)

export default navigationItems;