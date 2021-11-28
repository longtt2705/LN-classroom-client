import { Typography } from "@mui/material";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Redirect, useParams } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import { joinClassByLink } from "../../services/classroom";
import { getAllClassroom } from "../../slices/classroom-slice";
import { CenterContainer } from "../components/container";
import SpinnerLoading from "../components/spinner-loading";


interface ParamTypes {
    token: string
}

const Invitation: FunctionComponent = () => {
    const { token } = useParams<ParamTypes>();
    const [isLoading, setLoading] = useState(true)
    const [isValid, setValid] = useState(false)
    const dispatch = useAppDispatch()
    const classId = useRef('')

    useEffect(() => {
        const checkToken = async () => {
            try {
                const { data } = await joinClassByLink(token)
                setValid(true)
                classId.current = data.id
                await dispatch(getAllClassroom()).unwrap()
            } catch (err) {
                // ignore
            } finally {
                setLoading(false)
            }
        }
        checkToken()
    }, [token, dispatch])

    return (
        <>
            {isLoading ? <SpinnerLoading /> :
                !isValid ?
                    (
                        <CenterContainer>
                            <Typography>Invalid invite link</Typography>
                        </CenterContainer>
                    )
                    : (
                        <Redirect to={`/classrooms/${classId.current}`} />
                    )
            }
        </>
    );
}

export default Invitation;