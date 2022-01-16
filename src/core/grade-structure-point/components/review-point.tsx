import { Box, Button, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import React, { FunctionComponent } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { addReviewPoint } from "../../../services/classroom";
import { ERROR_MESSAGE, SEND_REVIEW_POINT_SUCCESS } from "../../../shared/messages";
import { createAlert } from "../../../slices/alert-slice";
import { onlyNumberValidation, useValidator, useValidatorManagement } from "../../../utils/validator";


const CardComponent = styled(Box)(({ theme }) => ({
    height: theme.spacing(120),
    width: theme.spacing(150),
    display: "flex",
    flexDirection: "column",

    alignItems: "center",
    borderRadius: theme.spacing(2.5),
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: theme.colors.background.white
}))

const EmailText = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.sizeLabel,
    color: theme.colors.classcode,
    marginBottom: theme.spacing(3)
}))

const PointReview = styled(TextField)(({ theme }) => ({
    width: "90%",
    marginTop: theme.spacing(5),
}))

const ButtonComponent = styled(Box)(({ theme }) => ({
    width: "100%",
    height: theme.spacing(10),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

}))

const SubmitButton = styled(Button)(({ theme }) => ({
    width: theme.spacing(25),
    height: theme.spacing(10),
    fontWeight: "bold",
    fontSize: theme.fontSizes.changePass,
    borderRadius: theme.spacing(2)
}))

const Description = styled(TextField)(({ theme }) => ({
    width: "90%",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
}))

const ReviewPoint: FunctionComponent<{ classId: string, idStudent: string, idHomework: string, nameHomework: string }> = ({ classId, idStudent, idHomework, nameHomework }) => {
    const validatorFields = useValidatorManagement()
    const point = useValidator("point", onlyNumberValidation, "", validatorFields)
    const handleOnChange = validatorFields.handleOnChange
    const hasError = validatorFields.hasError()
    const dispatch = useAppDispatch()
    const description = useValidator("description", null, "", validatorFields)

    const handleSubmit = async () => {
        try {
            validatorFields.validate()
            if (!validatorFields.hasError()) {
                const payload = validatorFields.getValuesObject()
                dispatch(createAlert({
                    message: SEND_REVIEW_POINT_SUCCESS,
                    severity: "success"
                }))
                await addReviewPoint(classId, { idHomework: idHomework, idStudent: idStudent, pointReview: parseFloat(payload.point), explain: payload.description, title: nameHomework })
            }
        } catch (err) {
            dispatch(createAlert({
                message: ERROR_MESSAGE,
                severity: "error"
            }))
        }
    }

    return (
        <CardComponent sx={{ boxShadow: 3 }}>
            <EmailText>Review Point</EmailText>
            <PointReview
                disabled
                fullWidth
                label="Title Homework"
                value={nameHomework}
            />
            <PointReview
                required
                label="Point you want"
                autoComplete="point"
                error={point.hasError()}
                helperText={point.error}
                onChange={handleOnChange(point)}
                onBlur={() => point.validate()}
            />
            <Description
                label="Explain"
                autoComplete="description"
                multiline
                rows={5}
                onChange={handleOnChange(description)}
            />
            <ButtonComponent>
                <SubmitButton
                    variant="contained"
                    color="success"
                    disabled={hasError}
                    onClick={handleSubmit}
                >
                    Send
                </SubmitButton>
            </ButtonComponent>
        </CardComponent>
    )
}

export default ReviewPoint;