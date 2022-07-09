import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';

const SearchBar = ({ searchValue, searchList, handleSearchValue, handleSearch, handleRecentSearch, setSearchValue }) => {
  return (
    <>
      <Box display='flex' >
        <TextField
          sx={{ marginRight: 2, width: '20rem' }}
          label='News'
          size='small'
          onChange={handleSearchValue}
          value={searchValue}
          onClick={() => setSearchValue('')}
        />

        <Button variant='outlined' onClick={handleSearch}>Search</Button>
      </Box>
      <Box pt={1} display='flex'>
        <Typography sx={{ ml: 1 }} variant='body2'>Recent: <span>&nbsp;</span></Typography>
        {
          searchList.searchHistory.map((item, index) => (
            <Typography sx={{ cursor: 'pointer' }} onClick={() => handleRecentSearch(item)} color='primary' key={index} variant='body2'>{index >= 1 ? "," : ''}<span>&nbsp;</span>{item}</Typography>
          ))
        }
      </Box>
    </>
  );
}

export default SearchBar
