import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
    isOpen: boolean
};

const initialState: ModalState = {
    isOpen: false
};

const createClassModalSlice = createSlice({
    name: 'CreateClassModal',
    initialState,
    reducers: {
        setModalOpen(state) {
            state.isOpen = true
        },
        setModalClose(state) {
            state.isOpen = false
        }
    }
});

export const { setModalOpen, setModalClose } = createClassModalSlice.actions;

export default createClassModalSlice.reducer;