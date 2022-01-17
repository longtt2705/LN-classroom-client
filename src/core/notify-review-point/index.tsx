import { Box, Button, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import React, { FunctionComponent, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { Notification } from "../../slices/notification-slice";
import theme from "../../themes";
import NotifyReviewPointDetail from "./notify";

const HorizontalCenterContainer = styled(Box)(({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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
    const all = useAppSelector(state => state.notificationSlice.notifications)
    const unseen = useAppSelector(state => state.notificationSlice.unseenNotifications)
    const [viewAll, setView] = useState(true)

    const renderListNotifications = (list: Notification[]) => {
        return list.length > 0 ?
            list.slice(0).reverse().map((item, index) => (
                <NotifyReviewPointDetail data={item} key={index} />
            ))
            : (<Typography variant="h3">There is no notification</Typography>)
    }

    return (
        <HorizontalCenterContainer>
            <CardComponent>
                <NotifyText>Notifications</NotifyText>
                <ButtonComponent>
                    <PostTypeButton variant="contained" color={viewAll ? "primary" : "grey"} onClick={() => setView(true)}>All</PostTypeButton>
                    <PostTypeButton variant="contained" color={!viewAll ? "primary" : "grey"} onClick={() => setView(false)}>Not Read</PostTypeButton>
                </ButtonComponent>
                <NotifyComponent>
                    {
                        renderListNotifications(viewAll ? all : unseen)
                    }
                </NotifyComponent>
            </CardComponent>
        </HorizontalCenterContainer>
    )
}

export default NotifyReviewPoint;