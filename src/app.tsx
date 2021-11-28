import { useEffect } from 'react';
import {
    Redirect, Route,
    Switch, useHistory, useLocation
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from './app/hooks';
import ListRouter from "./app/routes";
import ClassroomDetail from './core/classroom-detail';
import AlertSnackBar from './core/components/alert';
import PageNotFound from './core/components/page-not-found';
import LoginPage from './core/signin';
import RegisterPage from './core/signup';
import Layout from './layout';
import { checkAuthentication } from './slices/user-slice';
import LoadingScreen from './core/components/loading-screen';
import Invitation from './core/invitation';
import { getAllClassroom } from './slices/classroom-slice';
import UserProfile from './core/user-profile';

const PRE_URL = 'preUrl'

const App = () => {
    const isAuthenticated = useAppSelector((state) => state.userReducer.isAuthenticated)
    const isLoading = useAppSelector((state) => state.userReducer.isLoading)
    const history = useHistory()
    const location = useLocation()
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(checkAuthentication())
    }, [dispatch])

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getAllClassroom())
            const preUrl = localStorage.getItem(PRE_URL) || "/"
            history && history.push(preUrl)
            localStorage.removeItem(PRE_URL)
        }

    }, [isAuthenticated, dispatch, history])

    return (
        <>
            {isLoading && <LoadingScreen />}
            {
                !isAuthenticated ?
                    (<Switch>
                        <Route exact path={"/login"} component={LoginPage} />
                        <Route exact path={"/register"} component={RegisterPage} />
                        <Route path={"/"} render={() => {
                            if (location.pathname !== '/')
                                localStorage.setItem(PRE_URL, location.pathname)
                            return <Redirect to='/login' />
                        }} />
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