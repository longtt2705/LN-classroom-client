import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const SidebarLabel = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: theme.fontSizes.default,
    color: theme.colors.texting.sideBarLabel,
    padding: theme.spacing(0, 4),
    marginTop: theme.spacing(4)
}));

const StyledListItemText = styled(Typography)(({ theme }) => ({
    color: theme.colors.texting.sideBarLabel,
    fontWeight: 500,
    fontSize: theme.fontSizes.default,
}));

export default function SideBar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <SidebarLabel > Home </SidebarLabel>
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <ListItem component={Link} to="/">
                        <ListItemIcon>
                            <HomeOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText
                            disableTypography
                            primary={<StyledListItemText>Home</StyledListItemText>} />
                    </ListItem>
                    <ListItem component={Link} to="/explore">
                        <ListItemIcon>
                            <ExploreOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText
                            disableTypography
                            primary={<StyledListItemText>Explore</StyledListItemText>} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}
