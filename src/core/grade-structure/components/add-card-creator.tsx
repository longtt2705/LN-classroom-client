import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Button, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import { FunctionComponent } from "react";
import { notEmptyValidation, onlyNumberValidation, useValidator, useValidatorManagement } from "../../../utils/validator";

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

const AddButton = styled(Button)(({ theme }) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.spacing(2.75)
}))

interface AddCardCreatorProps {
    handleAdd: (title: string, description: string, point: number) => void
}

const AddCardCreator: FunctionComponent<AddCardCreatorProps> = ({ handleAdd }) => {

    const validatorFields = useValidatorManagement()

    const title = useValidator("title", notEmptyValidation, "", validatorFields)
    const description = useValidator("description", null, "", validatorFields)
    const point = useValidator("point", onlyNumberValidation, "", validatorFields)

    const handleOnChange = validatorFields.handleOnChange

    const handleAddCard = () => {
        validatorFields.validate()
        if (!validatorFields.hasError()) {
            const payload = validatorFields.getValuesObject()
            handleAdd(payload.title, payload.description, parseFloat(payload.point))
        }

    }

    return (
        <CardCreatorComponent
            sx={{ boxShadow: 6 }}
        >
            {/* note: `snapshot.isDragging` is useful to style or modify behaviour of dragged cells */}
            <BoxInput>
                <InputGrade
                    id="gradeTitle"
                    label="Grade Title"
                    variant="outlined"
                    error={title.hasError()}
                    helperText={title.error}
                    onChange={handleOnChange(title)}
                    onBlur={() => title.validate()}
                />
                <InputGrade
                    id="gradeDes"
                    label="Grade Description"
                    variant="outlined"
                    onChange={handleOnChange(description)}
                />
                <InputGrade
                    id="gradePoint"
                    label="Grade Point"
                    variant="outlined"
                    error={point.hasError()}
                    helperText={point.error}
                    onChange={handleOnChange(point)}
                    onBlur={() => point.validate()}

                />
            </BoxInput>
            <BoxButton>
                <AddButton
                    variant="contained"
                    color="success"
                    onClick={handleAddCard}
                >
                    <AddCircleOutlineIcon />
                </AddButton>
            </BoxButton>
        </CardCreatorComponent>
    );
}

export default AddCardCreator;