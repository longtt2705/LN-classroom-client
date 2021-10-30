import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Box, Typography, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import { FunctionComponent, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import ClassroomCard from "../components/classroom-card";
import { selectRoute } from "../../reducers/route-slice"
import { RouteName } from "../../app/routes"

const Wrapper = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(4, 8),
    height: "100%",
}));

const VerticalCenterContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
}));

const HorizontalCenterContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
}));

interface HomeProps {
    name: RouteName
}


const Home: FunctionComponent<HomeProps> = ({ name }) => {
    const classrooms = useAppSelector((state) => [...state.classroomReducer.listEnrolled, ...state.classroomReducer.listTeaching])
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(selectRoute(name))
    }, [])

    return (
        <Wrapper>
            {
                classrooms.length > 0 ? (
                    <>
                        <FormControl component="fieldset">
                            <RadioGroup row aria-label="class-type" name="row-radio-buttons-group">
                                <FormControlLabel value="All" control={<Radio />} label="All" />
                                <FormControlLabel value="Enrolled" control={<Radio />} label="Enrolled" />
                                <FormControlLabel value="Teaching" control={<Radio />} label="Teaching" />
                            </RadioGroup>
                        </FormControl>
                        {
                            classrooms.map((classroom, index) => {
                                <ClassroomCard
                                    key={index}
                                    id={classroom.id}
                                    name={classroom.name}
                                    owner={classroom.ownerId}
                                />
                            })
                        }
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
                            <Button variant="contained" color="primary">
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