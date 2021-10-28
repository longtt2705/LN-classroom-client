import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RouteName } from '../app/routes';
import { selectRoute } from '../reducers/route-slice';

const drawerWidth = 240;

const SidebarLabel = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: theme.fontSizes.default,
    color: theme.colors.texting.sideBarLabel,
    padding: theme.spacing(0, 4),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2)
}));

const StyledListItemText = styled(Typography)<{ isSelected: boolean }>(({ theme, isSelected }) => ({
    color: theme.colors.texting.sideBarLabel,
    fontWeight: isSelected ? "bold" : 500,
    fontSize: theme.fontSizes.default,
}));


export default function SideBar() {
    const routeList = useAppSelector((state) => state.routeReducer.data)
    const dispatch = useAppDispatch();

    const handleSelectRoute = (routeName: RouteName) => {
        dispatch(selectRoute(routeName));
    }

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
            <Box sx={{ overflow: 'auto' }} >
                <List>
                    <SidebarLabel > General </SidebarLabel>
                    {routeList.map((route, index) => (
                        <ListItem
                            key={index}
                            button
                            component={Link}
                            to={route.path}
                            selected={route.isSelected}
                            onClick={() => handleSelectRoute(route.name)}
                        >
                            <ListItemIcon>
                                {route.isSelected ? <route.selectedIcon /> : <route.unselectedIcon />}
                            </ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={<StyledListItemText isSelected={route.isSelected}>
                                    {route.name}
                                </StyledListItemText>} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <SidebarLabel > Teaching </SidebarLabel>
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
        </Drawer >
    );
}
