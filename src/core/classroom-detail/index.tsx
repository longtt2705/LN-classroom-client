import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectRoute } from "../../slices/route-slice";
import PageNotFound from "../components/page-not-found";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MainStream from "./components/main-stream";
import People from "./components/people";
import { HorizontalCenterContainer } from "../components/container";

const ClassroomDetail: FunctionComponent = () => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const classroom = useAppSelector(({ classroomReducer }) =>
        [...classroomReducer.enrolledClassrooms, ...classroomReducer.teachingClassrooms]
            .find((classroom) => classroom._id === id))
    const lastId = useRef('')
    const [value, setValue] = useState('1');


    useEffect(() => {
        if (lastId.current !== id) {
            dispatch(selectRoute(id))
            lastId.current = id
        }
    })

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        classroom ? (<><TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <HorizontalCenterContainer>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Main Stream" value="1" />
                        <Tab label="People" value="2" />
                    </TabList>
                </HorizontalCenterContainer>
            </Box>
            <TabPanel value="1" key={1}><MainStream classroom={classroom} /></TabPanel>
            <TabPanel value="2" key={2}><People classroom={classroom} /></TabPanel>
        </TabContext></>) : <PageNotFound />
    );
}

export default ClassroomDetail;