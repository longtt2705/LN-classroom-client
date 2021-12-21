import { FunctionComponent } from "react";
import { CSVLink } from "react-csv";


export const DownloadStudentListTemplateButton: FunctionComponent<{ children: any }> = ({ children }) => {
    const csvData = [
        ["Student Id", "Full Name"],
    ];

    return (<CSVLink data={csvData} filename="student-list-template.csv" target="_blank" >{children}</CSVLink>);
}

export const DownloadGradeTemplateButton: FunctionComponent<{ children: any }> = ({ children }) => {
    const csvData = [
        ["Student Id", "Grade"],
    ];

    return (<CSVLink data={csvData} filename="grade-template.csv" target="_blank">{children}</CSVLink>);
}

export const DownloadGradeBoardButton: FunctionComponent<{ children: any, data: any }> = ({ children, data }) => {

    return (<CSVLink data={data} filename="grade-board.csv" target="_blank">{children}</CSVLink>);
}