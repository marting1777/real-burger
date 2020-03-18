import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

// IMPORT COMPONENTS
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import { authCheckState } from './store/actions/auth';

const Checkout = React.lazy(() => {
    return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
    return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
    return import('./containers/Auth/Auth');
});

const App = props => {
    useEffect(() => {
        props.onTryAutoSignUp();
    }, []);

    let routes = (
        <>
            <Route path="/auth" render={props => <Auth {...props} />}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to="/"/>
        </>
    );

    if (props.isAuthenticated) {
        routes = (
            <>
                <Route path="/checkout" render={props => <Checkout {...props} />}/>
                <Route path="/orders" render={props => <Orders {...props} />}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/auth" render={props => <Auth {...props} />}/>
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to="/" />
            </>
        );
    }

    return (
        <div>
            <Layout>
                <Switch>
                    <Suspense fallback={<p>Loading...</p>}>
                        {routes}
                    </Suspense>
                </Switch>
            </Layout>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(authCheckState()),
    };
};

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( App ));
