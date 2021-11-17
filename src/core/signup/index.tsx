import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { VerticalCenterContainer } from '../components/container';
import OAuthButton from '../components/oauth-button';
import SignUpImage from '../../public/images/signup-classroom.jpg';
import { emailValidation, notEmptyValidation, passwordValidation, usernameValidation, useValidator, useValidatorManagement } from '../../utils/validator';
import { useAppDispatch } from '../../app/hooks';
import { registerUser } from '../../slices/user-slice';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { get } from 'lodash';


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

export default function SignIn() {
    const validatorFields = useValidatorManagement()
    const firstName = useValidator("firstName", notEmptyValidation, "", validatorFields)
    const lastName = useValidator("lastName", notEmptyValidation, "", validatorFields)
    const email = useValidator("email", emailValidation, "", validatorFields)
    const username = useValidator("username", usernameValidation, "", validatorFields)
    const password = useValidator("password", passwordValidation, "", validatorFields)
    const history = useHistory()
    const dispatch = useAppDispatch()

    const hasError = validatorFields.hasError()
    const handleSubmit = async () => {

        validatorFields.validate()
        if (!validatorFields.hasError()) {
            const payload = validatorFields.getValuesObject()
            try {
                await dispatch(registerUser(payload)).unwrap()
                history.push("/login")
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    const usernameError = get(err.response?.data, "username")
                    const emailError = get(err.response?.data, "email")
                    username.setError(usernameError)
                    email.setError(emailError)
                }
            }
        }
    };

    const handleOnChange = validatorFields.handleOnChange

    return (
        <ThemeProvider theme={theme}>
            <BackgroundImage src={SignUpImage} />
            <Container component="main" maxWidth="xs" sx={{ height: "100vh" }}>
                <VerticalCenterContainer >
                    <CssBaseline />
                    <StyledCard>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h6" align="center">
                            Welcome to Classroom Management. Sign-up to continue
                        </Typography>
                        <Box component="main" sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="First name"
                                error={firstName.hasError()}
                                helperText={firstName.error}
                                onChange={handleOnChange(firstName)}
                                onBlur={() => firstName.validate()}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Last name"
                                error={lastName.hasError()}
                                helperText={lastName.error}
                                onChange={handleOnChange(lastName)}
                                onBlur={() => lastName.validate()}
                            />
                            <TextField
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
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                error={username.hasError()}
                                helperText={username.error}
                                label="Username"
                                autoComplete="username"
                                onChange={handleOnChange(username)}
                                onBlur={() => username.validate()}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                error={password.hasError()}
                                helperText={password.error}
                                autoComplete="current-password"
                                onChange={handleOnChange(password)}
                                onBlur={() => password.validate()}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ borderRadius: 29, mt: 2 }}
                                onClick={handleSubmit}
                                disabled={hasError}
                            >
                                Sign Up
                            </Button>
                            <Typography align="center" sx={{ mb: 2, mt: 2 }}>
                                <Link to="/login">
                                    {"Already had an account? Sign In now!"}
                                </Link>
                            </Typography>
                            <OAuthButton name="google" />
                            <OAuthButton name="facebook" />
                        </Box>
                    </StyledCard>
                </VerticalCenterContainer>
            </Container>
        </ThemeProvider>
    );
}