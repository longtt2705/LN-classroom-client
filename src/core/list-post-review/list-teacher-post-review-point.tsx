import { Box, ListItemButton, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import React, { FunctionComponent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { getPostByClassId } from "../../services/classroom";
import { createAlert } from "../../slices/alert-slice";
import SpinnerLoading from "../components/spinner-loading";
import TeacherPost from "./teacher-post-review-point";

const HorizontalCenterContainer = styled(Box)(({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
}));

const CardComponent = styled(Box)(({ theme }) => ({
    width: theme.spacing(200),
    display: "flex",
    flexDirection: "column",
    paddingLeft: theme.spacing(5),
    paddingBottom: theme.spacing(3),
    borderRadius: theme.spacing(3)
}))

const PostReviewBox = styled(Box)(({ theme }) => ({
    width: "100%",
    height: theme.spacing(10),
    paddingLeft: theme.spacing(3),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
}))

const PostReviewText = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.codeclass,
    fontWeight: "bold",
    color: theme.colors.texting.button
}))

interface CommentProps {
    idPerson: string,
    content: string,
}

interface PostProps {
    _id: string,
    idHomework: string,
    idStudent: string,
    comments: CommentProps[],
    pointReview: number,
    explain: string,
    title: string,
}

const ListTeacherPostReviewPoint: FunctionComponent<{ classId: string }> = ({ classId }) => {
    const [posts, setPosts] = useState<Array<PostProps>>([])
    const history = useHistory()
    const dispatch = useAppDispatch()
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const result = await getPostByClassId(classId)
                const postResult = result.data as Array<PostProps>
                setPosts(postResult)
            } catch {
                setPosts([])
                dispatch(createAlert({
                    message: 'Error when trying to fetch list post review!',
                    severity: 'error'
                }))
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [classId,dispatch])

    const handleClick = (idPost: string) => {
        history.push(`/classrooms/${classId}/posts/${idPost}`)
    }
    return (
        isLoading?<SpinnerLoading /> :
        <HorizontalCenterContainer>
            <CardComponent sx={{ boxShadow: 3 }}>
                <PostReviewBox>
                    <PostReviewText>
                        List of Student Point Review:
                    </PostReviewText>
                </PostReviewBox>
                {
                    posts.map((post, index) => (
                        <ListItemButton key={index} onClick={() => handleClick(post._id)}>
                            <TeacherPost post={post} />
                        </ListItemButton>
                    ))
                }
            </CardComponent>
        </HorizontalCenterContainer>
    )
}

export default ListTeacherPostReviewPoint;