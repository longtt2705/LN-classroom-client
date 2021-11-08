import { Button, Modal, Typography, Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Classroom, createClassroom } from '../../slices/classroom-slice';
import { setModalClose } from '../../slices/create-class-modal-sclice';


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


const initialState = {
    "classname": {
        value: "", error: "This field cannot be empty!"
    },
    "schoolYear": {
        value: "", error: "This field cannot be empty!"
    },
    "description": {
        value: "", error: ""
    },
}

const CreateClassroomModal = () => {
    const [inputFields, setInputFields] = useState(initialState)
    const open = useAppSelector((state) => state.createClassModalReducer.isOpen)
    const dispatch = useAppDispatch()

    const hasError = (() => {
        for (const [_, inputField] of Object.entries(inputFields)) {
            if (inputField.error.length > 0) {
                return true
            }
        }
        return false
    })()

    const handleClose = () => {
        setInputFields(initialState)
        dispatch(setModalClose())
    }

    const handleSubmit = () => {
        handleClose()
        dispatch(createClassroom({
            name: inputFields.classname.value,
            schoolYear: inputFields.schoolYear.value,
            ownerId: '617fde33f77e37b3eba7cd12',
            description: inputFields.description.value
        }))
    }

    const handleOnChange = (inputFieldName: string, isNotEmpty: boolean = true) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputFields({
                ...inputFields,
                [inputFieldName]: {
                    value: event.target.value,
                    error: isNotEmpty ? validateNotEmpty(event.target.value) : ""
                }
            })
        }

    const validateNotEmpty = (value: string) => {
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
                    error={inputFields.classname.error.length > 0}
                    required
                    id="outlined-required"
                    label="Class name"
                    placeholder="Type your classroom's name here"
                    onChange={handleOnChange("classname")}
                    helperText={inputFields.classname.error}
                />
                <StyledTextFiled
                    variant="filled"
                    error={inputFields.schoolYear.error.length > 0}
                    required
                    id="outlined-required"
                    label="School Year"
                    placeholder="Type your school year's section here"
                    onChange={handleOnChange("schoolYear")}
                    helperText={inputFields.schoolYear.error}
                />
                <StyledTextFiled
                    variant="filled"
                    id="outlined-multiline-static"
                    label="Description"
                    placeholder="Type your classroom's description here"
                    multiline
                    rows={5}
                    onChange={handleOnChange("description", false)}
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