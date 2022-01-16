import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Box, Button, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import React, { FunctionComponent, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { forgotPassword, sendVerificationEmail } from '../../services/auth';

const HorizontalCenterContainer = styled(Box)(({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
}));

const CardComponent = styled(Box)(({ theme }) => ({
    height: theme.spacing(80),
    width: theme.spacing(80),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.spacing(2.5),
    position: "relative"
}))

const IconLetter = styled(MailOutlineIcon)(({ theme }) => ({
    height: theme.spacing(30),
    width: theme.spacing(30),
    color: theme.colors.texting.button
}))

const ConfirmTitle = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.sizeLabel,
    color: theme.colors.classcode,
    margin: theme.spacing(3),
    align: 'center'
}))

const ConformSent = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.default,
    fontWeight: "bold"
}))

const EmailText = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.default,
}))

const BackToHome = styled(Button)(({ theme }) => ({
    width: theme.spacing(25),
    height: theme.spacing(6),
    position: "absolute",
    bottom: theme.spacing(2),
    fontWeight: "bold",
    fontSize: theme.fontSizes.changePass
}))

const SendEmail: FunctionComponent<{ email: string, isAuth: boolean }> = ({ email, isAuth }) => {
    const history = useHistory()

    const handleBack = () => {
        history.push(`/signin`)
    }

    useEffect(() => {
        isAuth ? sendVerificationEmail(email) : forgotPassword(email)
    }, [isAuth, email])

    return (
        <HorizontalCenterContainer>
            <CardComponent sx={{ boxShadow: 3 }}>
                <IconLetter />
                {isAuth ?
                    <ConfirmTitle align='center'>Your account has not been activated</ConfirmTitle>
                    : <ConfirmTitle align='center'>Confirm your email address</ConfirmTitle>
                }

                <ConformSent>Confirmation email has been send to:</ConformSent>
                <EmailText>{email}</EmailText>
                {
                    !isAuth && (
                        <BackToHome
                            variant="contained"
                            color="primary"
                            onClick={handleBack}
                        >
                            Back to home
                        </BackToHome>
                    )
                }

            </CardComponent>
        </HorizontalCenterContainer>
    )
}

export default SendEmail;