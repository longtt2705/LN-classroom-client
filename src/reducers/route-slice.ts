import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import RouteList, { IRoute, RouteName } from "../app/routes"

interface RouteState {
    data: IRoute[],
    currentSelected: number
};

const initialState: RouteState = {
    data: RouteList,
    currentSelected: 0
};

const selectRouteHandler: CaseReducer<WritableDraft<RouteState>, PayloadAction<RouteName>> = (state, action) => {
    const selectedIndex = state.data.findIndex((route) => route.name === action.payload)
    if (selectedIndex !== state.currentSelected) {
        state.data[state.currentSelected].isSelected = false;
        state.data[selectedIndex].isSelected = true;
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