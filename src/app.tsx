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
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect, useState } from 'react';
import { checkAuthentication } from './slices/user-slice';
import { useHistory } from 'react-router-dom'
import LoadingScreen from './core/components/loading-screen';
import Invitation from './core/invitation';
import { getAllClassroom } from './slices/classroom-slice';
import UserProfile from './core/user-profile';


const App = () => {
    const isAuthenticated = useAppSelector((state) => state.userReducer.isAuthenticated)
    const isLoading = useAppSelector((state) => state.userReducer.isLoading)
    const history = useHistory()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(checkAuthentication())
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            history && history.push("/")
        }

    }, [isAuthenticated])

    return (
        <>
            {isLoading && <LoadingScreen />}
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
                        <Route exact path={"/classrooms/:id"} component={ClassroomDetail} />
                        <Route exact path={"/invite/:token"} component={Invitation} />
                        <Route exact path={"/profile"} component={UserProfile} />
                        <Route path={"/"} component={PageNotFound} />
                    </Layout>)
            }
            <AlertSnackBar />
        </>
    );
}

export default App;