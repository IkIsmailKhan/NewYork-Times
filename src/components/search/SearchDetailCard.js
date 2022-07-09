import React from "react";
import { useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import dummyImage from '../../assets/images/nytimes.png'
import Grid from '@mui/material/Grid';
import moment from 'moment'

const SearchDetailsCard = () => {
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
                        image={dummyImage}
                    />
                    <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                            {state.pub_date ? moment(state.pub_date).format('YYYY-MM-DD') : '2022-01-01'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {state.section_name ? state.section_name : 'Unknown'}
                        </Typography>
                    </CardContent>

                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                        >
                            {state.abstract ? state.abstract : "Title"}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {state.snippet ? state.snippet : 'Description'}
                        </Typography>
                    </CardContent>

                    <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {state.byline.original ? state.byline.original : 'By -'}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {state.type_of_material ? state.type_of_material : 'Unknown'}
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

export default SearchDetailsCard