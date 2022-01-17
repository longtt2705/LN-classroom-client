import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Box, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import React, { FunctionComponent, useEffect, useState } from "react";
import { useAppDispatch } from '../../app/hooks';
import { getUserDataById } from '../../services/user';
import { createAlert } from '../../slices/alert-slice';
import SpinnerLoading from '../components/spinner-loading';

const CardComponent = styled(Box)(({ theme }) => ({
    width: theme.spacing(180),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.spacing(2.5),
    backgroundColor: theme.colors.background.white,
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(5),
    paddingTop:theme.spacing(3),
    paddingLeft:theme.spacing(2)
}))

const AvatarAndName = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "30%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
}))

const AvatarPersonBox = styled(Box)(({ theme }) => ({
    width: theme.spacing(8),
    height: theme.spacing(8),
    borderRadius: "50%",
    backgroundColor:theme.colors.texting.classcode
}))

const AvartarPerson = styled(PersonOutlineIcon)(({ theme }) => ({
    width: "100%",
    height: "100%",
}))


const NamePerson = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.changePass,
    fontWeight: "bold",
    paddingLeft: theme.spacing(2),
    color: theme.colors.texting.button
}))

const CommentComponent = styled(Box)(({ theme }) => ({
    width: "85%",
    marginLeft: theme.spacing(5),
    paddingTop:theme.spacing(1),
    paddingBottom: theme.spacing(2)
}))

const CommentContent = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.changePass,
}))

interface CommentProps{
    idPerson: string,
    content: string,
}

interface UserProps{
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    isActive?: boolean;
    provider: string;
    studentId?: string;
    hasInputStudentId: boolean;
  }

const Comment: FunctionComponent<{comment:CommentProps}> = ({comment}) => {
    const [user,setUser]=useState<UserProps>()
    const dispatch = useAppDispatch()
    const [isLoading,setLoading]=useState(true)

    useEffect(() => {
        const fetchData=async()=>{
            setLoading(true)
            try{
                const result=await getUserDataById(comment.idPerson)
            const userData=result.data as UserProps
            setUser(userData)
            }catch{
                dispatch(createAlert({
                    message: "Comment failure",
                    severity: "error"
                }))
            }finally{
                setLoading(false)
            }
        }
        fetchData()
    }, [comment,dispatch])

    return (
        isLoading?<SpinnerLoading/>:
        <CardComponent sx={{ boxShadow: 3 }}>
            <AvatarAndName>
                <AvatarPersonBox>
                    <AvartarPerson />
                </AvatarPersonBox>
                <NamePerson>{user!.lastName} {user!.firstName}</NamePerson>
            </AvatarAndName>
            <CommentComponent>
                <CommentContent>{comment.content} </CommentContent>
            </CommentComponent>
        </CardComponent>
    )
}

export default Comment;