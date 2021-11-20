import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography, ListItemButton, IconButton, Checkbox, Button, Card } from "@mui/material";
import { styled } from '@mui/material/styles';
import { FunctionComponent, useState } from 'react';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const HorizontalCenterContainer = styled(Box)(({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
}));

const RowLabel = styled(Typography)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing(2)
}))

const RowLabelItem = styled(Typography)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
}))

const MemberAndInvite = styled(Typography)(({ theme }) => ({
    width: theme.spacing(50),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing(-5)
}))

const NumberMember = styled(Typography)(({ theme }) => ({
    width: theme.spacing(40),
    color: theme.colors.texting.textLabel,
    fontSize: theme.fontSizes.changePass,
    fontWeight: "bold",
    marginLeft: theme.spacing(10)
}))

const TeacherInvite = styled(Typography)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing(-5)
}))

const InviteIcon = styled(PersonAddAltIcon)(({ theme }) => ({
    color: theme.colors.texting.textLabel,
    fontSize: theme.fontSizes.sizeLabel,
}))

const CheckboxAction = styled(Typography)(({ theme }) => ({
    width: theme.spacing(50),
    display: "flex",
    flexDirection: "row"
}))

const ActionCard = styled(Card)(({ theme }) => ({
    width: theme.spacing(40),
    position: "absolute",
    marginLeft: theme.spacing(11),
    marginTop: theme.spacing(12),
    zIndex: theme.fontSizes.default
}))

const SortCard = styled(Card)(({ theme }) => ({
    width: theme.spacing(40),
    position: "absolute",
    right: "10%",
    marginTop: theme.spacing(10),
    zIndex: theme.fontSizes.default,
}))

const ActionSortList = styled(List)(({ theme }) => ({
    width: theme.spacing(60),
}))

const ActionSortListItem = styled(ListItem)(({ theme }) => ({
    width: "100%",
    height: theme.spacing(8),
    fontSize: theme.fontSizes.default,
    color: theme.colors.background.primary,
}))

const ActionSortListItemButton = styled(ListItemButton)(({ theme }) => ({
    width: "100%",
    height: theme.spacing(8)
}))

const People: FunctionComponent = () => {
    const [isActionClick, setIsActionClick] = useState(false)
    const [isSortClick, setIsSortClick] = useState(false)
    const data = [
        {
            name: "1",
            role: "teacher"
        },
        {
            name: "2",
            role: "teacher"
        },
        {
            name: "3",
            role: "student"
        },
        {
            name: "4",
            role: "student"
        },
        {
            name: "5",
            role: "student"
        },
        {
            name: "6",
            role: "student"
        },
        {
            name: "7",
            role: "student"
        },
    ]
    const teachers = data.filter((e) => e.role === "teacher")
    const students = data.filter((e) => e.role === "student")

    const handleActionClick = () => {
        setIsActionClick(!isActionClick)
    }

    const handleSortClick = () => {
        setIsSortClick(!isSortClick)
    }
    return (
        <>
            <HorizontalCenterContainer>
                <Grid item xs={7} sx={{ width: "100%" }}>
                    <RowLabel>
                        <Typography sx={{ mt: 4, mb: 0 }} variant="h4" component="div" color="#085c9a">
                            Teacher
                        </Typography>
                        <TeacherInvite>
                            <InviteIcon />
                        </TeacherInvite>
                    </RowLabel>
                    <Divider color="#085c9a" />
                    <List>
                        {teachers.map((teacher) => (
                            <ListItemButton>
                                <RowLabelItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PersonIcon
                                                    color="primary"
                                                    fontSize="large"
                                                />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={teacher.name}
                                            secondary={null}
                                        />
                                    </ListItem>
                                    <IconButton>
                                        <MoreVertIcon />
                                    </IconButton>
                                </RowLabelItem>
                            </ListItemButton>
                        ))}
                    </List>
                </Grid>
            </HorizontalCenterContainer>
            <HorizontalCenterContainer>
                <Grid item xs={7} sx={{ width: "100%" }}>
                    <RowLabel>
                        <Typography sx={{ mt: 4, mb: 0 }} variant="h4" component="div" color="#085c9a">
                            Student
                        </Typography>
                        <MemberAndInvite>
                            <NumberMember>
                                {students.length} students
                            </NumberMember>
                            <InviteIcon />
                        </MemberAndInvite>
                    </RowLabel>
                    <Divider color="#085c9a" />
                    <RowLabel>
                        <CheckboxAction>
                            <Checkbox />
                            <Button
                                variant={isActionClick ? "contained" : "outlined"}
                                onClick={handleActionClick}
                            >
                                Action<ArrowDropDownIcon />
                            </Button>
                            {
                                isActionClick ?
                                    (
                                        <ActionCard>
                                            <ActionSortList>
                                                <ActionSortListItem disablePadding>
                                                    <ActionSortListItemButton>
                                                        <ListItemText primary="Send mail" />
                                                    </ActionSortListItemButton>
                                                </ActionSortListItem>
                                                <ActionSortListItem disablePadding>
                                                    <ActionSortListItemButton>
                                                        <ListItemText primary="Delete" />
                                                    </ActionSortListItemButton>
                                                </ActionSortListItem>
                                                <ActionSortListItem disablePadding>
                                                    <ActionSortListItemButton>
                                                        <ListItemText primary="Hide" />
                                                    </ActionSortListItemButton>
                                                </ActionSortListItem>
                                            </ActionSortList>
                                        </ActionCard>
                                    ) :
                                    (
                                        <></>
                                    )
                            }
                        </CheckboxAction>
                        <IconButton
                            onClick={handleSortClick}
                        >
                            <SortByAlphaIcon />
                        </IconButton>
                        {
                            isSortClick ?
                                (
                                    <SortCard>
                                        <ActionSortList>
                                            <ActionSortListItem disablePadding>
                                                <ActionSortListItemButton>
                                                    <ListItemText primary="Send mail" />
                                                </ActionSortListItemButton>
                                            </ActionSortListItem>
                                            <ActionSortListItem disablePadding>
                                                <ActionSortListItemButton>
                                                    <ListItemText primary="Delete" />
                                                </ActionSortListItemButton>
                                            </ActionSortListItem>
                                            <ActionSortListItem disablePadding>
                                                <ActionSortListItemButton>
                                                    <ListItemText primary="Hide" />
                                                </ActionSortListItemButton>
                                            </ActionSortListItem>
                                        </ActionSortList>
                                    </SortCard>
                                ) :
                                (
                                    <></>
                                )
                        }

                    </RowLabel>
                    <List>
                        {students.map((student) => (
                            <ListItemButton>
                                <RowLabelItem>
                                    <Checkbox />
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PersonIcon
                                                    color="action"
                                                    fontSize="large"
                                                />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={student.name}
                                            secondary={null}
                                        />
                                    </ListItem>
                                    <IconButton>
                                        <MoreVertIcon />
                                    </IconButton>
                                </RowLabelItem>
                            </ListItemButton>
                        ))}

                    </List>
                </Grid>
            </HorizontalCenterContainer>
        </>
    );
}

export default People;