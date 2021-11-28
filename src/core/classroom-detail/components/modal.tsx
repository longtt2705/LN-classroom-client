import { Button, Card, Divider, IconButton, Modal, TextField, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FunctionComponent, useEffect, useState } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { getInviteLink, sendInviteLink } from "../../../services/classroom";
import { Classroom } from "../../../slices/classroom-slice";
import { copyToClipboard } from "../../../utils/function";
import { useAppDispatch } from "../../../app/hooks";
import { createAlert } from "../../../slices/alert-slice";
import { emailValidation, useValidator } from "../../../utils/validator";
import { ERROR_MESSAGE } from "../../../shared/messages";

const ModalInvite = styled(Card)(({ theme }) => ({
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


const InviteText = styled(Typography)(({ theme }) => ({
    color: theme.colors.texting.sideBarLabel,
    fontSize: theme.fontSizes.changePass,
    marginBottom: theme.spacing(5),
    fontWeight: "bold",

}))

const LinkText = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.default,
    fontWeight: "bold",
}))

const LinkUrlRow = styled(Typography)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: theme.spacing(10),
}))

const LinkUrl = styled(Typography)(({ theme }) => ({
    border: "none",
    overflow: "hidden",
    width: "100%",
    hegiht: "100%",
    color: theme.colors.texting.sideBarLabel,
    fontSize: theme.fontSizes.default,
    marginLeft: theme.spacing(5)
}))

const CoppyLinkIcon = styled(ContentCopyIcon)(({ theme }) => ({
    hegiht: "100%",
}))

const Line = styled(Divider)(({ theme }) => ({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.colors.texting.sideBarLabel
}))

const RightAlignContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "right",
    marginTop: theme.spacing(5)
}));


interface ModalProps {
    classroom: Classroom,
    isOpen: boolean,
    onClose: any,
    isStudent: boolean
}


const InviteModal: FunctionComponent<ModalProps> = ({ classroom, isOpen, onClose, isStudent }) => {
    const [inviteLink, setInviteLink] = useState('')
    const email = useValidator("email", emailValidation, "")
    const dispatch = useAppDispatch()
    useEffect(() => {
        const getLink = async () => {
            const link = (await getInviteLink(classroom._id, isStudent)).data
            setInviteLink(link)
        }
        getLink()
    }, [classroom._id, isStudent])

    const handleOnCopy = async () => {
        await copyToClipboard(inviteLink)
        dispatch(createAlert({
            message: 'Copy invite link successfully!',
            severity: 'success'
        }))
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        email.handleOnChange(event.target.value)
    }

    const handleSubmit = async () => {
        email.validate()
        if (!email.hasError()) {
            try {
                const payload = {
                    classId: classroom._id || "",
                    isStudent,
                    classroomName: classroom.name,
                    email: email.value
                }
                await sendInviteLink(payload)
                dispatch(createAlert({
                    message: 'Sent invitation successfully!',
                    severity: 'success'
                }))
            } catch (err) {
                dispatch(createAlert({
                    message: ERROR_MESSAGE,
                    severity: 'error'
                }))
            }

        }
    }

    return (<Modal
        open={isOpen}
        onClose={onClose}
    >
        <ModalInvite>
            <InviteText>
                Invite {isStudent ? 'Student' : 'Teacher'}
            </InviteText>
            <LinkText>
                Link invite
            </LinkText>
            <LinkUrlRow>
                <LinkUrl>{inviteLink}</LinkUrl>
                <IconButton onClick={handleOnCopy}>
                    <CoppyLinkIcon
                        color="success"
                    />
                </IconButton>
            </LinkUrlRow>
            <Line />
            <TextField
                margin="normal"
                label="Email"
                fullWidth
                autoComplete="email"
                error={email.hasError()}
                helperText={email.error}
                onChange={handleOnChange}
                onBlur={() => email.validate()}
            />
            <RightAlignContainer>
                <Button variant="contained" color="success" disabled={email.hasError() || email.value.length === 0} onClick={handleSubmit}>Send invitation</Button>
                <Box ml={2}></Box>
                <Button color="error" onClick={onClose}>Cancel</Button>
            </RightAlignContainer>
        </ModalInvite>
    </Modal>);
}

export default InviteModal;