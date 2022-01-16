import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchClassroomRole } from "../../services/classroom";
import { Role } from '../../slices/classroom-slice';
import { selectRoute } from "../../slices/route-slice";
import { HorizontalCenterContainer } from "../components/container";
import PageNotFound from "../components/page-not-found";
import { GradeStructurePage } from "../grade-structure";
import MainStream from "./components/main-stream";
import People from "./components/people";
import GradeStructPoint from '../grade-structure-point';
import NotifyReviewPoint from "../notify-review-point"



const ClassroomDetail: FunctionComponent = () => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const classroom = useAppSelector(({ classroomReducer }) =>
        [...classroomReducer.enrolledClassrooms, ...classroomReducer.teachingClassrooms]
            .find((classroom) => classroom._id === id))
    const lastId = useRef('')
    const [value, setValue] = useState('1');
    const [role, setRole] = useState<Role>(Role.STUDENT)
    const { path } = useRouteMatch();
    const gradeStructure = (classroom && classroom.gradeStructure)

    useEffect(() => {
        const fetchRole = async () => {
            try {
                if (classroom) {
                    const respone = await fetchClassroomRole(classroom._id!)
                    setRole(respone.data)
                }
            } catch (err) {
                // ignore
            }

        }
        fetchRole()
    }, [id, dispatch, classroom])

    useEffect(() => {
        if (lastId.current !== id) {
            dispatch(selectRoute(id))
            lastId.current = id
        }
    }, [id, dispatch]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };


    return (
        classroom ? (<>
            <Switch>
                <Route exact path={path}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <HorizontalCenterContainer>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Main Stream" value="1" key={1}/>
                                    <Tab label="People" value="2" key={2}/>
                                    {
                                        (role !== "student") && (
                                            <Tab label="Grade Structure" value="3" key={3}/>
                                        )
                                    }
                                    <Tab label="Grade Board" value="4" key={4}/>
                                    <Tab label="Notify Review Point" value="5" key={5}/>
                                </TabList>
                            </HorizontalCenterContainer>
                        </Box>
                        <TabPanel value="1" key={1}><MainStream classroom={classroom} gradeStructure={gradeStructure} role={role} /></TabPanel>
                        <TabPanel value="2" key={2}><People classroom={classroom} role={role} /></TabPanel>
                        {
                            (role !== "student") && (
                                <TabPanel value="3" key={3}><GradeStructurePage gradeStructure={gradeStructure} classId={classroom._id!} /></TabPanel>
                            )
                        }
                        <TabPanel value="4" key={4}><GradeStructPoint classroom={classroom} role={role} /></TabPanel>
                        <TabPanel value="5" key={5}><NotifyReviewPoint/></TabPanel>
                    </TabContext>
                </Route>
            </Switch>
        </>) : <PageNotFound />
    );
}

export default ClassroomDetail;