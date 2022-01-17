import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../services/socket";

interface SocketState {
    socket: Socket<ServerToClientEvents, ClientToServerEvents> | null,
};

const initialState: SocketState = {
    socket: null
};

const socketSlice = createSlice({
    name: 'Socket',
    initialState,
    reducers: {
        initSocket(state, action) {
            state.socket = action.payload
        }
    }
})

export const { initSocket } = socketSlice.actions;

export default socketSlice.reducer;