import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Switch } from "react-router-dom";
import { useAppSelector } from '../app/hooks';
import AppBar from './components/app-bar';
import CreateClassroomModal from './components/create-class-modal';
import JoinClassroomModal from './components/join-class-modal';
import SideBar from './components/side-bar';
interface LayoutProps {
  children: any
}


const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  const status = useAppSelector((state) => state.userReducer.user?.status)
  return (
    <Box sx={{ display: 'flex', minHeight: '80vh' }}>
      <AppBar status={status} />
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, margin: (theme) => theme.spacing(1) }}>
        <Toolbar />
        <Switch>
          {children}
        </Switch>
        <CreateClassroomModal />
        <JoinClassroomModal />
      </Box>
    </Box>
  );
}

export default Layout;