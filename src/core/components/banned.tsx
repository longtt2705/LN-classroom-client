import DangerousIcon from '@mui/icons-material/Dangerous';
import { Box, Button, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import React from "react";
import { logout } from '../../services/auth';

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

const BannedIcon = styled(DangerousIcon)(({ theme }) => ({
    height: theme.spacing(30),
    width: theme.spacing(30),
    color: 'red'
}))

const ConfirmTitle = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.sizeLabel,
    color: theme.colors.classcode,
    margin: theme.spacing(3),
    alignText: 'center'
}))

const BackToHome = styled(Button)(({ theme }) => ({
    width: theme.spacing(25),
    height: theme.spacing(6),
    position: "absolute",
    bottom: theme.spacing(2),
    fontWeight: "bold",
    fontSize: theme.fontSizes.changePass
}))

const BannedPage = () => {

    const handleBack = async () => {
        await logout()
        window.location.href = '/login'
    }

    return (
        <HorizontalCenterContainer>
            <CardComponent sx={{ boxShadow: 3 }}>
                <BannedIcon />
                <ConfirmTitle align='center'>Your account has been banned</ConfirmTitle>
                <BackToHome
                    variant="contained"
                    color="primary"
                    onClick={handleBack}
                >
                    out
                </BackToHome>
            </CardComponent>
        </HorizontalCenterContainer>
    )
}

export default BannedPage;