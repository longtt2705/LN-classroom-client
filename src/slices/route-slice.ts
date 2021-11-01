import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import RouteList, { RouteName } from "../app/routes"
interface RouteState {
    currentSelected: number
};

const initialState: RouteState = {
    currentSelected: -1
};

const selectRouteHandler: CaseReducer<WritableDraft<RouteState>, PayloadAction<RouteName>> = (state, action) => {
    const selectedIndex = RouteList.findIndex((route) => route.name === action.payload)
    if (selectedIndex !== state.currentSelected) {
        state.currentSelected = selectedIndex;
    }
};


const routeSlice = createSlice({
    name: 'Route',
    initialState,
    reducers: {
        selectRoute: selectRouteHandler
    }
});

export const { selectRoute } = routeSlice.actions;

export default routeSlice.reducer;