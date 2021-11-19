import { FunctionComponent, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectRoute } from "../../slices/route-slice";
import PageNotFound from "../components/page-not-found";

interface ClassroomProps {

}

const ClassroomDetail: FunctionComponent<ClassroomProps> = () => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const classroom = useAppSelector(({ classroomReducer }) =>
        [...classroomReducer.enrolledClassrooms, ...classroomReducer.teachingClassrooms].
            find((classroom) => classroom._id === id))
    const lastId = useRef('')

    useEffect(() => {
        if (lastId.current !== id) {
            dispatch(selectRoute(id))
            lastId.current = id
        }
    })

    return (
        classroom ? <>{classroom.name}</> : <PageNotFound />
    );
}

export default ClassroomDetail;