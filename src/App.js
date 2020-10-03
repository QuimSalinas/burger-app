import React, {useEffect} from 'react';
import Layout from "./hoc/Layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"
import Logout from "./containers/Auth/Logout/Logout"
import { connect } from "react-redux"
import * as actions from "./store/actions/index"
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout")
})

const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders")
})

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth")
})

function App(props) {
  useEffect(()=>{
    props.onTryAutoSignups()
  },[props])

  let routes = (
    <Switch>
      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/auth" component={asyncAuth} />
      <Redirect to="/" />
    </Switch>
  );
  if(props.isAuthenticated){
    routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/auth" component={asyncAuth} />
        <Route path="/orders" component={asyncOrders} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    )
  }
  return (
    <div >
      <BrowserRouter>
        <Layout>
          {routes}
        </Layout>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state =>{
  return {
    isAuthenticated: state.auth.token!==null
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    onTryAutoSignups: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
