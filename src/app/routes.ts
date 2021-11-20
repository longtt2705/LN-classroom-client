import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Home from '../core/home';
import UserProfile from '../core/user-profile';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
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
    PROFILE = 'Profile'
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
    {
        name: RouteName.PROFILE,
        component: UserProfile,
        path: "/profile",
        exactPath: true,
        unselectedIcon: PersonOutlineIcon,
        selectedIcon: PersonIcon,
    },
]

export default RouteList;