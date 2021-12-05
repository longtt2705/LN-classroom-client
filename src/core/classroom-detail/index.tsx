import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getGradeStructure } from "../../services/classroom";
import { selectRoute } from "../../slices/route-slice";
import { HorizontalCenterContainer } from "../components/container";
import PageNotFound from "../components/page-not-found";
import { DataItem, GradeStructure } from "../grade-structure";
import MainStream from "./components/main-stream";
import People from "./components/people";

const ClassroomDetail: FunctionComponent = () => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const classroom = useAppSelector(({ classroomReducer }) =>
        [...classroomReducer.enrolledClassrooms, ...classroomReducer.teachingClassrooms]
            .find((classroom) => classroom._id === id))
    const lastId = useRef('')
    const [value, setValue] = useState('1');
    const [gradeStructure, setgradeStructure] = useState<Array<DataItem>>([]);
    const { path } = useRouteMatch();

    useEffect(() => {
        if (lastId.current !== id) {
            dispatch(selectRoute(id))
            lastId.current = id
        }
    }, [id]);


    useEffect(() => {
        const getGradeStructureOfCurrent = async () => {
            try {
                const response = await getGradeStructure(id)
                setgradeStructure(response.data)
            } catch (e) {
                // ignore
            }
        }
        getGradeStructureOfCurrent()
    }, [id])

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
                                    <Tab label="Main Stream" value="1" />
                                    <Tab label="People" value="2" />
                                    <Tab label="Grade Structure" value="3" />
                                </TabList>
                            </HorizontalCenterContainer>
                        </Box>
                        <TabPanel value="1" key={1}><MainStream classroom={classroom} gradeStructure={gradeStructure}/></TabPanel>
                        <TabPanel value="2" key={2}><People classroom={classroom} /></TabPanel>
                        <TabPanel value="3" key={3}><GradeStructure gradeStructure={gradeStructure} classId={classroom._id!}/></TabPanel>
                    </TabContext>
                </Route>
            </Switch>
        </>) : <PageNotFound />
    );
}

export default ClassroomDetail;