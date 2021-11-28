import { Box, Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { FunctionComponent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RouteName } from "../../app/routes";
import { getAllClassroom } from "../../slices/classroom-slice";
import { setCreateClassModalOpen } from "../../slices/create-class-modal-sclice";
import { setJoinClassModalOpen } from "../../slices/join-class-modal-slice";
import { selectRoute } from "../../slices/route-slice";
import ClassroomCard from "../components/classroom-card";
import { HorizontalCenterContainer, VerticalCenterContainer } from "../components/container";
import SpinnerLoading from "../components/spinner-loading";

const Wrapper = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(4, 8),
    height: "100%",
}));

interface HomeProps {
    name: RouteName
}


const Home: FunctionComponent<HomeProps> = ({ name }) => {
    const enrolledClassrooms = useAppSelector((state) => state.classroomReducer.enrolledClassrooms)
    const teachingClassrooms = useAppSelector((state) => state.classroomReducer.teachingClassrooms)
    const isLoading = useAppSelector((state) => state.classroomReducer.isLoading)
    const dispatch = useAppDispatch()
    const [classroomTypes, setClassroomTypes] = useState("All")

    useEffect(() => {
        dispatch(selectRoute(RouteName.HOME))
        dispatch(getAllClassroom())
    }, [dispatch])

    const handleCreateClass = () => {
        dispatch(setCreateClassModalOpen())
    }

    const handleJoinClass = () => {
        dispatch(setJoinClassModalOpen())
    }

    const getDisplayClassroom = () => {
        switch (classroomTypes) {
            case "Enrolled":
                return enrolledClassrooms;
            case "Teaching":
                return teachingClassrooms
            case "All":
            default:
                return [...enrolledClassrooms, ...teachingClassrooms]
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClassroomTypes(event.target.value);
    }

    const displayClassroom = getDisplayClassroom()

    return (
        <Wrapper>
            <FormControl component="fieldset">
                <RadioGroup row aria-label="class-type" name="row-radio-buttons-group" value={classroomTypes} onChange={handleChange}>
                    <FormControlLabel value="All" control={<Radio />} label="All" />
                    <FormControlLabel value="Enrolled" control={<Radio />} label="Enrolled" />
                    <FormControlLabel value="Teaching" control={<Radio />} label="Teaching" />
                </RadioGroup>
            </FormControl>
            <Box mt={6}></Box>
            {
                isLoading ? <SpinnerLoading /> :
                    displayClassroom.length > 0 ? (
                        <>

                            <Grid container>
                                {
                                    displayClassroom.map((classroom, index) => (
                                        <Grid item xs={12} md={3} key={index} style={{ marginTop: '16px', marginBottom: '16px' }}>
                                            <ClassroomCard classroom={classroom} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </>) :
                        <VerticalCenterContainer>
                            <Typography align='center' variant="h4" component="div">You have not enrolled in any classes!</Typography>
                            <Box mt={2}></Box>
                            <HorizontalCenterContainer>
                                <Button variant="contained" color="success" onClick={handleJoinClass}>
                                    Join Class
                                </Button>
                                <Box mr={2} display="inline"></Box>
                                <Typography align='center' variant="h5" component="div">or </Typography>
                                <Box mr={2} display="inline"></Box>
                                <Button variant="contained" color="primary" onClick={handleCreateClass}>
                                    Create Class
                                </Button>
                                <Box mr={2} display="inline"></Box>
                                <Typography align='center' variant="h5" component="div">now</Typography>
                            </HorizontalCenterContainer>
                        </VerticalCenterContainer>
            }
        </Wrapper>
    );
}

export default Home;