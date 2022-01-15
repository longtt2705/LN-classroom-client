import { Box, Card, IconButton, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { round } from "lodash";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getStudentGradeBoard } from "../../../services/classroom";
import { createAlert } from "../../../slices/alert-slice";
import { Classroom, GradeStructureDetail } from "../../../slices/classroom-slice";
import { CenterContainer } from "../../components/container";
import SpinnerLoading from "../../components/spinner-loading";
import FlagIcon from '@mui/icons-material/Flag';


const HorizontalCenterContainer = styled(Box)(({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
}));

const CardPoint = styled(Card)(({ theme }) => ({
    width: theme.spacing(162.5),

}))

const HeadTable = styled(TableHead)(({ theme }) => ({
    width: "100%",
    backgroundColor: theme.colors.texting.button,

}))

const HeadTableText = styled(Typography)(({ theme }) => ({
    color: theme.colors.background.white,
    fontSize: theme.fontSizes.codeclass,
    fontWeight: "bold",
}))

const NamePointHomeWork = styled(Typography)(({ theme }) => ({
    color: theme.colors.texting.classcode,
    fontSize: theme.fontSizes.changePass,
    fontWeight: "bold",
}))

const NoHomeWorkCard = styled(Box)(({ theme }) => ({
    width: theme.spacing(162.5),
    height: theme.spacing(100),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.spacing(2)

}))


const NoHomeWorkText = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.sizeLabel,
    color: theme.colors.texting.sideBarLabel,
    fontWeight: "bold",
}))

const PointAndReview = styled(Box)(({ theme }) => ({
    widht: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
}))

const ReviewButton = styled(IconButton)(({ theme }) => ({
    marginLeft: theme.spacing(5)
}))

const StudentPoint: FunctionComponent<{ classroom: Classroom }> = ({ classroom }) => {
    const gradeStructure = (classroom && classroom.gradeStructure)
    const homeworks = gradeStructure?.gradeStructuresDetails || []
    const user = useAppSelector((state) => state.userReducer.user)

    const [isLoading, setLoading] = useState(false)
    const [student, setStudent] = useState<any>(null)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const { data } = await getStudentGradeBoard(classroom._id!, user!.studentId!)
                setStudent(data)
            } catch {
                dispatch(createAlert({
                    message: 'Error when trying to fetch grade board!',
                    severity: 'error'
                }))
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [dispatch, classroom._id, user])

    const getStudentGrade = (homework: GradeStructureDetail) => {
        if (homework.isFinalized && student) {
            const result = student.grade.find((grade: any) => {
                return grade.gradeStructureDetail === homework._id!
            })
            return result ? result.point : "0"
        }
        return "0"
    }

    const getRealStudentGrade = (homework: GradeStructureDetail) => {
        return round(parseFloat(getStudentGrade(homework)) / 10 * homework.point, 2)
    }

    const getStudentTotalGrade = () => {
        let total = 0
        homeworks.forEach((homework) => {
            total += getRealStudentGrade(homework)
        })

        return round(total, 2)
    }

    const getTotalGrade = () => {
        return round(homeworks.reduce((total, currentValue) => {
            return total + currentValue.point
        }, 0), 2)
    }

    const getGPA = () => {
        return round(getStudentTotalGrade() * 10 / getTotalGrade(), 2)
    }

    return (
        isLoading ? <SpinnerLoading /> :
            student ?
                (
                    <HorizontalCenterContainer>
                        {
                            (homeworks.length !== 0) ? (
                                <CardPoint>
                                    <TableContainer>
                                        <Table sx={{ width: 650 }}>
                                            <HeadTable>
                                                <TableRow>
                                                    <TableCell>
                                                        <HeadTableText>
                                                            Homework
                                                        </HeadTableText>

                                                    </TableCell>
                                                    <TableCell>
                                                        <HeadTableText>
                                                            Finalized
                                                        </HeadTableText>
                                                    </TableCell>
                                                    <TableCell>
                                                        <HeadTableText>
                                                            Point
                                                        </HeadTableText>
                                                    </TableCell>
                                                </TableRow>
                                            </HeadTable>
                                            <TableBody>
                                                {homeworks.map((homework, index) => (
                                                    <TableRow
                                                        key={index}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            <NamePointHomeWork>
                                                                {`${homework.title}  (${homework.point})`}
                                                            </NamePointHomeWork>
                                                        </TableCell>
                                                        <TableCell >
                                                            <NamePointHomeWork>
                                                                {`${homework.isFinalized ? 'Yes' : 'No'}`}
                                                            </NamePointHomeWork>
                                                        </TableCell>
                                                        <TableCell >
                                                            <PointAndReview>
                                                                <NamePointHomeWork>
                                                                    {`${getStudentGrade(homework)} (${getRealStudentGrade(homework)})`}
                                                                </NamePointHomeWork>
                                                                <ReviewButton>
                                                                    <FlagIcon />
                                                                </ReviewButton>
                                                            </PointAndReview>

                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                <TableRow
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        <NamePointHomeWork>
                                                            {`Total (${getTotalGrade()})`}
                                                        </NamePointHomeWork>
                                                    </TableCell>
                                                    <TableCell >
                                                        <NamePointHomeWork>
                                                            -
                                                        </NamePointHomeWork>
                                                    </TableCell>
                                                    <TableCell >
                                                        <NamePointHomeWork>
                                                            {`${getGPA()} (${getStudentTotalGrade()})`}
                                                        </NamePointHomeWork>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardPoint>
                            ) :
                                (
                                    <NoHomeWorkCard>
                                        <NoHomeWorkText>
                                            There is currently no homeworks.
                                        </NoHomeWorkText>
                                    </NoHomeWorkCard>
                                )
                        }

                    </HorizontalCenterContainer>) : (
                    <CenterContainer>
                        <Typography variant="h6">
                            Your student ID doesnt match any in this class.
                        </Typography>
                    </CenterContainer>
                )
    )
}

export default StudentPoint;