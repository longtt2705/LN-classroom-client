import { Box, Card, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { FunctionComponent } from "react";
import { Classroom } from "../../../slices/classroom-slice";


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

const StudentPoint: FunctionComponent<{classroom:Classroom}> = ({classroom}) => {
    const gradeStructure = (classroom && classroom.gradeStructure)
    const homeworks = gradeStructure?.gradeStructuresDetails || []
    return (
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
                                                    {homework.title}
                                                </NamePointHomeWork>

                                            </TableCell>
                                            <TableCell >
                                                <NamePointHomeWork>
                                                    áda
                                                </NamePointHomeWork>

                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardPoint>
                ) :
                    (
                        <NoHomeWorkCard>
                            <NoHomeWorkText>
                                Hiện bạn không có bài tập hoặc giáo viên chưa chấm điểm xong
                            </NoHomeWorkText>
                        </NoHomeWorkCard>
                    )
            }

        </HorizontalCenterContainer>
    )
}

export default StudentPoint;