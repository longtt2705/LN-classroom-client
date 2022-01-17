import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import React, { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addCommentByPostId } from '../../services/classroom';
import { Post, sendCommentAction } from '../../services/socket';
import { ERROR_MESSAGE } from '../../shared/messages';
import { createAlert } from '../../slices/alert-slice';
import { notEmptyValidation, useValidator, useValidatorManagement } from '../../utils/validator';
import SpinnerLoading from '../components/spinner-loading';

const CardComponent = styled(Box)(({ theme }) => ({
    width: theme.spacing(180),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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


const InputComment = styled(TextField)(({ theme }) => ({
    width: "100%",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    marginLeft: theme.spacing(5),
    '& fieldset': {
        borderRadius: theme.spacing(5),
    },
}))

const CommentButton = styled(IconButton)(({ theme }) => ({
    marginLeft: theme.spacing(3)
}))

const SendCommentIcon = styled(SendIcon)(({ theme }) => ({
    height: theme.spacing(7),
    width: theme.spacing(7)
}))

const CommentInput: FunctionComponent<{ classId: string, post: Post, fetchPostData: any }> = ({ classId, post, fetchPostData }) => {
    const user = useAppSelector((state) => state.userReducer.user)
    const validatorFields = useValidatorManagement()
    const content = useValidator("content", notEmptyValidation, "", validatorFields)
    const handleOnChange = validatorFields.handleOnChange
    const dispatch = useAppDispatch()
    const [isLoading, setLoading] = useState(false)
    const classrooms = useAppSelector((state) => [...state.classroomReducer.enrolledClassrooms, ...state.classroomReducer.teachingClassrooms])
    const socket = useAppSelector(state => state.socketSlice.socket)

    const filterClassroomByClassId = () => {
        return classrooms.find((classroom) => classroom._id === classId)!
    }

    const handleSubmit = async () => {
        try {
            validatorFields.validate()
            if (!validatorFields.hasError()) {
                const payload = validatorFields.getValuesObject()
                setLoading(true)
                await addCommentByPostId(classId, { idPost: post._id!, idPerson: user!._id!, content: payload.content })
                const classroom = filterClassroomByClassId()
                let receivers = classroom?.teachers?.map((teacher) => teacher._id!) || []
                receivers.push(post.idStudent!)
                receivers = receivers.filter(id => id !== user!._id!)

                sendCommentAction(socket!, {
                    user: user!,
                    post,
                    classroom
                }, receivers)
                await fetchPostData()
            }
        } catch (err) {
            dispatch(createAlert({
                message: ERROR_MESSAGE,
                severity: "error"
            }))
        } finally {
            setLoading(false)
        }
    }

    return (
        <CardComponent>
            <AvatarPersonBox>
                <AvartarPerson />
            </AvatarPersonBox>
            <InputComment
                onChange={handleOnChange(content)}
            />
            {
                isLoading ? <SpinnerLoading /> :
                    (<CommentButton onClick={handleSubmit}>
                        <SendCommentIcon />
                    </CommentButton>)
            }
        </CardComponent>
    )
}

export default CommentInput;