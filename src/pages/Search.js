import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SearchBar from "../components/search/SearchBar";
import { useDispatch, useSelector } from 'react-redux'
import { search, addSearchHistory } from '../store/search/index';
import SearchCard from "../components/search/SearchCard";
import Pagination from '@mui/material/Pagination';
import Loader from "../components/shared/Loader";
import { Typography } from "@mui/material";

const Search = () => {
    const dispatch = useDispatch()

    const searchList = useSelector(state => state.search)
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [searchBtn, setSearchBtn] = useState(false);

    const handleChange = (e, p) => {
        setPage(p)
    }

    const handleSearchValue = (e) => {
        setSearchValue(e.target.value)
    }

    const handleSearch = async () => {
        setSearchBtn(!searchBtn)
        if (searchValue !== "") {
            await dispatch(addSearchHistory(searchValue))
        }
    }
    
    const handleRecentSearch = async (val) => {
        setSearchValue(val)
        await dispatch(search({ page: page, query: validateSearchParam(val) }))
        setPage(1)
    }

    const validateSearchParam = (val) => {
        return val.replace(/\s/g, '+');
    }

    useEffect(() => {
        dispatch(search({ page: page, query: validateSearchParam(searchValue) }))
    }, [page, searchBtn])


    return (

        <Box pt={4} pb={4} pr={{ xs: 2, sm: 10 }} pl={{ xs: 2, sm: 10 }}>
            <SearchBar
                searchList={searchList}
                setSearchValue={setSearchValue}
                searchValue={searchValue}
                handleSearch={handleSearch}
                handleSearchValue={handleSearchValue}
                handleRecentSearch={handleRecentSearch}
            />

            {searchList.loading ? <Loader /> :
                <Grid container spacing={3} pt={4} pb={4}>
                    {searchList.data.map((item) => (
                        <Grid item xs={12} key={item.uri}>
                            <SearchCard data={item} />
                        </Grid>
                    ))}
                </Grid>}

            {searchList.data.length == 0 ?
                <Box display='flex' justifyContent='center'>
                    <Typography>No Data Found</Typography>
                </Box>
                :
                <Box display='flex' justifyContent='center'>
                    <Pagination color="primary" onChange={handleChange} count={100} page={page} />
                </Box>}
        </Box>
    )
}

export default Search




