import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Box, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { getPostById } from '../../services/classroom';
import { getUserDataById } from '../../services/user';
import { ERROR_MESSAGE } from '../../shared/messages';
import { createAlert } from '../../slices/alert-slice';
import SpinnerLoading from '../components/spinner-loading';
import Comment from "./comment";
import CommentInput from "./user-comment";

const HorizontalCenterContainer = styled(Box)(({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
}));

const CardComponent = styled(Box)(({ theme }) => ({
    width: theme.spacing(250),
    display: "flex",
    flexDirection: "column",
}))

const CardPost = styled(Box)(({ theme }) => ({
    width: theme.spacing(200),
    minHeight: theme.spacing(40),
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(5),
    borderRadius: theme.spacing(5)
}))

const AvatarAndName = styled(Box)(({ theme }) => ({
    width: "90%",
    height: "10%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
}))

const AvatarPersonBox = styled(Box)(({ theme }) => ({
    width: theme.spacing(8),
    height: theme.spacing(8),
    borderRadius: "50%",
    backgroundColor: theme.colors.texting.classcode
}))

const AvatarPerson = styled(PersonOutlineIcon)(({ theme }) => ({
    width: "100%",
    height: "100%",
}))

const NamePerson = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.changePass,
    fontWeight: "bold",
    marginLeft: theme.spacing(3),
    color: theme.colors.texting.textLabel
}))

const ContentComponent = styled(Box)(({ theme }) => ({
    height: "80%",
    width: "100%",
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
}))

const BoxPoint = styled(Box)(({ theme }) => ({
    width: "100%",
    height: theme.spacing(8),
    display: "flex",
    flexDirection: "row",
    paddingTop: theme.spacing(3)
}))

const PointText = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.changePass,
    paddingLeft: theme.spacing(5)
}))

const PointContent = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.changePass,
    color: theme.colors.texting.button,
    fontWeight: "bold",
}))

const ContentText = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.changePass,
    paddingLeft: theme.spacing(3),
}))

const CardCommentComponent = styled(Box)(({ theme }) => ({
    height: theme.spacing(120),
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(10),
    borderRadius: theme.spacing(5)
}))

interface CommentProps {
    idPerson: string,
    content: string,
}

interface PostProps {
    idHomework: string,
    idStudent: string,
    comments: CommentProps[],
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


const PostReviewPoint: FunctionComponent = () => {
    const { classId, idPost } = useParams<{ classId: string, idPost: string }>()
    const [postContent, setPostContent] = useState<PostProps>()
    const [isLoading, setLoading] = useState(true)
    const [user, setUser] = useState<UserProps>()
    const dispatch = useAppDispatch()
    const fetchPostData = useCallback(async () => {
        setLoading(true)
        try {
            const resultPost = await getPostById(classId, idPost)
            const postResult = resultPost.data as PostProps
            setPostContent(postResult)

        } catch (err) {
            dispatch(createAlert({
                message: ERROR_MESSAGE,
                severity: "error"
            }))
        } finally {
            setLoading(false)
        }
    }, [classId, dispatch, idPost])

    useEffect(() => {
        fetchPostData()
    }, [classId, idPost, dispatch, fetchPostData])

    useEffect(() => {
        const fetchData = async () => {

            if (postContent && !user) {
                setLoading(true)

                try {
                    const resultUser = await getUserDataById(postContent.idStudent)
                    const userData = resultUser.data as UserProps
                    setUser(userData)
                } catch (err) {
                    dispatch(createAlert({
                        message: ERROR_MESSAGE,
                        severity: "error"
                    }))
                } finally {
                    setLoading(false)
                }
            }
        }

        fetchData()
    }, [postContent, dispatch, user])
    return (
        (isLoading || !user) ? <SpinnerLoading /> : (
            <HorizontalCenterContainer>
                <CardComponent>
                    <CardPost sx={{ boxShadow: 3 }}>
                        <AvatarAndName>
                            <AvatarPersonBox>
                                <AvatarPerson />
                            </AvatarPersonBox>
                            <NamePerson>{user.firstName} {user.lastName}</NamePerson>
                        </AvatarAndName>
                        <ContentComponent>
                            <BoxPoint>
                                <PointContent>Point Review:</PointContent>
                                <PointText>{postContent!.pointReview}</PointText>
                            </BoxPoint>
                            <PointContent>Explain:</PointContent>
                            <ContentText>{postContent!.explain}</ContentText>
                        </ContentComponent>
                    </CardPost>
                    <CardCommentComponent>
                        {
                            postContent!.comments.map((comment, index) => (
                                <Comment key={index} comment={comment} />
                            ))
                        }
                        <CommentInput classId={classId} idPost={idPost} fetchPostData={fetchPostData}/>
                    </CardCommentComponent>

                </CardComponent>
            </HorizontalCenterContainer>
        )
    )
}

export default PostReviewPoint;