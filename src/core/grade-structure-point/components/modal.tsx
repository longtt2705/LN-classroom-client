import { Box, Button, Card, Modal, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FunctionComponent, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { updateStudentPoint } from "../../../services/classroom";
import { createAlert } from "../../../slices/alert-slice";
import { pointValidation, useValidator } from "../../../utils/validator";
import SpinnerLoading from "../../components/spinner-loading";

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


const GradeTitleText = styled(Typography)(({ theme }) => ({
    color: theme.colors.texting.sideBarLabel,
    fontSize: theme.fontSizes.changePass,
    marginBottom: theme.spacing(5),
    fontWeight: "bold",
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
    homework: any,
    student: any,
    classId: string,
    fetchStudents: any
}

const StudentIdText = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.default,
    fontWeight: "bold",
}))

const PointModal: FunctionComponent<ModalProps> = ({ isOpen, onClose, homework, student, classId, fetchStudents }) => {
    const point = useValidator("point", pointValidation, "")
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch()
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        point.handleOnChange(event.target.value)
    }

    const handleSubmit = async () => {
        point.validate()
        if (!point.hasError()) {
            try {
                setIsLoading(true)
                await updateStudentPoint(classId, homework._id!, { point: parseFloat(point.value), studentId: student.studentId })
                fetchStudents()
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
                onClose(student.studentId)
            }
        }
    }

    return (
        <Modal
            open={isOpen}
            onClose={() => onClose(student.studentId)}
        >
            <MarkPointCard>
                <GradeTitleText>
                    {homework.title}
                </GradeTitleText>
                <StudentIdText>
                    Student Id: {student.studentId}
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
                    <Button color="error" onClick={() => onClose(student.studentId)}>Cancel</Button>
                </RightAlignContainer>
            </MarkPointCard>

        </Modal>
    )
}

export default PointModal;