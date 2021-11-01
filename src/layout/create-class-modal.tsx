import { Button, Modal, Typography, Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createClassroom } from '../slices/classroom-slice';
import { setModalClose } from '../slices/create-class-modal-sclice';


const StyledBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    padding: theme.spacing(8),
    backgroundColor: theme.colors.background.white,
    zIndex: theme.zIndex.modal,
    borderRadius: 16
}));

const StyledTextFiled = styled(TextField)(({ theme }) => ({
    marginTop: theme.spacing(4),
    width: '100%'
}));

const RightAlignContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "right",
    marginTop: theme.spacing(5)
}));

const initialState = { value: "", error: "This field cannot be empty!" }

const CreateClassroomModal = () => {
    const [classroomNameValidation, setClassroomNameValidation] = useState(initialState)
    const [description, setDescription] = useState("");
    const open = useAppSelector((state) => state.createClassModalReducer.isOpen)
    const dispatch = useAppDispatch()
    const hasError = classroomNameValidation.error.length > 0

    const handleClose = () => {
        setClassroomNameValidation(initialState)
        dispatch(setModalClose())
    }

    const handleSubmit = () => {
        handleClose()
        dispatch(createClassroom({
            name: classroomNameValidation.value,
            ownerId: '617fde33f77e37b3eba7cd12',
            desc: description
        }))
    }

    const handleOnChangeClassroomName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClassroomNameValidation({
            value: event.target.value,
            error: validateClassroomName(event.target.value)
        })
    }

    const validateClassroomName = (value: string) => {
        if (value.length > 0)
            return ""
        return "This field cannot be empty!"
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <StyledBox>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Create your classroom
                </Typography>
                <StyledTextFiled
                    variant="filled"
                    error={hasError}
                    required
                    id="outlined-required"
                    label="Classname"
                    placeholder="Type your classroom's name here"
                    onChange={handleOnChangeClassroomName}
                    helperText={classroomNameValidation.error}
                />
                <StyledTextFiled
                    variant="filled"
                    id="outlined-multiline-static"
                    label="Description"
                    placeholder="Type your classroom's description here"
                    multiline
                    rows={5}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <RightAlignContainer>
                    <Button color="inherit" onClick={handleClose}>Cancel</Button>
                    <Box ml={2}></Box>
                    <Button variant="contained" color="success" disabled={hasError} onClick={handleSubmit}>Create</Button>
                </RightAlignContainer>
            </StyledBox>
        </Modal>
    )

}

export default CreateClassroomModal;