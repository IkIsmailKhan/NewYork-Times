import React from 'react'
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    let navigate = useNavigate();
    return (
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='100vh'>
            <Typography fontSize={30}>404 - Page Not Found</Typography>
            <Button onClick={()=>navigate(`/top-stories/home`)} variant='contained' sx={{ borderRadius: '50px', padding:'10px 30px', marginTop:'2rem' }}>GO TO HOMEPAGE</Button>
        </Box>
    )
}


export default NotFound