import { CircularProgress } from "@mui/material";
import { HorizontalCenterContainer, VerticalCenterContainer } from "./container";


const SpinnerLoading = () => {
    return (
        <VerticalCenterContainer>
            <HorizontalCenterContainer>
                <CircularProgress />
            </HorizontalCenterContainer>
        </VerticalCenterContainer>
    );
}

export default SpinnerLoading;