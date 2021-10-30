import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

interface Classroom {
    id: string,
    name: string,
    ownerId: string,
    participantId: string
};

interface ClassroomState {
    listTeaching: Classroom[],
    listEnrolled: Classroom[],
    resultSearch: Classroom[],
    searchKeyword: string,

}

const initialState: ClassroomState = {
    listTeaching: [],
    listEnrolled: [],
    resultSearch: [],
    searchKeyword: ""
};


const classroomSlice = createSlice({
    name: 'Classroom',
    initialState,
    reducers: {

    }
});

export const { } = classroomSlice.actions;

export default classroomSlice.reducer;