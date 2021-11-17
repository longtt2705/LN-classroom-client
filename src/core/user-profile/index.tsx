import { Box, TextField, Link, Input, FormControl, InputLabel, InputAdornment, IconButton, Typography, Button, Grid, Avatar } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FunctionComponent, MouseEvent, useState } from "react"
import { styled } from '@mui/material/styles';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const HorizontalCenterContainer = styled(Box)(({
    width: "60%",
    margin: "0 auto"
}));

const ColumnBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    marginBottom: theme.spacing(5)
}));

const RowBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: theme.spacing(5)
}));

const ChangePass = styled(Link)(({ theme }) => ({
    fontSize: theme.fontSizes.changePass,
    marginLeft: theme.spacing(3),
}))

const FormChangePass = styled(FormControl)(({ theme }) => ({
    width: "90%",
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(3)
}))

const InputLabelPass = styled(InputLabel)(({ theme }) => ({
    marginLeft: theme.spacing(-3),
    fontSize: theme.fontSizes.changePass
}))

const Label = styled(Typography)(({ theme }) => ({
    color: theme.colors.texting.textLabel,
    fontSize: theme.fontSizes.sizeLabel,
}))

const ButtonChangePass = styled(Button)(({ theme }) => ({
    width: theme.spacing(25),
    height: theme.spacing(10),
    margin: `${theme.spacing(5)} ${theme.spacing(10)}`
}))

const GridButton = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
}))

const AvatarProfile = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(50),
    height: theme.spacing(50),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
}))

const IconAvatar = styled(PermIdentityIcon)(({ theme }) => ({
    width: "100%",
    height: "100%"
}))

const ChangeAvatarButton = styled(Button)(({ theme }) => ({
    width: "30%",
    height: theme.spacing(7),
    marginBottom: theme.spacing(5),
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: theme.spacing(5)
}))

const ChangeProfile: FunctionComponent = () => {
    const [changePass, setChangePass] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const oldPassword = "oldpassword"
    const newPassword = "newpassword"
    const confPassword = "confirmpass"

    const handleChangePassButton = () => {
        setChangePass(!changePass)
    }

    const handleShowPass = () => {
        setShowPass(!showPass)
    }

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
    };

    return (
        <HorizontalCenterContainer>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: "100%" }, }}
                noValidate
                autoComplete="off"
            >
                <ColumnBox>
                    <AvatarProfile>
                        <IconAvatar></IconAvatar>
                    </AvatarProfile>
                    <ChangeAvatarButton variant="outlined">Change Avatar</ChangeAvatarButton>
                    <RowBox>
                        <TextField
                            id="outlined-disabled"
                            label="Firstname"
                            defaultValue="Tran"
                            InputLabelProps={{ style: { fontSize: 18, fontWeight: 550 } }}
                        />
                        <TextField
                            id="outlined-disabled"
                            label="Lastname"
                            defaultValue="Nang"
                            InputLabelProps={{ style: { fontSize: 18, fontWeight: 550 } }}
                        />
                    </RowBox>
                    <RowBox>
                        <TextField
                            disabled
                            id="outlined-read-only-input"
                            label="Email"
                            defaultValue="abc@gmail.com"
                            InputLabelProps={{ style: { fontSize: 18, fontWeight: 550 } }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </RowBox>
                    <RowBox>
                        <TextField
                            disabled
                            id="realonly"
                            label="Username"
                            defaultValue="abcxyz"
                            InputLabelProps={{ style: { fontSize: 18, fontWeight: 550 } }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </RowBox>
                    <TextField
                        disabled
                        id="outlined-read-only-input"
                        label="Student Id"
                        defaultValue="18120475"
                        InputLabelProps={{ style: { fontSize: 18, fontWeight: 550 } }}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    {!changePass ? (
                        <ChangePass
                            href="#"
                            underline="always"
                            onClick={handleChangePassButton}
                        >
                            {'Change Password?'}
                        </ChangePass>
                    ) :
                        (
                            <FormChangePass>
                                <Label>Change Password</Label>
                                <FormChangePass>
                                    <InputLabelPass htmlFor="standard-adornment-password">Old Password</InputLabelPass>
                                    <Input
                                        id="standard-adornment-password"
                                        type={showPass ? 'text' : 'password'}
                                        value={oldPassword}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleShowPass}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPass ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormChangePass>
                                <FormChangePass>
                                    <InputLabelPass htmlFor="standard-adornment-password">New Password</InputLabelPass>
                                    <Input
                                        id="standard-adornment-password"
                                        type={showPass ? 'text' : 'password'}
                                        value={newPassword}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleShowPass}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPass ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormChangePass>
                                <FormChangePass>
                                    <InputLabelPass htmlFor="standard-adornment-password">Comfirm Password</InputLabelPass>
                                    <Input
                                        id="standard-adornment-password"
                                        type={showPass ? 'text' : 'password'}
                                        value={confPassword}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleShowPass}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPass ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormChangePass>
                                <GridButton>
                                    <ButtonChangePass
                                        variant="contained"
                                        color="success"
                                    >
                                        Save
                                    </ButtonChangePass>
                                    <ButtonChangePass
                                        variant="contained"
                                        color="error"
                                        onClick={handleChangePassButton}
                                    >
                                        Cancel
                                    </ButtonChangePass>
                                </GridButton>
                            </FormChangePass>
                        )
                    }
                </ColumnBox>

            </Box>
        </HorizontalCenterContainer>

    );
}

export default ChangeProfile;