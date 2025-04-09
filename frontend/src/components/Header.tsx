import { alpha, AppBar, Box, Container, IconButton, InputBase, styled, Toolbar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
//import React from 'react';

type Props = {}

const Logo = () => {
    return (
        <img src='./img/note.png' width='20px'></img>
    )
}

const Search = styled('div')(({ theme }) => ({
    display: 'flex',
    height: '2rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '1px 1px 3px #D9D9D9',
    borderRadius: '5px',
    ':hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.05),
    },
}));

const SearchInputStyled = styled(InputBase)(() => ({
    color: 'black',
    fontSize: 'small',
    backgroundColor: 'transparent',
  }));

export default function Header({}: Props) {
    return (
        <Box sx={{ flexGrow: 1, display:'flex', width:'100vw', 
            position:'absolute', top: '0'}} >

            <AppBar position='static' color='inherit'>
                <Toolbar sx={{padding:'0'}}>
                    <Container maxWidth='lg' sx={{
                        display:'flex', 
                        justifyContent:'space-between',
                        alignItems:'center'}}>
                        <Box sx={{display:'flex', alignItems:'center'}}>
                            <Logo/>
                            <Typography sx={{margin:'0.4rem', fontSize:'0.7rem'}}>
                                Core Notes</Typography>
                                <Search>
                                    <SearchInputStyled size='small' />
                                    <IconButton size='small'>
                                        <SearchIcon fontSize='small' />
                                    </IconButton>
                                </Search>

                        </Box>

                        <IconButton size='small'>
                            <ClearIcon fontSize='small'/>
                        </IconButton>
                    </Container>
                    
                </Toolbar>
                
            </AppBar>
            
        </Box>
    )
}