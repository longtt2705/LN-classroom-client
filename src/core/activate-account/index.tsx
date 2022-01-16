import { Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import { activateAccount } from "../../services/auth";
import { createAlert } from "../../slices/alert-slice";
import { checkAuthentication } from "../../slices/user-slice";
import { CenterContainer } from "../components/container";
import SpinnerLoading from "../components/spinner-loading";


const ActivateAccount: FunctionComponent = () => {
    const { search } = useLocation();

    const query = new URLSearchParams(search);
    const token = query.get('token');

    const [isLoading, setLoading] = useState(true)
    const dispatch = useAppDispatch()
    const history = useHistory()

    useEffect(() => {
        const checkToken = async () => {
            try {
                await activateAccount(token || "")
                dispatch(checkAuthentication())
            } catch (err) {
                history.replace("/login")
                dispatch(createAlert({
                    message: "Unable to activate account!",
                    severity: "error"
                }))
            } finally {
                setLoading(false)
            }
        }
        checkToken()
    }, [token, dispatch, history])

    return (
        <>
            {isLoading ? <SpinnerLoading /> :
                <CenterContainer>
                    <Typography>Invalid Confirmation link</Typography>
                </CenterContainer>
            }
        </>
    );
}

export default ActivateAccount;