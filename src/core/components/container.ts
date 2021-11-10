import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const VerticalCenterContainer = styled(Box)(({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
}));

export const HorizontalCenterContainer = styled(Box)(({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
}));