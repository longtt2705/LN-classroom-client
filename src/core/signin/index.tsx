import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import OAuthButton from '../components/oauth-button';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { VerticalCenterContainer } from '../components/container';
import SignInImage from '../../public/images/signin-classroom.jpg';
import { loginUser } from '../../slices/user-slice';
import { useAppDispatch } from '../../app/hooks';
import { LOGIN_FAILED } from '../../shared/messages';
import { useHistory } from "react-router-dom";


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
    const dispatch = useAppDispatch();
    const [errors, setErrors] = React.useState("")
    const history = useHistory()
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const rememberMe = data.get('rememberMe')
        const payload: { username: any, password: any, rememberMe?: any } = {
            username: data.get('username'),
            password: data.get('password'),
            rememberMe: rememberMe
        }
        !rememberMe && delete payload.rememberMe
        try {
            dispatch(loginUser(payload))
        } catch (err) {
            setErrors(LOGIN_FAILED)
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <BackgroundImage src={SignInImage} />
            <Container component="main" maxWidth="xs" sx={{ height: "100vh" }}>
                <VerticalCenterContainer >
                    <CssBaseline />
                    <StyledCard>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h6" align="center">
                            Welcome to Classroom Management. Sign-in to continue
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                error={errors.length > 0}
                                helperText={errors}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Typography sx={{ mb: 2, mt: 2 }}>
                                <Link to="/">
                                    Forgot password?
                                </Link>
                            </Typography>
                            <Grid container sx={{ mt: 2, mb: 2 }}>
                                <Grid item xs>
                                    <FormControlLabel name="rememberMe" id="rememberMe"
                                        control={<Checkbox value="rememberMe" color="primary" name="rememberMe" id="rememberMe" />}
                                        label="Remember me"
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ borderRadius: 29 }}
                                    >
                                        Sign In
                                    </Button>
                                </Grid>
                            </Grid>
                            <Typography align="center" sx={{ mb: 2, mt: 2 }}>
                                <Link to="/register" >
                                    {"Don't have an account? Sign Up"}
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