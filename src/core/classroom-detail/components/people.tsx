import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { FunctionComponent } from 'react';
import { PEOPLE_GRID_WIDTH } from "../../../shared/styles";

const HorizontalCenterContainer = styled(Box)(({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
}));

const Label = styled(Typography)(({ theme }) => ({
    color: theme.colors.texting.textLabel,
    fontSize: theme.fontSizes.sizeLabel,
}))

const Line = styled(Divider)(({ theme }) => ({
    borderColor: theme.colors.texting.textLabel,
}))

const PeopleClass: FunctionComponent = () => {
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
    return (
        <>
            <HorizontalCenterContainer>
                <Grid item xs={PEOPLE_GRID_WIDTH} sx={{ width: "100%" }}>
                    <Label>
                        Teachers
                    </Label>
                    <Line></Line>
                    <List>
                        {teachers.map((teacher, index) => (
                            <ListItem key={index}>
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
                        ))}


                    </List>
                </Grid>
            </HorizontalCenterContainer>
            <HorizontalCenterContainer>
                <Grid item xs={7} sx={{ width: "100%" }}>
                    <Label>
                        Students
                    </Label>
                    <Line />
                    <List>
                        {students.map((student, index) => (
                            <ListItem key={index}>
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
                        ))}

                    </List>
                </Grid>
            </HorizontalCenterContainer>
        </>
    );
}

export default PeopleClass;