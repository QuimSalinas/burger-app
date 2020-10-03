import React, {Component} from "react";
import Aux from "../Auxiliar/Auxiliar"
import classes from "./Layout.module.scss"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"
import { connect } from "react-redux"

class layout extends Component{
    state = {
        showSideDrawer: false
    }
    sideDrawerCloseHandler = () =>{
        this.setState({showSideDrawer: false})
    }
    sideDrawerToggleHandler = () =>{
        this.setState(st=> {
            return {showSideDrawer: !st.showSideDrawer}
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    DrawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} 
                            closed={this.sideDrawerCloseHandler}
                            isAuth={this.props.isAuthenticated}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
    
}

const mapStateToProps = state =>{
    return{
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(layout);