import Home from '../core/home';
import Explore from '../core/explore';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import ExploreIcon from '@mui/icons-material/Explore';

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
    {
        name: RouteName.EXPLORE,
        component: Explore,
        path: "/explore",
        exactPath: false,
        unselectedIcon: ExploreOutlinedIcon,
        selectedIcon: ExploreIcon,
    }
]

export default RouteList;