import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography, ListItemButton, IconButton, Checkbox, Button, Card, TextField, } from "@mui/material";
import { styled } from '@mui/material/styles';
import { FunctionComponent, useState, useRef } from 'react';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useOnClickOutside } from 'usehooks-ts';
import Modal from '@mui/material/Modal';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

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

const ModalInvite = styled(Card)(({ theme }) => ({
    width: "30%",
    height: "50%",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: theme.spacing(3.75),
    paddingTop: theme.spacing(10),
    paddingLeft: theme.spacing(10),
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
    width: "90%",
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
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.colors.texting.sideBarLabel
}))

const CancelModalButton = styled(Button)(({ theme }) => ({
    width: theme.spacing(15),
    height: theme.spacing(8),
    position: "absolute",
    bottom: "5%",
    right: "5%",
}))


const PeopleClass: FunctionComponent = () => {
    const [isActionClick, setIsActionClick] = useState(false)
    const [isSortClick, setIsSortClick] = useState(false)
    const [isMoreClickStudent, setIsMoreClickStudent] = useState(-1)
    const [isMoreClickTeacher, setIsMoreClickTeacher] = useState(-1)
    const [isOpenModalTeacher, setIsOpenModalTeacher] = useState(false);
    const [isOpenModalStudent, setIsOpenModalStudent] = useState(false);
    const [isCheckAllStudent, setIsCheckAllStudent] = useState(false)
    const [isCheckStudent, setIsCheckStudent] = useState<number[]>([])

    const handleOpenModalTeacher = () => setIsOpenModalTeacher(true);
    const handleCloseModalTeacher = () => setIsOpenModalTeacher(false);

    const handleOpenModalStudent = () => setIsOpenModalStudent(true);
    const handleCloseModalStudent = () => setIsOpenModalStudent(false);

    const handleCheckAllStudent = () => {
        if (!isCheckAllStudent) {
            setIsCheckAllStudent(true)
            let listStudent = []
            for (let i = 0; i < students.length; i++) {
                listStudent.push(i)
            }
            setIsCheckStudent(listStudent)

        } else {
            setIsCheckAllStudent(false)
            setIsCheckStudent([])
        }

    }

    const handleCheckStudent = (index: number) => {
        const checkStudents=[...isCheckStudent]
        if (checkStudents.includes(index)){
            const value=index
            const newCheckStudents=checkStudents.filter(checkStudent=>checkStudent!==value)
            setIsCheckStudent(newCheckStudents)
            setIsCheckAllStudent(false)
        }else {
            const newCheckStudents=[...checkStudents,index]
            setIsCheckStudent(newCheckStudents)
            if (newCheckStudents.length===students.length){
                setIsCheckAllStudent(true)
            }
        }
    }


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

    const handleMoreClickStudent = (index: number) => {
        setIsMoreClickStudent(index)
    }

    const handleMoreClickTeacher = (index: number) => {
        setIsMoreClickTeacher(index)
    }


    const ref = useRef(null)
    const handleClickOutside = () => {
        setIsActionClick(false)
        setIsSortClick(false)
        setIsMoreClickStudent(-1)
        setIsMoreClickTeacher(-1)
    }

    useOnClickOutside(ref, handleClickOutside)
    return (
        <>
            <HorizontalCenterContainer>
                <Grid item xs={7} sx={{ width: "100%" }}>
                    <RowLabel>
                        <Typography sx={{ mt: 4, mb: 0 }} variant="h4" component="div" color="#085c9a">
                            Teacher
                        </Typography>
                        <TeacherInvite
                            onClick={handleOpenModalTeacher}
                        >
                            <IconButton>
                                <InviteIcon />
                            </IconButton>
                        </TeacherInvite>
                        <Modal
                            open={isOpenModalTeacher}
                            onClose={handleCloseModalTeacher}
                        >
                            <ModalInvite>
                                <InviteText>
                                    Invite teacher
                                </InviteText>
                                <LinkText>
                                    Link invite
                                </LinkText>
                                <LinkUrlRow>
                                    <LinkUrl>https://ahsgdahgdasjgasjdgasd</LinkUrl>
                                    <IconButton>
                                        <CoppyLinkIcon
                                            color="success"
                                        />
                                    </IconButton>

                                </LinkUrlRow>
                                <Line />
                                <CancelModalButton
                                    color="error"
                                    variant="outlined"
                                    onClick={handleCloseModalTeacher}
                                >Cancel
                                </CancelModalButton>
                            </ModalInvite>
                        </Modal>
                    </RowLabel>
                    <Divider color="#085c9a" />
                    <List>
                        {teachers.map((teacher, index) => (
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
                                        (isMoreClickTeacher === index) ?
                                            (
                                                <MoreCardTeacher>
                                                    <ActionSortList>
                                                        <ActionSortListItem disablePadding>
                                                            <ActionSortListItemButton>
                                                                <ListItemText primary="Send email" />
                                                            </ActionSortListItemButton>
                                                        </ActionSortListItem>
                                                        <ActionSortListItem disablePadding>
                                                            <ActionSortListItemButton>
                                                                <ListItemText primary="Remove" />
                                                            </ActionSortListItemButton>
                                                        </ActionSortListItem>
                                                        <ActionSortListItem disablePadding>
                                                            <ActionSortListItemButton>
                                                                <ListItemText primary="Exit Class" />
                                                            </ActionSortListItemButton>
                                                        </ActionSortListItem>
                                                    </ActionSortList>
                                                </MoreCardTeacher>
                                            ) :
                                            (
                                                <></>
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
                            Student
                        </Typography>
                        <MemberAndInvite>
                            <NumberMember>
                                {students.length} students
                            </NumberMember>
                            <IconButton
                                onClick={handleOpenModalStudent}
                            >
                                <InviteIcon />
                            </IconButton>
                            <Modal
                                open={isOpenModalStudent}
                                onClose={handleCloseModalStudent}
                            >
                                <ModalInvite>
                                    <InviteText>
                                        Invite student
                                    </InviteText>
                                    <LinkText>
                                        Link invite
                                    </LinkText>
                                    <LinkUrlRow>
                                        <LinkUrl>https://ahsgdahgdasjgasjdgasd</LinkUrl>
                                        <IconButton>
                                            <CoppyLinkIcon
                                                color="success"
                                            />
                                        </IconButton>

                                    </LinkUrlRow>
                                    <Line />
                                    <CancelModalButton
                                        color="error"
                                        variant="outlined"
                                        onClick={handleCloseModalStudent}
                                    >Cancel
                                    </CancelModalButton>
                                </ModalInvite>
                            </Modal>
                        </MemberAndInvite>
                    </RowLabel>
                    <Divider color="#085c9a" />
                    <RowLabel>
                        <CheckboxAction>
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
                                isActionClick ?
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
                                    ) :
                                    (
                                        <></>
                                    )
                            }
                        </CheckboxAction>
                        <IconButton
                            ref={ref}
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
                                ) :
                                (
                                    <></>
                                )
                        }

                    </RowLabel>
                    <List>
                        {students.map((student, index) => (
                            <ListItemButton>
                                <RowLabelItem>
                                    <Checkbox
                                        onChange={() => handleCheckStudent(index)}
                                        checked={isCheckStudent.includes(index)}
                                    />
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
                                    <IconButton
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
                                        (isMoreClickStudent === index) ?
                                            (
                                                <MoreCard>
                                                    <ActionSortList>
                                                        <ActionSortListItem disablePadding>
                                                            <ActionSortListItemButton>
                                                                <ListItemText primary="Send email for student" />
                                                            </ActionSortListItemButton>
                                                        </ActionSortListItem>
                                                        <ActionSortListItem disablePadding>
                                                            <ActionSortListItemButton>
                                                                <ListItemText primary="Remove" />
                                                            </ActionSortListItemButton>
                                                        </ActionSortListItem>
                                                    </ActionSortList>
                                                </MoreCard>
                                            ) :
                                            (
                                                <></>
                                            )
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

export default PeopleClass;