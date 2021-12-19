import React, { FunctionComponent } from "react";
import { Classroom, Role } from '../../slices/classroom-slice';
import GradeBoard from "./components/grade-board";
import StudentPoint from "./components/student-point";


const GradeStructPoint:FunctionComponent<{classroom:Classroom, role: Role }>=({classroom,role})=>{
    return (
        <>
        {
            (role==="student")?(
                <StudentPoint classroom={classroom}></StudentPoint>
            ):
            (
                <GradeBoard classroom={classroom} role={role}></GradeBoard>
            )
        }
        </>
    )
}

export default GradeStructPoint;