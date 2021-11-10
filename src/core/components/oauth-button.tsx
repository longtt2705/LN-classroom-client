import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { startCase } from 'lodash';
import { FunctionComponent } from "react";
import FACEBOOK_LOGO from '../../public/icons/facebook.png';
import GOOGLE_LOGO from '../../public/icons/google.png';
import { LOGO_WIDTH } from "../../shared/constants";

interface OauthButtonProps {
    name: "google" | "facebook"
}

const Logo = styled('img')`
    width: ${LOGO_WIDTH}px;
    height: ${LOGO_WIDTH}px;
    margin-right: ${({ theme }) => theme.spacing(2)}
`

const OAuthButton: FunctionComponent<OauthButtonProps> = ({ name }) => {
    const getIcon = () => {
        switch (name) {
            case "google":
                return GOOGLE_LOGO
            case "facebook":
                return FACEBOOK_LOGO
        }
    }

    return (
        <Button sx={{ borderRadius: '29px', mb: 1, mt: 1 }} variant="outlined" fullWidth>
            <Logo src={getIcon()} />
            <Typography variant="button"> Continue with {startCase(name)} </Typography>
        </Button>

    );
}

export default OAuthButton;