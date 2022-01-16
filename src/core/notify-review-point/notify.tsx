import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Box, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import React, { FunctionComponent } from "react";

const CardComponent = styled(Box)(({ theme }) => ({
    width: theme.spacing(200),
    height:theme.spacing(25),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.spacing(2.5),
    backgroundColor: theme.colors.background.white,
    marginBottom:theme.spacing(3)
}))

const AvatarPersonBox=styled(Box)(({theme})=>({
    width:theme.spacing(12),
    height:theme.spacing(12),
    borderRadius: "50%"
}))

const ContentComponent=styled(Box)(({theme})=>({
    width:"85%",
    height:"100%",
    display:"flex",
    flexDirection: "row",
    alignItems: "center",
}))

const NamePerson=styled(Typography)(({ theme })=>({
    fontSize: theme.fontSizes.changePass,
    fontWeight:"bold",
    paddingLeft:theme.spacing(2)
}))

const ActivePerson=styled(Typography)(({ theme })=>({
    fontSize: theme.fontSizes.changePass,
    color:theme.colors.texting.classcode,
    paddingLeft:theme.spacing(1),
    display:"flex",
    alignItems: "center",
    justifyContent:"center"
}))

const AvartarPerson=styled(PersonOutlineIcon)(({theme})=>({
    width:"100%",
    height:"100%",
}))

const TitlePost=styled(Typography)(({ theme })=>({
    fontSize: theme.fontSizes.changePass,
    paddingLeft:theme.spacing(1),
    color:theme.colors.texting.button,
    fontWeight: "bold"
}))

const NotifyReviewPointDetail: FunctionComponent = () => {
    return (
            <CardComponent sx={{ boxShadow: 3 }}>
                <AvatarPersonBox>
                    <AvartarPerson/>
                </AvatarPersonBox>
                <ContentComponent>
                    <NamePerson>Tran Duc Nang</NamePerson>
                    <ActivePerson>commented in post </ActivePerson>
                    <TitlePost>Review abc</TitlePost>
                </ContentComponent>
            </CardComponent>
    )
}

export default NotifyReviewPointDetail;