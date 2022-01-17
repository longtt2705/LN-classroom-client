import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import React, { FunctionComponent } from "react";
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { markSeen, Notification } from "../../slices/notification-slice";

const CardComponent = styled(Box)(({ theme }) => ({
    width: theme.spacing(200),
    height: theme.spacing(25),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.spacing(2.5),
    backgroundColor: theme.colors.background.white,
    marginBottom: theme.spacing(3),
    cursor: 'pointer'
}))

const AvatarPersonBox = styled(Box)(({ theme }) => ({
    width: theme.spacing(10),
    height: theme.spacing(10),
    paddingRight: theme.spacing(4),
    borderRadius: "50%"
}))

const ContentComponent = styled(Box)(({ theme }) => ({
    width: "85%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
}))

const AvartarPerson = styled(NotificationsActiveIcon)(({ theme }) => ({
    width: "100%",
    height: "100%",
    color: theme.colors.texting.button,
}))

const TitlePost = styled(`div`)(({ theme }) => ({
    fontSize: theme.fontSizes.changePass,
    paddingLeft: theme.spacing(1),
    color: theme.colors.texting.button,
}))

const NotifyReviewPointDetail: FunctionComponent<{ data: Notification }> = ({ data }) => {
    const history = useHistory()
    const dispatch = useAppDispatch()
    const socket = useAppSelector(state => state.socketSlice.socket)
    const user = useAppSelector(state => state.userReducer.user)

    const handleClick = () => {
        if (socket) {
            socket.emit("markSeen", user!._id!, data.id)
            dispatch(markSeen(data.id))
            history.push(data.path)
        }
    }

    return (
        <CardComponent sx={{ boxShadow: 3 }} onClick={handleClick}>
            <AvatarPersonBox>
                <AvartarPerson sx={{ color: data.hasSeen && 'black' }} />
            </AvatarPersonBox>
            <ContentComponent>
                <TitlePost sx={{ color: data.hasSeen && 'black' }} dangerouslySetInnerHTML={{ __html: data.payload }} />
            </ContentComponent>
        </CardComponent>
    )
}

export default NotifyReviewPointDetail;