import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
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


const theme = createTheme();

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '19px',
    padding: theme.spacing(2)
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
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
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
                            <Typography sx={{ mb: 2, mt: 2 }}>
                                <Link href="#" variant="body1">
                                    Forgot password?
                                </Link>
                            </Typography>
                            <Grid container sx={{ mt: 2, mb: 2 }}>
                                <Grid item xs>
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
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
                                <Link href="#" variant="body2">
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