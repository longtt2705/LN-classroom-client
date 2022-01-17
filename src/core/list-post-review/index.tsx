import React, { FunctionComponent } from "react";
import { Role } from "../../slices/classroom-slice";
import ListStudentPostReviewPoint from "./list-student-review-point"
import ListTeacherPostReviewPoint from "./list-teacher-post-review-point"


const ListPostReviewPoint: FunctionComponent<{role:Role,classId:string}> = ({role,classId}) => {
    return (
        (role!=="student")?
        (<ListTeacherPostReviewPoint classId={classId}/>):
        (<ListStudentPostReviewPoint classId={classId}/>)
    )
}

export default ListPostReviewPoint;