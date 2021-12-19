import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Button, Checkbox, Divider, IconButton, Input, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import React, { FunctionComponent, useState } from "react";
import { Classroom, Role } from '../../../slices/classroom-slice';
import UploadFileIcon from '@mui/icons-material/UploadFile';

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

const PointInput = styled(Input)(({ theme }) => ({
    height: "100%",
    weight: "80%",
    border: "none",
    marginLeft: theme.spacing(1),
    color: theme.colors.texting.button,
    fontSize: theme.fontSizes.changePass,
    fontWeight: "bold",
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

    const gradeStructure = (classroom && classroom.gradeStructure)
    const homeworks = gradeStructure?.gradeStructuresDetails || []

    const students = classroom?.students || []

    const handleDownloadClick = () => {
        setDownloadClick(!downloadClick)
    }

    const handleDownloadStudentClick = () => {
        setDownloadClick(!downloadClick)
    }

    const handleDownloadGradeClick = () => {
        setDownloadClick(!downloadClick)
    }

    const handleDownloadGradeTemplateClick = () => {
        setDownloadClick(!downloadClick)
    }


    return (
        <Root>
            <ButtonBox>
                <BoxImportButton>
                    <UpDownImpButton
                        variant="outlined"
                        onClick={handleDownloadClick}
                        disabled={(students.length === 0 || homeworks.length === 0) ? true : false}
                    >
                        Download
                        <ArrowDropDownIcon />
                    </UpDownImpButton>
                    <UpDownImpButton
                        variant="contained"
                        color="primary"
                        disabled={(role === "owner") ? false : true}
                    >
                        Upload
                    </UpDownImpButton>
                </BoxImportButton>
                <UpDownImpButton
                        variant="contained"
                        color="success"
                        disabled={(role === "owner") ? false : true}
                    >
                        Save
                    </UpDownImpButton>
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
                                    <DownloadText>Download Students List Template</DownloadText>
                                </DownLoadListItemButton>
                            </DownLoadListItem>
                            <DownLoadListItem>
                                <DownLoadListItemButton
                                    onClick={handleDownloadGradeTemplateClick}
                                >
                                    <DownloadText>Download Student Grade Template</DownloadText>
                                </DownLoadListItemButton>
                            </DownLoadListItem>
                            <DownLoadListItem>
                                <DownLoadListItemButton
                                    onClick={handleDownloadGradeClick}
                                >
                                    <DownloadText>Download GradeBoard</DownloadText>
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
                                            Sort
                                        </BoxSort>
                                    </th>
                                    {(homeworks.map((homework, inx) => (
                                        <th style={{ minWidth: "120px" }} key={inx}>
                                            <GradeBox>
                                                <GradeName>{homework.title}</GradeName>
                                                <LineGrade />
                                                <TimeGrade>out of 10</TimeGrade>
                                                <BoxFinal>
                                                    <MarkText>Mark Final</MarkText>
                                                    <Checkbox color="success" />
                                                    <IconButton>
                                                        <UploadFileIcon />
                                                    </IconButton>
                                                </BoxFinal>
                                            </GradeBox>
                                        </th>
                                    )))}
                                    <th style={{ minWidth: "120px" }}>
                                        <GradeBox>
                                            <GradeNameFinal>Final</GradeNameFinal>
                                        </GradeBox>
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (students.map((student, inx) => (
                                        <tr key={inx}>
                                            <td style={{ minWidth: "100px" }}>
                                                <StudentIdItem>
                                                    <BoxInfor>
                                                        <StudentName>{student.studentId}</StudentName>
                                                    </BoxInfor>
                                                </StudentIdItem>
                                            </td>
                                            <td style={{ minWidth: "300px" }}>
                                                <StudentItem>
                                                    <BoxInfor>
                                                        <PersonAvatar>
                                                            <PersonIcon />
                                                        </PersonAvatar>
                                                        <StudentName>{student.lastName} {student.firstName}</StudentName>
                                                    </BoxInfor>
                                                </StudentItem>
                                            </td>
                                            {(homeworks.map((homework, inx) => (
                                                <td key={inx}>
                                                    <PointInput
                                                        disableUnderline={true}
                                                    />
                                                </td>
                                            )))}
                                            <td>
                                                <PointInput
                                                    disableUnderline={true}
                                                />
                                            </td>
                                        </tr>
                                    )))
                                }
                            </tbody>
                        </table>
                    ) :
                        (
                            <HorizontalCenterContainer >
                                <NoHomeWorkCard>
                                    <NoHomeWorkText>
                                        There is not student.Let add your students
                                    </NoHomeWorkText>
                                </NoHomeWorkCard>

                            </HorizontalCenterContainer>
                        )

                ) :
                    (
                        <HorizontalCenterContainer >
                            <NoHomeWorkCard>
                                <NoHomeWorkText>
                                    There is not homework. Let add exam for your class
                                </NoHomeWorkText>
                            </NoHomeWorkCard>

                        </HorizontalCenterContainer>

                    )
            }

        </Root >
    )
}

export default GradeBoard;