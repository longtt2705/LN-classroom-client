import { LoadingButton } from '@mui/lab';
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { FunctionComponent, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import SignInImage from '../../public/images/signin-classroom.jpg';
import { resetPassword } from "../../services/auth";
import { createAlert } from "../../slices/alert-slice";
import { passwordValidation, useValidator } from "../../utils/validator";
import { VerticalCenterContainer } from '../components/container';


const theme = createTheme();

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '19px',
    padding: theme.spacing(2)
}));

const BackgroundImage = styled('img')(({
    position: 'fixed',
    bottom: 0,
    right: 0,
    zIndex: -1
}));

const ResetPassword: FunctionComponent = () => {
    const { search } = useLocation();
    const password = useValidator("password", passwordValidation)
    const confirmPassword = useValidator("password", null)
    const query = new URLSearchParams(search);
    const token = query.get('token');

    const [isLoading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const history = useHistory()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            password.validate()
            if (!password.hasError() && checkPasswordEqual()) {
                setLoading(true)
                await resetPassword(token || "", password.value)
                dispatch(createAlert({
                    message: "Changed password successfully!",
                    severity: "success"
                }))
                history.replace("/login")
            }

        } catch (err) {
            dispatch(createAlert({
                message: "Unable to reset-password account!",
                severity: "error"
            }))
        } finally {
            setLoading(false)
        }
    }

    const checkPasswordEqual = () => {
        if (confirmPassword.value !== password.value) {
            confirmPassword.setError("Confirm password does not match!")
            return false
        }
        return true
    }

    return (
        <ThemeProvider theme={theme}>
            <BackgroundImage src={SignInImage} />
            <Container component="main" maxWidth="xs" sx={{ height: "100vh" }}>
                <VerticalCenterContainer >
                    <CssBaseline />
                    <StyledCard>
                        <Typography component="h1" variant="h6" align="center">
                            Reset your password
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                fullWidth
                                autoComplete="current-password"
                                type={'password'}
                                label="New Password"
                                error={password.hasError()}
                                helperText={password.error}
                                onChange={(e: any) => password.handleOnChange(e.target.value)}
                                onBlur={() => password.validate()}
                            />
                            <Box sx={{ mt: 2 }} />
                            <TextField
                                fullWidth
                                autoComplete="current-password"
                                type={'password'}
                                label="Confirm password"
                                error={confirmPassword.hasError()}
                                helperText={confirmPassword.error}
                                onChange={(e: any) => confirmPassword.handleOnChange(e.target.value)}
                                onBlur={checkPasswordEqual}
                            />
                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ borderRadius: 29, mb: 2, mt: 2 }}
                                loading={isLoading}
                            >
                                Reset
                            </LoadingButton>
                        </Box>
                    </StyledCard>
                </VerticalCenterContainer>
            </Container>
        </ ThemeProvider>
    );
}

export default ResetPassword;