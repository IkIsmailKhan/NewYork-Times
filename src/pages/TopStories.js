import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchTopStories } from '../store/top-stories/index';
import Grid from '@mui/material/Grid';
import StoryCard from '../components/top-stories/StoryCard';
import Loader from '../components/shared/Loader';
import TopBar from '../components/shared/TopBar';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Search from './Search';

const TopStories = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch()

    const topStories = useSelector(state => state.topStories)

    const [storyCategory, setStoryCategory] = useState('home')

    useEffect(() => {
        if (storyCategory !== 'search') {
            dispatch(fetchTopStories(storyCategory))
        }
        navigate(`/top-stories/${storyCategory}`);
    }, [storyCategory])

    return (
        <Box>
            <TopBar setStoryCategory={setStoryCategory} />

            {storyCategory === 'search' ? <Search/> :
                <Box> {topStories.loading ? <Loader /> :
                    <Grid container spacing={3} p={{ xs: 2, sm: 4, md: 8, lg: 10 }}>
                        {topStories.data.map((item) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={item.short_url}>
                                <StoryCard data={item} storyCategory={storyCategory}/>
                            </Grid>
                        ))}
                    </Grid>
                } </Box>
            }
        </Box>
    )
}

export default TopStories