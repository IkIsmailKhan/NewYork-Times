import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { clearStories } from '../../store/top-stories/index';
import { userLogout } from '../../store/auth/index';


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
                <Box sx={{ p: 0 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TopBar = ({ setStoryCategory }) => {
    let navigate = useNavigate();
    const dispatch = useDispatch()
    
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setStoryCategory(event.target.textContent.toLowerCase());
    };

    const handleLogout = () => {
        dispatch(clearStories())
        dispatch(userLogout())
        navigate(`/login`);
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display:'flex', justifyContent:'space-between' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Home" {...a11yProps(0)} />
                    <Tab label="World" {...a11yProps(1)} />
                    <Tab label="Science" {...a11yProps(2)} />
                    <Tab label="Search" {...a11yProps(3)} />
                </Tabs>
                <Tab label="Logout" onClick={handleLogout} {...a11yProps(4)} />
            </Box>
        </Box>
    );
}

export default TopBar;