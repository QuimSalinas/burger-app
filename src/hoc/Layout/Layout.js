import React, { useState } from "react";
import Aux from "../Auxiliar/Auxiliar"
import classes from "./Layout.module.scss"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"
import { connect } from "react-redux"

const Layout = props => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);
    const sideDrawerCloseHandler = () =>{
        setSideDrawerIsVisible(false);
    }
    const sideDrawerToggleHandler = () =>{
        setSideDrawerIsVisible(!sideDrawerIsVisible)
    }
    return (
        <Aux>
            <Toolbar 
                isAuth={props.isAuthenticated}
                DrawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer open={sideDrawerIsVisible} 
                        closed={sideDrawerCloseHandler}
                        isAuth={props.isAuthenticated}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

const mapStateToProps = state =>{
    return{
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);