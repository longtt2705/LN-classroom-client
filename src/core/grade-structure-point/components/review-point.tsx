import { Box, Button, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import React, { FunctionComponent } from "react";
import { emailValidation, onlyNumberValidation,useValidator, useValidatorManagement } from "../../../utils/validator";



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

const PointReview = styled(TextField)(({ theme }) => ({
    width: "90%",
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
    borderRadius:theme.spacing(2)
}))

const SubmitButton = styled(Button)(({ theme }) => ({
    width: theme.spacing(25),
    height: theme.spacing(6),
    fontWeight: "bold",
    fontSize: theme.fontSizes.changePass,
    borderRadius:theme.spacing(2)
}))

const Description = styled(TextField)(({theme})=>({
    width:"100%",
    height:theme.spacing(10),
    marigin:theme.spacing(1),
}))

const ForgotPassword: FunctionComponent = () => {
    const validatorFields = useValidatorManagement()
    const point = useValidator("point", onlyNumberValidation, "", validatorFields)
    const handleOnChange = validatorFields.handleOnChange
    const hasError = validatorFields.hasError()

    return (
        <HorizontalCenterContainer>
            <CardComponent sx={{ boxShadow: 3 }}>
                <EmailText>Review Point</EmailText>
                <EmailText>Homework name</EmailText>
                <PointReview
                    required
                    fullWidth
                    label="Point you want"
                    autoComplete="point"
                    error={point.hasError()}
                    helperText={point.error}
                    onChange={handleOnChange(point)}
                    onBlur={() => point.validate()}
                />
                <Description  
                autoComplete="description"
                />
                <ButtonComponent>
                    <SubmitButton
                        variant="contained"
                        color="success"
                        disabled={hasError}
                    >
                        Send
                    </SubmitButton>
                    <BackToHome
                        variant="contained"
                        color="primary"
                    >
                        Back
                    </BackToHome>
                </ButtonComponent>
            </CardComponent>
        </HorizontalCenterContainer>
    )
}

export default ForgotPassword;