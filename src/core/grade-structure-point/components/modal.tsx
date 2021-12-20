import { Box, Button, Card, Modal, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FunctionComponent } from "react";
import { pointValidation, useValidator } from "../../../utils/validator";

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
    homework:any,
    student:any,
    classId:string,
}

const StudentIdText = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.default,
    fontWeight: "bold",
}))

const PointModal: FunctionComponent<ModalProps> = ({ isOpen, onClose,homework,student,classId }) => {
    const point = useValidator("point", pointValidation, "")

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        point.handleOnChange(event.target.value)
    }

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
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
                    <Button variant="contained" color="success" disabled={point.hasError() || point.value.length === 0}>Save</Button>
                    <Box ml={2}></Box>
                    <Button color="error" onClick={onClose}>Cancel</Button>
                </RightAlignContainer>
            </MarkPointCard>

        </Modal>
    )
}

export default PointModal;