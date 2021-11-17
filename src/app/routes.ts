import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Home from '../core/home';

export interface IRoute {
    name: RouteName,
    component: any,
    path: string,
    exactPath: boolean,
    unselectedIcon: any,
    selectedIcon: any,
};

export enum RouteName {
    HOME = 'Home',
    EXPLORE = 'Explore'
}

const RouteList: IRoute[] = [
    {
        name: RouteName.HOME,
        component: Home,
        path: "/",
        exactPath: true,
        unselectedIcon: HomeOutlinedIcon,
        selectedIcon: HomeIcon,
    },
]

export default RouteList;