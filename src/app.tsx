import { useEffect } from 'react';
import {
    Redirect, Route,
    Switch, useHistory, useLocation
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from './app/hooks';
import ListRouter from "./app/routes";
import ClassroomDetail from './core/classroom-detail';
import AlertSnackBar from './core/components/alert';
import LoadingScreen from './core/components/loading-screen';
import PageNotFound from './core/components/page-not-found';
import Invitation from './core/invitation';
import LoginPage from './core/signin';
import RegisterPage from './core/signup';
import UserProfile from './core/user-profile';
import UserProfileMapping from './core/user-profile/components/user-profile-mapping';
import ForgotPassword from "./core/forgot-password"
import Layout from './layout';
import { USER_STATUS } from './shared/constant';
import { getAllClassroom } from './slices/classroom-slice';
import { checkAuthentication } from './slices/user-slice';
import BannedPage from './core/components/banned';
import SendEmail from './core/forgot-password/sendEmail';
import ActivateAccount from './core/activate-account';
import ResetPassword from './core/reset-password';

const PRE_URL = 'preUrl'

const App = () => {
    const isAuthenticated = useAppSelector((state) => state.userReducer.isAuthenticated)
    const user = useAppSelector((state) => state.userReducer.user)
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
                        <Route exact path={"/forgotpassword"} component={ForgotPassword} />
                        <Route exact path={"/reset-password"} component={ResetPassword} />
                        <Route exact path={"/confirm"} component={ActivateAccount} />
                        <Route path={"*"} render={() => {
                            if (location.pathname !== '/')
                                localStorage.setItem(PRE_URL, location.pathname)
                            return <Redirect to='/login' />
                        }} />
                    </Switch>) :
                    (user && (user?.status === USER_STATUS.UNACTIVATED ?
                        <Route path={"*"} render={() => <SendEmail email={user.email} isAuth={true} />} />
                        : user?.status === USER_STATUS.BANNED ?
                            <Route path={"*"} component={BannedPage} />
                            : (
                                <Layout>
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
                                    <Route path={"/classrooms/:id"} component={ClassroomDetail} />
                                    <Route exact path={"/invite/:token"} component={Invitation} />
                                    <Route exact path={"/profile"} component={UserProfile} />
                                    <Route exact path={"/users/students/:studentId"} component={UserProfileMapping} />
                                    <Route path={"*"} component={PageNotFound} />
                                </Layout>
                            )
                    ))
            }
            <AlertSnackBar />
        </>
    );
}

export default App;