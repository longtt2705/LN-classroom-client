import { Box, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import React, { FunctionComponent } from "react";

const CardComponent = styled(Box)(({ theme }) => ({
    width: theme.spacing(180),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: theme.spacing(2.5),
    backgroundColor: theme.colors.background.white,
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    paddingTop:theme.spacing(2),
    paddingLeft:theme.spacing(2)
}))

const Content=styled(Box)(({theme})=>({
    width:"100%",
    display:"flex",
    flexDirection:"row",
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
}))

const Active=styled(Typography)(({ theme })=>({
    fontSize:theme.fontSizes.changePass,
    color:theme.colors.texting.classcode,
    fontWeight:"bold"
}))

const NameHomework=styled(Typography)(({ theme })=>({
    fontSize:theme.fontSizes.changePass,
    color:theme.colors.texting.gradeStruct,
    fontWeight:"bold"
}))

interface Comment{
    idPerson: string,
    content: string,
}

interface PostProps{
    _id:string
    idHomework:string,
    idStudent:string,
    comments:Comment[],
    pointReview:number,
    explain:string,
    title:string,
}

const StudentPost: FunctionComponent<{post:PostProps}> = ({post}) => {
    return (
        <CardComponent sx={{boxShadow:3}}>
            <Content>
                <Active>Reviewed Point Homework: </Active>
                <NameHomework>{post.title}</NameHomework>
            </Content>
        </CardComponent>
    )
}

export default StudentPost;