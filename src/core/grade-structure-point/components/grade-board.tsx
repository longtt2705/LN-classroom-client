import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonIcon from '@mui/icons-material/Person';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Avatar, Box, Button, Checkbox, CircularProgress, Divider, IconButton, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { round } from 'lodash';
import React, { FunctionComponent, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { appendStudentList, getGradeBoard, updateGradeBoard, updateGradeStructureDetail } from '../../../services/classroom';
import { sendFinalizeAction } from '../../../services/socket';
import { ERROR_MESSAGE } from '../../../shared/messages';
import { createAlert } from '../../../slices/alert-slice';
import { Classroom, getClassroom, GradeStructureDetail, Role } from '../../../slices/classroom-slice';
import { parseCSVData } from '../../../utils/csv';
import { DownloadGradeBoardButton, DownloadGradeTemplateButton, DownloadStudentListTemplateButton } from '../../classroom-detail/components/csv-button';
import SpinnerLoading from '../../components/spinner-loading';
import PointModal from "./modal";

const Root = styled('div')`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    min-width: 650px;
  }

  td,
  th {
    border: 1.5px solid #ddd;
    text-align: left;
    padding: 8px;
    overflow:hidden
  }

  tr{
      height:60px
  }

  thead tr{
      height:100px
  }
`;

const HorizontalCenterContainer = styled(Box)(({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
}));

const GradeBox = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(2.5),
    justifyContent: "center",
}))

const TimeGrade = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.default,
    color: theme.colors.texting.classcode,
    fontWeight: "bold",
    padding: theme.spacing(0.5)
}))

const GradeName = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.changePass,
    fontWeight: "bold",
    color: theme.colors.texting.gradeName,
    padding: theme.spacing(1)
}))

const LineGrade = styled(Divider)(({ theme }) => ({
    width: "100%",
    color: theme.colors.background.gradeBackGround,
    padding: theme.spacing(1)
}))

const BoxSort = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
}))

const StudentItem = styled(ListItemButton)(({ theme }) => ({
    width: "100%",
    height: "100%",
}))

const StudentIdItem = styled(ListItemButton)(({ theme }) => ({
    width: "100%",
    height: "100%",
}))

const BoxInfor = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
}))

const PersonAvatar = styled(Avatar)(({ theme }) => ({
    marginRight: theme.spacing(2)
}))

const StudentName = styled(Typography)(({ theme }) => ({
    fontsize: theme.fontSizes.changePass,
    fontWeight: "bold",
}))

const PointText = styled(Typography)(({ theme }) => ({
    width: "100%",
    height: "100%",
    fontSizes: theme.fontSizes.default,
    fontWeight: "bold",
    color: theme.colors.texting.button,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}))

const BoxFinal = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginLeft: theme.spacing(1),
    alignItems: "center",
}))

const MarkText = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.changePass,
    color: theme.colors.texting.sideBarLabel
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

const GradeNameFinal = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.changePass,
    fontWeight: "bold",
    color: theme.colors.texting.gradeName,
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    alignItems: "center,"
}))

const ButtonBox = styled(Box)(({ theme }) => ({
    width: "100%",
    height: theme.spacing(20),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
}))

const BoxImportButton = styled(Box)(({ theme }) => ({
    width: theme.spacing(70),
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
}))

const UpDownImpButton = styled(Button)(({ theme }) => ({
    width: theme.spacing(33),
    height: theme.spacing(10),
    padding: theme.spacing(2),
    fontSize: theme.fontSizes.default,
    fontWeight: "bold",
}))

const DownLoadDropCard = styled(Box)(({ theme }) => ({
    width: theme.spacing(92),
    height: theme.spacing(28),
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: theme.spacing(75),
    top: theme.spacing(52),
    backgroundColor: theme.colors.background.white,
    borderRadius: theme.spacing(1.25),
    zIndex: 5,
}))

const DownLoadList = styled(List)(({ theme }) => ({
    width: "100%",
}))

const DownLoadListItem = styled(ListItem)(({ theme }) => ({
    width: "100%",
    height: theme.spacing(8),
    fontSize: theme.fontSizes.default,
    color: theme.colors.background.primary,
}))

const DownLoadListItemButton = styled(ListItemButton)(({ theme }) => ({
    width: "100%",
    height: theme.spacing(8)
}))

const DownloadText = styled(Typography)(({ theme }) => ({
    width: "100%",
    fontSize: theme.fontSizes.changePass,
    color: theme.colors.texting.textLabel,
    fontWeight: "bold",
}))


const GradeBoard: FunctionComponent<{ classroom: Classroom, role: Role }> = ({ classroom, role }) => {
    const [downloadClick, setDownloadClick] = useState(false)
    const [isOpenModalPoint, setIsOpenModalPoint] = useState<any>({})
    const [homeworkIndex, setHomeworkIndex] = useState(0)
    const classId = classroom?._id || ""
    const [isLoading, setLoading] = useState(false)
    const [isMarkLoading, setMarkLoading] = useState<any>({})
    const gradeStructure = (classroom && classroom.gradeStructure)
    const homeworks = gradeStructure?.gradeStructuresDetails || []
    const dispatch = useAppDispatch()
    const [students, setStudents] = useState<any[]>([])
    const history = useHistory()
    const socket = useAppSelector((state) => state.socketSlice.socket)
    const user = useAppSelector((state) => state.userReducer.user)

    const handleDownloadClick = () => {
        setDownloadClick(!downloadClick)
    }

    const handleOpenModalPoint = (homeworkInd: number, studentId: string) => {
        setHomeworkIndex(homeworkInd)
        setIsOpenModalPoint({ ...isOpenModalPoint, [studentId]: true })
    }
    const handleCloseModalPoint = (studentId: string) => setIsOpenModalPoint({ ...isOpenModalPoint, [studentId]: false })

    const handleDownloadStudentClick = () => {
        setDownloadClick(!downloadClick)
    }

    const handleDownloadGradeClick = () => {
        setDownloadClick(!downloadClick)
    }

    const handleDownloadGradeTemplateClick = () => {
        setDownloadClick(!downloadClick)
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const { data } = await getGradeBoard(classroom._id!)
                setStudents(data)
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
    }, [dispatch, classroom._id])

    const handleStudentProfileClick = (studentId: string) => {
        history.push(`/users/students/${studentId}`)
    }

    const handleUploadStudentList = (event: any) => {
        const uploadStudentList = async (fields: string[], data: string[]) => {
            const indexStudentId = fields.indexOf('Student Id')
            const indexFullName = fields.indexOf('Full Name')
            if (indexFullName >= 0 && indexStudentId >= 0) {
                const payload = data.map(datum => {
                    return {
                        studentId: datum[indexStudentId],
                        fullName: datum[indexFullName],
                        classId: classroom._id
                    }
                })
                try {
                    await appendStudentList(classroom._id!, payload)
                    fetchStudents()
                    dispatch(createAlert({
                        message: 'Upload list student success!',
                        severity: 'success'
                    }))
                } catch {
                    dispatch(createAlert({
                        message: 'Upload list student failed!',
                        severity: 'error'
                    }))
                }
            } else {
                dispatch(createAlert({
                    message: 'Your file format is wrong!',
                    severity: 'error'
                }))
            }
        }
        parseCSVData(event.target.files[0], uploadStudentList)
    }

    const handleUploadGrade = (gradeDetailId: string) => (event: any) => {
        const uploadGrade = async (fields: string[], data: string[]) => {
            const indexStudentId = fields.indexOf('Student Id')
            const indexGrade = fields.indexOf('Grade')
            if (indexGrade >= 0 && indexStudentId >= 0) {
                const payload = data.map(datum => {
                    return {
                        studentId: datum[indexStudentId],
                        point: datum[indexGrade]
                    }
                })
                try {
                    await updateGradeBoard(classroom._id!, gradeDetailId, payload)
                    fetchStudents()
                    dispatch(createAlert({
                        message: 'Upload grade success!',
                        severity: 'success'
                    }))
                } catch {
                    dispatch(createAlert({
                        message: 'Upload grade failed!',
                        severity: 'error'
                    }))
                }
            } else {
                dispatch(createAlert({
                    message: 'Your file format is wrong!',
                    severity: 'error'
                }))
            }
        }
        parseCSVData(event.target.files[0], uploadGrade)
    }

    const getStudentGrade = (student: any, homeworkId: string) => {
        const result = student.grade.find((grade: any) => {
            return grade.gradeStructureDetail === homeworkId
        })
        return result ? result.point : "0"
    }

    const getRealStudentGrade = (student: any, homework: GradeStructureDetail) => {
        return round(parseFloat(getStudentGrade(student, homework._id!)) / 10 * homework.point, 2)
    }

    const getStudentTotalGrade = (student: any) => {
        let total = 0
        homeworks.forEach((homework) => {
            total += getRealStudentGrade(student, homework)
        })

        return round(total, 2)
    }

    const getTotalGrade = () => {
        return round(homeworks.reduce((total, currentValue) => {
            return total + currentValue.point
        }, 0), 2)
    }

    const getGPA = (student: any) => {
        return round(getStudentTotalGrade(student) * 10 / getTotalGrade(), 2)
    }

    const handleCheck = (homework: GradeStructureDetail) => async (event: React.ChangeEvent<HTMLInputElement>) => {
        setMarkLoading({ ...isMarkLoading, [homework._id!]: true })
        try {
            await updateGradeStructureDetail(classId, homework._id!, homework.title, homework.description || "", homework.point, event.target.checked)
            if (!event.target.checked) {
                const payload = {
                    user: user!,
                    homeworkTitle: homework.title,
                    classroom
                }
                const receivers = classroom.students!.map((student) => student._id!)
                sendFinalizeAction(socket!, payload, receivers)
            }
            dispatch(getClassroom(classId))
        } catch (err) {
            dispatch(createAlert({
                message: ERROR_MESSAGE,
                severity: "error"
            }))
        } finally {
            setMarkLoading({ ...isMarkLoading, [homework._id!]: false })
        }
    }

    const fetchStudents = async () => {
        try {
            setLoading(true)
            const { data } = await getGradeBoard(classroom._id!)
            setStudents(data)
        } catch {
            // ignore
        } finally {
            setLoading(false)
        }
    }

    const prepareDataForDownloadCsv = () => {
        const homeworksName = homeworks.map((homework) => homework.title)
        const data = [['Student Id', 'Full Name', ...homeworksName, 'Final']]
        students.forEach((student) => {
            const homeworkGrade = homeworks.map((homework) => getStudentGrade(student, homework._id!))
            const gpa = getGPA(student)
            data.push([student.studentId, student.fullName, ...homeworkGrade, gpa])

        })
        return data
    }

    return (
        isLoading ? <SpinnerLoading /> :
            <Root>
                <ButtonBox>
                    <BoxImportButton>
                        <UpDownImpButton
                            variant="outlined"
                            onClick={handleDownloadClick}
                        >
                            Download
                            <ArrowDropDownIcon />
                        </UpDownImpButton>
                        <UpDownImpButton
                            variant="contained"
                            component="label"
                            disabled={role !== 'owner'}
                        >
                            Upload
                            <input
                                onChange={handleUploadStudentList}
                                onClick={(event: any) => {
                                    event.target.value = null
                                }}
                                type="file"
                                accept="text/csv"
                                hidden
                            />
                        </UpDownImpButton>
                    </BoxImportButton>
                </ButtonBox>
                {
                    (downloadClick) && (
                        <DownLoadDropCard
                            sx={{ boxShadow: 5 }}
                        >
                            <DownLoadList>
                                <DownLoadListItem>
                                    <DownLoadListItemButton
                                        onClick={handleDownloadStudentClick}
                                    >
                                        <DownloadStudentListTemplateButton>
                                            <DownloadText>Download Students List Template</DownloadText>
                                        </DownloadStudentListTemplateButton>
                                    </DownLoadListItemButton>
                                </DownLoadListItem>
                                <DownLoadListItem>
                                    <DownLoadListItemButton
                                        onClick={handleDownloadGradeTemplateClick}
                                    >
                                        <DownloadGradeTemplateButton >
                                            <DownloadText>Download Student Grade Template</DownloadText>
                                        </DownloadGradeTemplateButton>
                                    </DownLoadListItemButton>
                                </DownLoadListItem>
                                <DownLoadListItem>
                                    <DownLoadListItemButton
                                        onClick={handleDownloadGradeClick}
                                    >
                                        <DownloadGradeBoardButton data={prepareDataForDownloadCsv()} >
                                            <DownloadText>Download Grade Board</DownloadText>
                                        </DownloadGradeBoardButton>
                                    </DownLoadListItemButton>
                                </DownLoadListItem>
                            </DownLoadList>
                        </DownLoadDropCard>
                    )
                }
                {
                    (homeworks.length !== 0) ? (
                        (students.length !== 0) ? (
                            <table style={{ minWidth: "650" }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: "400px" }} colSpan={2}>
                                            <BoxSort>
                                                Grade Board
                                            </BoxSort>
                                        </th>
                                        {(homeworks.map((homework, inx) => (
                                            <th style={{ minWidth: "120px" }} key={inx}>
                                                <GradeBox>
                                                    <GradeName>{homework.title}</GradeName>
                                                    <LineGrade />
                                                    <TimeGrade>out of 10 ({homework.point})</TimeGrade>
                                                    <BoxFinal>
                                                        <MarkText>Mark Final</MarkText>
                                                        {
                                                            isMarkLoading[homework._id!] ? <CircularProgress /> :
                                                                <Checkbox color="success"
                                                                    checked={homework.isFinalized}
                                                                    onChange={handleCheck(homework)}
                                                                />
                                                        }
                                                        <input
                                                            onChange={handleUploadGrade(homework._id!)}
                                                            onClick={(event: any) => {
                                                                event.target.value = null
                                                            }}
                                                            type="file"
                                                            accept="text/csv"
                                                            style={{ display: "none" }}
                                                            id={`contained-button-file-${inx}`}
                                                        />
                                                        <label htmlFor={`contained-button-file-${inx}`}>
                                                            <IconButton component="span">
                                                                <UploadFileIcon />
                                                            </IconButton>
                                                        </label>
                                                    </BoxFinal>
                                                </GradeBox>
                                            </th>
                                        )))}

                                        <th style={{ minWidth: "120px" }}>
                                            <GradeBox>
                                                <GradeNameFinal>Final</GradeNameFinal>
                                                <LineGrade />
                                                <TimeGrade>out of 10 ({getTotalGrade()})</TimeGrade>
                                            </GradeBox>
                                        </th>

                                    </tr >
                                </thead >
                                <tbody>
                                    {
                                        (students.map((student, inx) => (
                                            <tr key={inx}>
                                                <td style={{ minWidth: "100px" }}>
                                                    <StudentIdItem
                                                        onClick={() => handleStudentProfileClick(student.studentId)}
                                                    >
                                                        <BoxInfor>
                                                            <StudentName>{student.studentId}</StudentName>
                                                        </BoxInfor>
                                                    </StudentIdItem>
                                                </td>
                                                <td style={{ minWidth: "300px" }}>
                                                    <StudentItem
                                                        onClick={() => handleStudentProfileClick(student.studentId)}
                                                    >
                                                        <BoxInfor>
                                                            <PersonAvatar>
                                                                <PersonIcon />
                                                            </PersonAvatar>
                                                            <StudentName>{student.fullName}</StudentName>
                                                        </BoxInfor>
                                                    </StudentItem>
                                                </td>
                                                {(homeworks.map((homework, inx) => (
                                                    <td key={inx}>
                                                        <ListItemButton
                                                            onClick={() => handleOpenModalPoint(inx, student.studentId)}
                                                        >
                                                            <PointText>
                                                                {
                                                                    `${getStudentGrade(student, homework._id!)} (${getRealStudentGrade(student, homework)})`
                                                                }
                                                            </PointText>
                                                        </ListItemButton>
                                                    </td>
                                                )))}
                                                <td>
                                                    <PointText>{`${getGPA(student)} (${getStudentTotalGrade(student)})`}</PointText>
                                                </td>
                                                <PointModal fetchStudents={fetchStudents} isOpen={isOpenModalPoint[student.studentId]} onClose={handleCloseModalPoint} homework={homeworks[homeworkIndex]} student={student} classId={classId} />
                                            </tr>
                                        )))

                                    }
                                </tbody>
                            </table >
                        ) : (
                            <HorizontalCenterContainer >
                                <NoHomeWorkCard>
                                    <NoHomeWorkText>
                                        There is no student yet. Please upload csv file.
                                    </NoHomeWorkText>
                                </NoHomeWorkCard>

                            </HorizontalCenterContainer>
                        )
                    ) :
                        (
                            <HorizontalCenterContainer >
                                <NoHomeWorkCard>
                                    <NoHomeWorkText>
                                        There is no homeworks. Let add exams for your class
                                    </NoHomeWorkText>
                                </NoHomeWorkCard>
                            </HorizontalCenterContainer>

                        )
                }

            </Root >
    )
}

export default GradeBoard;