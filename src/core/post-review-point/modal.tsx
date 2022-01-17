import { Box, Button, Card, Modal, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { finalizedPoint, updateStudentPoint } from "../../services/classroom";
import { Post, sendFinalizeReviewAction } from "../../services/socket";
import { createAlert } from "../../slices/alert-slice";
import { pointValidation, useValidator } from "../../utils/validator";
import SpinnerLoading from "../components/spinner-loading";


const MarkPointCard = styled(Card)(({ theme }) => ({
    width: "30%",
    height: 300,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: theme.spacing(3.75),
    padding: theme.spacing(6),
    paddingBottom: 0
}))


const RightAlignContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "right",
    marginTop: theme.spacing(5)
}));

interface ModalProps {
    isOpen: boolean,
    onClose: any,
    homeworkId: string,
    studentId: string,
    classId: string,
    post: Post,
    refetchPost: any
}

const StudentIdText = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.default,
    fontWeight: "bold",
}))

const PostModal: FunctionComponent<ModalProps> = ({ isOpen, onClose, homeworkId, studentId, classId, post, refetchPost }) => {
    const point = useValidator("point", pointValidation, "")
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch()
    const classrooms = useAppSelector((state) => [...state.classroomReducer.enrolledClassrooms, ...state.classroomReducer.teachingClassrooms])
    const socket = useAppSelector(state => state.socketSlice.socket)
    const user = useAppSelector(state => state.userReducer.user)

    const filterClassroomByClassId = () => {
        return classrooms.find((classroom) => classroom._id === classId)!
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        point.handleOnChange(event.target.value)
    }

    const handleSubmit = async () => {
        point.validate()
        if (!point.hasError()) {
            try {
                setIsLoading(true)
                await updateStudentPoint(classId, homeworkId, { point: parseFloat(point.value), studentId })
                await finalizedPoint(classId, post._id!, parseFloat(point.value))
                const classroom = filterClassroomByClassId()

                sendFinalizeReviewAction(socket!, {
                    user: user!,
                    classroom,
                    post
                }, [post.idStudent!])
                await refetchPost()

                dispatch(createAlert({
                    message: "Update student point successfully!",
                    severity: 'success'
                }))
            } catch (err) {
                dispatch(createAlert({
                    message: "Update student point failed!",
                    severity: 'error'
                }))
            } finally {
                setIsLoading(false)
                onClose()
            }
        }
    }

    return (
        <Modal
            open={isOpen}
            onClose={() => onClose()}
        >
            <MarkPointCard>
                <StudentIdText>
                    Student Id: {studentId}
                </StudentIdText>
                <TextField
                    margin="normal"
                    label="Point"
                    fullWidth
                    autoComplete="email"
                    error={point.hasError()}
                    helperText={point.error}
                    onChange={handleOnChange}
                    onBlur={() => point.validate()
                    }
                />
                <RightAlignContainer>
                    {
                        isLoading ? <SpinnerLoading /> : <Button variant="contained" color="success" disabled={point.hasError() || point.value.length === 0} onClick={handleSubmit}>Save</Button>
                    }

                    <Box ml={2}></Box>
                    <Button color="error" onClick={() => onClose()}>Cancel</Button>
                </RightAlignContainer>
            </MarkPointCard>

        </Modal>
    )
}

export default PostModal;