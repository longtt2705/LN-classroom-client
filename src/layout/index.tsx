import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from './app-bar';
import SideBar from './side-bar';
import { Switch } from "react-router-dom";
import CreateClassroomModal from './create-class-modal';
import AlertSnackBar from './alert';
interface LayoutProps {
  children: any
}


const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {

  return (
    <Box sx={{ display: 'flex', minHeight: '80vh' }}>
      <AppBar />
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, margin: (theme) => theme.spacing(1) }}>
        <Toolbar />
        <Switch>
          {children}
        </Switch>
        <CreateClassroomModal />
        <AlertSnackBar />
      </Box>
    </Box>
  );
}

export default Layout;