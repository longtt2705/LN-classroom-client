import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { FunctionComponent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RouteName } from "../../app/routes";
import { getAllClassroom } from "../../slices/classroom-slice";
import { setModalOpen } from "../../slices/create-class-modal-sclice";
import { selectRoute } from "../../slices/route-slice";
import ClassroomCard from "../components/classroom-card";
import { HorizontalCenterContainer, VerticalCenterContainer } from "../components/container";

const Wrapper = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(4, 8),
    height: "100%",
}));

interface HomeProps {
    name: RouteName
}


const Home: FunctionComponent<HomeProps> = ({ name }) => {
    const classrooms = useAppSelector((state) => state.classroomReducer.classrooms)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(selectRoute(name))
        dispatch(getAllClassroom())
    }, [])

    const handleCreateClass = () => {
        dispatch(setModalOpen())
    }

    return (
        <Wrapper>
            {
                classrooms.length > 0 ? (
                    <>
                        <FormControl component="fieldset">
                            <RadioGroup row aria-label="class-type" name="row-radio-buttons-group" defaultValue="All">
                                <FormControlLabel value="All" control={<Radio />} label="All" />
                                <FormControlLabel value="Enrolled" control={<Radio />} label="Enrolled" />
                                <FormControlLabel value="Teaching" control={<Radio />} label="Teaching" />
                            </RadioGroup>
                        </FormControl>
                        <Box mt={6}></Box>
                        <Grid container>
                            {
                                classrooms.map((classroom, index) => (
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
                            <Button variant="contained" color="success">
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