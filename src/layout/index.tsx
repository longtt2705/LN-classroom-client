import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import AppBar from './app-bar';
import SideBar from './side-bar';
import { Switch } from "react-router-dom";
import { ReactElement } from 'react';


interface LayoutProps {
  children: ReactElement<any, any>[]
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar />
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: (theme) => theme.spacing(1) }}>
        <Toolbar />
        <Switch>
          {children}
        </Switch>
      </Box>
    </Box>
  );
}

export default Layout;