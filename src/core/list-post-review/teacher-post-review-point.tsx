import { Box, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import React, { FunctionComponent, useEffect, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import { getUserDataById } from "../../services/user";
import { useAppDispatch } from "../../app/hooks";
import { createAlert } from "../../slices/alert-slice";
import { ERROR_MESSAGE } from "../../shared/messages";
import SpinnerLoading from "../components/spinner-loading";

const CardComponent = styled(Box)(({ theme }) => ({
    width: theme.spacing(180),
    height: theme.spacing(15),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: theme.spacing(2.5),
    backgroundColor: theme.colors.background.white,
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2)
}))

const AvatarPersonBox = styled(Box)(({ theme }) => ({
    width: theme.spacing(11),
    height: theme.spacing(11),
    borderRadius: "50%",
    backgroundColor: theme.colors.background.icon
}))

const AvartarPerson = styled(PersonIcon)(({ theme }) => ({
    width: "100%",
    height: "100%",
    color: theme.colors.texting.textLabel
}))

const Content = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
}))

const Active = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.changePass,
    color: theme.colors.texting.classcode,
    fontWeight: "bold",
    marginLeft: theme.spacing(2),
}))

const NameHomework = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.changePass,
    color: theme.colors.texting.gradeStruct,
    fontWeight: "bold",
    marginLeft: theme.spacing(2),
}))

const NameStudent = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.changePass,
    color: theme.colors.texting.button,
    fontWeight: "bold",
    marginLeft: theme.spacing(2),
}))

interface Comment {
    idPerson: string,
    content: string,
}

interface PostProps {
    _id: string
    idHomework: string,
    idStudent: string,
    comments: Comment[],
    pointReview: number,
    explain: string,
    title: string,
}

interface UserProps {
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

const TeacherPost: FunctionComponent<{ post: PostProps }> = ({ post }) => {
    const [student, setStudent] = useState<UserProps>()
    const dispatch = useAppDispatch()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const result = await getUserDataById(post.idStudent)
                const userData = result.data as UserProps
                setStudent(userData)
            }
            catch {
                dispatch(createAlert({
                    message: ERROR_MESSAGE,
                    severity: "error"
                }))
            }
            finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [post.idStudent, dispatch])

    return (
        isLoading ? (<SpinnerLoading />) :
            (<CardComponent sx={{ boxShadow: 3 }}>
                <AvatarPersonBox>
                    <AvartarPerson />
                </AvatarPersonBox>
                <Content>
                    <NameStudent>{student!.firstName} {student!.lastName} </NameStudent>
                    <Active>Reviewed Point Homework: </Active>
                    <NameHomework>{post.title}</NameHomework>
                </Content>
            </CardComponent>)
    )
}

export default TeacherPost;