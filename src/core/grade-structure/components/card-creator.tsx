import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import { FunctionComponent, useState } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { GradeStructureDetail } from '../../../slices/classroom-slice';
import { notEmptyValidation, onlyNumberValidation, useValidator, useValidatorManagement } from '../../../utils/validator';

interface CardCreatorProps {
    draggableProvided: DraggableProvided,
    item: GradeStructureDetail,
    classId: string,
    handleDelete: (classId: string, gradeStructureId: string) => void,
    handleEditGrade: (classId: string, gradeStructureId: string, title: string, description: string, point: number) => void
}

const CardCreatorComponent = styled(Box)(({ theme }) => ({
    width: "60%",
    height: theme.spacing(65),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    borderRadius: theme.spacing(5),
}))

const BoxInput = styled(Box)(({ theme }) => ({
    width: "80%",
    height: "100%",
    display: 'flex',
    flexDirection: "column",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0),
    borderRadius: theme.spacing(2.75)
}))

const InputGrade = styled(TextField)(({ theme }) => ({
    width: "90%",
    height: theme.spacing(10),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    marginLeft: theme.spacing(4),
}))

const BoxButton = styled(Box)(({
    width: "7%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
}))

const EditButton = styled(Button)(({ theme }) => ({
    width: "100%",
    height: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.spacing(2.75)
}))

const SaveButton = styled(Button)(({ theme }) => ({
    width: "100%",
    height: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.spacing(2.75)
}))

const RemoveButton = styled(Button)(({ theme }) => ({
    width: "100%",
    height: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.spacing(2.75)
}))

const CardCreator: FunctionComponent<CardCreatorProps> = ({ draggableProvided, item, classId, handleDelete, handleEditGrade }) => {
    const [isEdit, setIsEdit] = useState(false);

    const validatorFields = useValidatorManagement()

    const title = useValidator("title", notEmptyValidation, item.title, validatorFields)
    const description = useValidator("description", null, item.description, validatorFields)
    const point = useValidator("point", onlyNumberValidation, item.point.toString(), validatorFields)

    const handleOnChange = validatorFields.handleOnChange

    const handleSave = () => {
        setIsEdit(false)
        validatorFields.validate()
        if (!validatorFields.hasError()) {
            const payload = validatorFields.getValuesObject()
            handleEditGrade(classId, item._id!, payload.title, payload.description, parseInt(payload.point))
        }
    }

    const handleEdit = () => {
        setIsEdit(true)
    }

    return (
        <CardCreatorComponent
            ref={draggableProvided.innerRef}
            {...draggableProvided.draggableProps}
            {...draggableProvided.dragHandleProps}
            sx={{ boxShadow: 6 }}
        >
            {/* note: `snapshot.isDragging` is useful to style or modify behaviour of dragged cells */}
            <BoxInput>
                <InputGrade
                    disabled={!isEdit}
                    id="gradeTitle"
                    label="Grade Title"
                    defaultValue={item.title}
                    variant={(item.title.length !== 0) ? "filled" : "outlined"}
                    helperText={title.error}
                    onChange={handleOnChange(title)}
                    onBlur={() => title.validate()}
                />
                <InputGrade
                    disabled={!isEdit}
                    id="gradeDes"
                    label="Grade Description"
                    defaultValue={item.description}
                    variant={(item.title.length !== 0) ? "filled" : "outlined"}
                    oncChange={handleOnChange(description)}
                />
                <InputGrade
                    disabled={!isEdit}
                    id="gradePoint"
                    label="Grade Point"
                    defaultValue={item.point}
                    variant={(item.title.length !== 0) ? "filled" : "outlined"}
                    helperText={point.error}
                    onChange={handleOnChange(point)}
                    onBlur={() => point.validate()}
                />
            </BoxInput>
            <BoxButton>
                {
                    <>
                        {
                            (isEdit) ?
                                (
                                    <SaveButton
                                        variant="contained"
                                        color="success"
                                        onClick={handleSave}
                                    >
                                        <SaveIcon />
                                    </SaveButton>
                                ) :
                                (
                                    <EditButton
                                        variant="contained"
                                        color="primary"
                                        onClick={handleEdit}
                                    >
                                        <CreateIcon />
                                    </EditButton>
                                )
                        }
                        <RemoveButton
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(classId, item._id!)}
                        >
                            <DeleteIcon />
                        </RemoveButton>
                    </>
                }

            </BoxButton>
        </CardCreatorComponent>
    );
}

export default CardCreator;