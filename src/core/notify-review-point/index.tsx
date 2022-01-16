import { Box, Button, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import React, { FunctionComponent } from "react";
import theme from "../../themes";
import NotifyReviewPointDetail from "./notify";

const HorizontalCenterContainer = styled(Box)(({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: theme.colors.background.notify,
}));

const CardComponent = styled(Box)(({ theme }) => ({
    width: theme.spacing(220),
    display: "flex",
    flexDirection: "column",
    borderRadius: theme.spacing(2.5),
    backgroundColor: theme.colors.background.white
}))

const NotifyText = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.sizeLabel,
    fontWeight: "bold",
    paddingLeft: theme.spacing(5),
    marginTop: theme.spacing(5),
}))

const ButtonComponent = styled(Box)(({ theme }) => ({
    mariginLeft: theme.spacing(3),
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: theme.spacing(62),
    height: theme.spacing(20),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
}))

const TypeNotify = styled(Typography)(({ theme }) => ({
    paddingLeft: theme.spacing(5),
    marginTop: theme.spacing(5),
    fontSize: theme.fontSizes.codeclass,
    fontWeight: "bold"
}))

const NotifyComponent = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: theme.spacing(5),
    marginTop: theme.spacing(5),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
}))

const PostTypeButton = styled(Button)(({ theme }) => ({
    width: theme.spacing(30),
    height: theme.spacing(8),
    borderRadius: theme.spacing(10),
    fontWeight: "bold"
}))

const NotifyReviewPoint: FunctionComponent = () => {
    const lists = [1, 2, 3, 4, 5]
    return (
        <HorizontalCenterContainer>
            <CardComponent>
                <NotifyText>Notify</NotifyText>
                <ButtonComponent>
                    <PostTypeButton variant="contained" color="primary">All</PostTypeButton>
                    <PostTypeButton variant="contained" color="primary">Not Read</PostTypeButton>
                </ButtonComponent>
                <TypeNotify>New</TypeNotify>
                <NotifyComponent>
                    <NotifyReviewPointDetail />
                </NotifyComponent>
                <TypeNotify>Last</TypeNotify>
                <NotifyComponent>
                    {lists.map((list, index) => (
                        <NotifyReviewPointDetail />
                    ))}
                </NotifyComponent>
            </CardComponent>
        </HorizontalCenterContainer>
    )
}

export default NotifyReviewPoint;