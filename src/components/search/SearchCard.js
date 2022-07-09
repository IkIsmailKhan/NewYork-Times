import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import dummyImage from '../../assets/images/nytimes.png'
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import moment from 'moment'

const SearchCard = ({ data }) => {

    let urlDate = moment(data.pub_date).format('YYYY-MM-DD')
    let urlTitle = data.abstract.replace(/[^a-zA-Z ]/g, "").split(' ').splice(0, 10).join("-").toLowerCase()

    return (
        <Card sx={{
            display: 'flex',
            boxShadow: 3,
            transition: 'transform .2s',
            borderRadius: '10px',
            "&:hover": {
                transform: 'scale(1.05)',
                transition: 'transform .2s',
                backgroundColor: '#f5f7f7'
            }
        }}>
            <CardMedia
                component="img"
                sx={{ width: 150 }}
                image={dummyImage}
                alt="Live from space album cover"
            />

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '1',
                            WebkitBoxOrient: 'vertical',
                        }}
                        component="div"
                        variant="h5"
                    >
                        {data.abstract ? data.abstract : 'Title'}
                    </Typography>
                    <Typography
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '1',
                            WebkitBoxOrient: 'vertical',
                        }}
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                    >
                        {data.snippet ? data.snippet : data.lead_paragraph}
                    </Typography>
                </CardContent>

                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <Button >
                        <Link to={`/top-stories/search/${urlDate?urlDate:'2022-01-01'}/${urlTitle?urlTitle:'title'}`} style={{ textDecoration: 'none' }} state={data}>
                            <Typography variant="h7" color="text.secondary">
                                Read More
                            </Typography>
                        </Link>
                    </Button>
                </Box>
            </Box>
        </Card>
    );
}

export default SearchCard;