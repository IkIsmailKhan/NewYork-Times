import React from "react";
import { useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import dummyImage from '../../assets/images/nytimes.png'
import Grid from '@mui/material/Grid';
import moment from 'moment'

const StoryDetailsCard = () => {
    const { state } = useLocation();
    return (
        <Grid
            container
            display='flex'
            justifyContent='center'
            p={{ xs: 2, sm: 5 }}
        >
            <Grid item xs={12} sm={10} md={9} lg={8}>
                <Card sx={{ boxShadow: 3, borderRadius: '10px' }} >
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height='300'
                        image={state.multimedia ? state.multimedia[0].url : dummyImage}
                    />
                    <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                            {state.published_date ? moment(state.published_date).format('YYYY-MM-DD') : '2022-01-01'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {state.section ? state.section : 'Unknown'}
                        </Typography>
                    </CardContent>

                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                        >
                            {state.title ? state.title : "Title"}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {state.abstract ? state.abstract : state.title}
                        </Typography>
                    </CardContent>

                    <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {state.byline ? state.byline : 'By -'}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {state.item_type ? state.item_type : 'Unknown'}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} sm={10} md={9} lg={8} pt={5}>
                <Card sx={{ boxShadow: 3, borderRadius: '10px' }} >
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                        >
                            Comments
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {state.comments ? state.comments : "No Comments"}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default StoryDetailsCard