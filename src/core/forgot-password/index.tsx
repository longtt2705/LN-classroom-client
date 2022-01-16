import { Box, Button, TextField, Typography } from "@mui/material";
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import React, { useState } from "react";
import { emailValidation, useValidator, useValidatorManagement } from "../../utils/validator";
import SendEmail from "./sendEmail"
import { useHistory } from 'react-router-dom';


const theme = createTheme();

const HorizontalCenterContainer = styled(Box)(({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
}));

const CardComponent = styled(Box)(({ theme }) => ({
    height: theme.spacing(40),
    width: theme.spacing(80),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.spacing(2.5),
    position: "relative"
}))

const EmailText = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.sizeLabel,
    color: theme.colors.classcode,
    margin: theme.spacing(1)
}))

const EmailInput = styled(TextField)(({ theme }) => ({
    width: "70%",
    height: theme.spacing(10)
}))

const ButtonComponent = styled(Box)(({ theme }) => ({
    width: "100%",
    height: theme.spacing(10),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    position: "absolute",
    bottom: theme.spacing(2),
}))

const BackToHome = styled(Button)(({ theme }) => ({
    width: theme.spacing(25),
    height: theme.spacing(6),
    fontWeight: "bold",
    fontSize: theme.fontSizes.changePass,
    borderRadius: theme.spacing(2)
}))

const SubmitButton = styled(Button)(({ theme }) => ({
    width: theme.spacing(25),
    height: theme.spacing(6),
    fontWeight: "bold",
    fontSize: theme.fontSizes.changePass,
    borderRadius: theme.spacing(2)
}))


export default function ForgotPassword() {
    const validatorFields = useValidatorManagement()
    const email = useValidator("email", emailValidation, "", validatorFields)
    const handleOnChange = validatorFields.handleOnChange
    const hasError = validatorFields.hasError()
    const [isSubmit, setIsSubmit] = useState(false)
    const [emailValue, setEmailValue] = useState("")
    const history = useHistory()

    const handleSubmit = () => {
        validatorFields.validate()
        if (!validatorFields.hasError()) {
            const payload = validatorFields.getValuesObject()
            setEmailValue(payload.email)
            setIsSubmit(true)
        }
    }

    const handleBack = () => {
        history.push(`/signin`)
    }

    return (

        <ThemeProvider theme={theme}>
            {
                !isSubmit ?
                    (
                        <HorizontalCenterContainer>
                            <CardComponent sx={{ boxShadow: 3 }}>
                                <EmailText>Please input your email registed:</EmailText>
                                <EmailInput
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Email"
                                    autoComplete="email"
                                    error={email.hasError()}
                                    helperText={email.error}
                                    onChange={handleOnChange(email)}
                                    onBlur={() => email.validate()}
                                />
                                <ButtonComponent>
                                    <SubmitButton
                                        variant="contained"
                                        color="success"
                                        disabled={hasError}
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </SubmitButton>
                                    <BackToHome
                                        variant="contained"
                                        color="primary"
                                        onClick={handleBack}
                                    >
                                        Back to home
                                    </BackToHome>
                                </ButtonComponent>
                            </CardComponent>
                        </HorizontalCenterContainer>
                    ) :
                    (
                        <SendEmail email={emailValue} isAuth={false} />
                    )
            }

        </ThemeProvider>
    )
}

