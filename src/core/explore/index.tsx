import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { FunctionComponent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RouteName } from "../../app/routes";
import { selectRoute } from "../../slices/route-slice";
import ClassroomCard from "../components/classroom-card";
import { VerticalCenterContainer } from "../components/container";

const Wrapper = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(4, 8),
    height: "100%",
}));


interface ExploreProps {
    name: RouteName
}


const Explore: FunctionComponent<ExploreProps> = ({ name }) => {
    const classrooms = useAppSelector((state) => state.classroomReducer.searchResult)
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
                                <ClassroomCard key={index} classroom={classroom} />
                            })
                        }
                    </>) :
                    <VerticalCenterContainer>
                        <Typography align='center' variant="h4" component="div">There are currently no classrooms which you did not participate in!</Typography>
                        {/* <Box mt={2}></Box>
                        <HorizontalCenterContainer>
                            <Button variant="contained" color="primary" onClick={handleCreateClass}>
                                Create Class
                            </Button>
                            <Box mr={2} display="inline"></Box>
                            <Typography align='center' variant="h5" component="div">now</Typography>
                        </HorizontalCenterContainer> */}

                    </VerticalCenterContainer>

            }
        </Wrapper>
    );
}

export default Explore;