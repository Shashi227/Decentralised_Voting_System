import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import CreateIcon from '@material-ui/icons/Create';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import React, {useState} from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LoginPage from '../Pages/login'
import SignupPage from '../Pages/signup'
import '../Containers/index.css';

export default function SignInOutContainer() {

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
    
    return(
      <div className = "mbg">

    <Paper elevation={20} className="pap">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon label tabs example">

        <Tab icon={<VpnKeyIcon/>} label="Sign In" />
        <Tab icon={<CreateIcon/>} label="Sign Up" />
        
      </Tabs>
      <TabPanel value={value} index={0}>
      <LoginPage  handleChange={handleChange}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <SignupPage/>
      </TabPanel>
    </Paper>
          </div>
    );
}