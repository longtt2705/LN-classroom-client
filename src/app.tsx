import Layout from './layout';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import ListRouter from "./app/routes"
import LoginPage from './core/signin'
import RegisterPage from './core/signup'
import AlertSnackBar from './core/components/alert';
import PageNotFound from './core/components/page-not-found';


const App = () => {
    const isAuthenticated = true
    return (
        <Router>
            {
                !isAuthenticated ?
                    (<Switch>
                        <Route exact path={"/login"} component={LoginPage} />
                        <Route exact path={"/register"} component={RegisterPage} />
                        <Route path={"/"} render={() => <Redirect to='/login' />} />
                    </Switch>) :
                    (<Layout>
                        {ListRouter.map((route, index) => (
                            <Route
                                key={index}
                                exact={route.exactPath}
                                path={route.path}
                                render={() => (
                                    <route.component name={route.name} />
                                )}
                            />
                        ))}
                        <Route path={"/"} component={PageNotFound} />
                    </Layout>)
            }
            <AlertSnackBar />
        </Router>
    );
}

export default App;