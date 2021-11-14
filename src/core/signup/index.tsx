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
import * as React from 'react';
import { VerticalCenterContainer } from '../components/container';
import OAuthButton from '../components/oauth-button';
import SignUpImage from '../../public/images/signup-classroom.jpg';

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
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

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
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="firstname"
                                label="First name"
                                name="firstname"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="lastname"
                                label="Last name"
                                name="lastname"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ borderRadius: 29, mt: 2 }}
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