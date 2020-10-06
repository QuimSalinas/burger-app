import React, {useEffect, Suspense} from 'react';
import Layout from "./hoc/Layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"
import Logout from "./containers/Auth/Logout/Logout"
import { connect } from "react-redux"
import * as actions from "./store/actions/index"

const Checkout = React.lazy(() => {
  return import("./containers/Checkout/Checkout")
})

const Orders = React.lazy(() => {
  return import("./containers/Orders/Orders")
})

const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth")
})

function App(props) {
  const {onTryAutoSignups} = props;
  useEffect(()=>{
    props.onTryAutoSignups()
  },[onTryAutoSignups])

  let routes = (
    <Switch>
      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/auth" component={Auth} />
      <Redirect to="/" />
    </Switch>
  );
  if(props.isAuthenticated){
    routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/auth" component={Auth} />
        <Route path="/orders" component={Orders} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    )
  }
  return (
    <div >
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<p>loading...</p>}>{routes}</Suspense>
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
