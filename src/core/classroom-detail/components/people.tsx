import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import { Avatar, Box, Button, Card, Checkbox, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { FunctionComponent, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { removeFromClassroom } from '../../../services/classroom';
import { Classroom, getClassroom, Role } from '../../../slices/classroom-slice';
import InviteModal from './modal';

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

const MoreCard = styled(Card)(({ theme }) => ({
    width: theme.spacing(50),
    position: "absolute",
    right: "-23%",
    marginTop: theme.spacing(26),
    zIndex: theme.fontSizes.default
}))

const MoreCardTeacher = styled(Card)(({ theme }) => ({
    width: theme.spacing(40),
    position: "absolute",
    right: "-18%",
    marginTop: theme.spacing(34),
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


const People: FunctionComponent<{ classroom: Classroom, role: Role }> = ({ classroom, role }) => {
    const [isActionClick, setIsActionClick] = useState(false)
    const [isSortClick, setIsSortClick] = useState(false)
    const [isMoreClickStudent, setIsMoreClickStudent] = useState(-1)
    const [isMoreClickTeacher, setIsMoreClickTeacher] = useState(-1)
    const [isOpenModalTeacher, setIsOpenModalTeacher] = useState(false);
    const [isOpenModalStudent, setIsOpenModalStudent] = useState(false);
    const [isCheckAllStudent, setIsCheckAllStudent] = useState(false)
    const [checkedStudents, setCheckedStudents] = useState<number[]>([])

    const handleOpenModalTeacher = () => setIsOpenModalTeacher(true);
    const handleCloseModalTeacher = () => setIsOpenModalTeacher(false);

    const handleOpenModalStudent = () => setIsOpenModalStudent(true);
    const handleCloseModalStudent = () => setIsOpenModalStudent(false);

    const handleCheckAllStudent = () => {
        if (!isCheckAllStudent) {
            setIsCheckAllStudent(true)
            const listStudent = []
            for (let i = 0; i < classroom.students!.length; i++) {
                listStudent.push(i)
            }
            setCheckedStudents(listStudent)

        } else {
            setIsCheckAllStudent(false)
            setCheckedStudents([])
        }

    }

    const handleCheckStudent = (index: number) => {
        const checkStudents = [...checkedStudents]
        if (checkStudents.includes(index)) {
            const value = index
            const newCheckStudents = checkStudents.filter(checkStudent => checkStudent !== value)
            setCheckedStudents(newCheckStudents)
            setIsCheckAllStudent(false)
        } else {
            const newCheckStudents = [...checkStudents, index]
            setCheckedStudents(newCheckStudents)
            if (newCheckStudents.length === classroom.students!.length) {
                setIsCheckAllStudent(true)
            }
        }
    }
    const user = useAppSelector((state => state.userReducer.user))


    const dispatch = useAppDispatch()

    const removeUser = async (userId: string | undefined, isStudent: boolean) => {
        try {

            await removeFromClassroom(classroom._id || "", userId || "", isStudent)
            dispatch(getClassroom(classroom._id))
        } catch (err) {
            // ignore
            // console.log(err)
        }
    }


    const handleActionClick = () => {
        setIsActionClick(!isActionClick)
    }

    const handleSortClick = () => {
        setIsSortClick(!isSortClick)
    }

    const handleMoreClickStudent = (index: number) => {
        setIsMoreClickStudent(index)
    }

    const handleMoreClickTeacher = (index: number) => {
        setIsMoreClickTeacher(index)
    }


    const ref = useRef(null)
    // const handleClickOutside = () => {
    //     setIsActionClick(false)
    //     setIsSortClick(false)
    //     setIsMoreClickStudent(-1)
    //     setIsMoreClickTeacher(-1)
    // }

    // useOnClickOutside(ref, handleClickOutside)
    return (
        <>
            <HorizontalCenterContainer>
                <Grid item xs={7} sx={{ width: "100%" }}>
                    <RowLabel>
                        <Typography sx={{ mt: 4, mb: 0 }} variant="h4" component="div" color="#085c9a">
                            Teachers
                        </Typography>
                        {
                            (role !== 'student') &&
                            (<TeacherInvite onClick={handleOpenModalTeacher}>
                                <IconButton>
                                    <InviteIcon />
                                </IconButton>
                            </TeacherInvite>)
                        }
                        <InviteModal classroom={classroom} isOpen={isOpenModalTeacher} onClose={handleCloseModalTeacher} isStudent={false} />
                    </RowLabel>
                    <Divider color="#085c9a" />
                    <List>
                        {classroom.teachers!.map((teacher, index) => (
                            <ListItemButton key={index}>
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
                                            primary={teacher.firstName + " " + teacher.lastName}
                                            secondary={null}
                                        />
                                    </ListItem>
                                    {
                                        (role === 'owner' && teacher._id !== user?._id) &&
                                        (
                                            <>
                                                <IconButton
                                                    onClick={() => {
                                                        const value = index
                                                        if (isMoreClickTeacher === value)
                                                            handleMoreClickTeacher(-1)
                                                        else
                                                            handleMoreClickTeacher(value)
                                                    }}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                                {
                                                    (isMoreClickTeacher === index) &&
                                                    (
                                                        <MoreCardTeacher>
                                                            <ActionSortList>
                                                                <ActionSortListItem disablePadding onClick={() => removeUser(teacher._id, false)}>
                                                                    <ActionSortListItemButton>
                                                                        <ListItemText primary="Remove" />
                                                                    </ActionSortListItemButton>
                                                                </ActionSortListItem>
                                                            </ActionSortList>
                                                        </MoreCardTeacher>
                                                    )
                                                }
                                            </>
                                        )
                                    }
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
                            Students
                        </Typography>
                        <MemberAndInvite>
                            <NumberMember>
                                {classroom.students!.length} students
                            </NumberMember>
                            {
                                (role !== 'student') &&
                                (<IconButton
                                    onClick={handleOpenModalStudent}
                                >
                                    <InviteIcon />
                                </IconButton>)
                            }
                            <InviteModal classroom={classroom} isOpen={isOpenModalStudent} onClose={handleCloseModalStudent} isStudent={true} />
                        </MemberAndInvite>
                    </RowLabel>
                    <Divider color="#085c9a" />
                    <RowLabel>
                        {(role !== 'student') &&
                            (<><CheckboxAction>
                                <Checkbox
                                    onChange={handleCheckAllStudent}
                                    checked={isCheckAllStudent}
                                />
                                <Button
                                    ref={ref}
                                    variant={isActionClick ? "contained" : "outlined"}
                                    onClick={handleActionClick}
                                >
                                    Action<ArrowDropDownIcon />
                                </Button>
                                {
                                    isActionClick &&
                                    (
                                        <ActionCard>
                                            <ActionSortList>
                                                <ActionSortListItem disablePadding>
                                                    <ActionSortListItemButton>
                                                        <ListItemText primary="Remove" />
                                                    </ActionSortListItemButton>
                                                </ActionSortListItem>
                                            </ActionSortList>
                                        </ActionCard>
                                    )
                                }
                            </CheckboxAction>
                                <IconButton
                                    ref={ref}
                                    onClick={handleSortClick}
                                >
                                    <SortByAlphaIcon />
                                </IconButton></>)
                        }

                        {
                            isSortClick &&
                            (
                                <SortCard>
                                    <ActionSortList>
                                        <ActionSortListItem disablePadding>
                                            <ActionSortListItemButton>
                                                <ListItemText primary="Sort by firstname" />
                                            </ActionSortListItemButton>
                                        </ActionSortListItem>
                                        <ActionSortListItem disablePadding>
                                            <ActionSortListItemButton>
                                                <ListItemText primary="Sort by lastname" />
                                            </ActionSortListItemButton>
                                        </ActionSortListItem>
                                    </ActionSortList>
                                </SortCard>
                            )
                        }

                    </RowLabel>
                    <List>
                        {classroom.students!.map((student, index) => (
                            <ListItemButton key={index}>
                                <RowLabelItem>
                                    {
                                        (role !== 'student') &&
                                        (
                                            <Checkbox
                                                onChange={() => handleCheckStudent(index)}
                                                checked={checkedStudents.includes(index)}
                                            />
                                        )
                                    }
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
                                            primary={student.firstName + " " + student.lastName}
                                            secondary={null}
                                        />
                                    </ListItem>
                                    {
                                        (role !== 'student') &&
                                        (<><IconButton
                                            ref={ref}
                                            onClick={() => {
                                                const value = index
                                                if (isMoreClickStudent === index) {
                                                    handleMoreClickStudent(-1)
                                                } else handleMoreClickStudent(value)

                                            }
                                            }
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                            {
                                                (isMoreClickStudent === index) &&
                                                (
                                                    <MoreCard>
                                                        <ActionSortList>
                                                            <ActionSortListItem disablePadding onClick={() => removeUser(student._id, true)}>
                                                                <ActionSortListItemButton>
                                                                    <ListItemText primary="Remove" />
                                                                </ActionSortListItemButton>
                                                            </ActionSortListItem>
                                                        </ActionSortList>
                                                    </MoreCard>
                                                )
                                            }</>)
                                    }

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