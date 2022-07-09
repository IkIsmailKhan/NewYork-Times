import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import dummyImage from '../../assets/images/nytimes.png'
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { Link } from "react-router-dom";
import moment from 'moment'

const StoryCard = ({ data, storyCategory }) => {

    let urlDate = moment(data.published_date).format('YYYY-MM-DD')
    let urlTitle = data.abstract.replace(/[^a-zA-Z ]/g, "").split(' ').splice(0, 10).join("-").toLowerCase()

    return (
        <Card sx={{
            boxShadow: 3,
            transition: 'transform .2s',
            borderRadius:'10px',
            "&:hover": {
                transform: 'scale(1.05)',
                transition: 'transform .2s',
                backgroundColor: '#f5f7f7'
            },
        }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="200"
                image={data.multimedia ? data.multimedia[0].url : dummyImage}
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                    {moment(data.published_date).format('YYYY-MM-DD')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {data.section}
                </Typography>
            </CardContent>

            <CardContent>
                <Typography
                    gutterBottom
                    variant="h5"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {data.title ? data.title : "To Title"}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {data.abstract ? data.abstract : data.title}
                </Typography>
            </CardContent>
            <CardActions sx={{display:'flex', justifyContent:'center'}} >
                <Button >
                    <Link to={`/top-stories/${storyCategory}/${urlDate?urlDate:'2022/01/01'}/${data.section?data.section:'world'}/${urlTitle?urlTitle:'title'}`} style={{ textDecoration: 'none' }} state={data}>
                        <Typography  variant="h7" color="text.secondary">
                            Read More
                        </Typography>
                    </Link>
                </Button>
            </CardActions>
        </Card>
    );
}

export default StoryCard;