import { alpha, AppBar, Box, Button, InputBase, styled, Toolbar, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const Logo = styled('img')(() => ({
    width: '1.6rem'
}));

const Search = styled('div')(({ theme }) =>({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '1px 1px 3px #D9D9D9',
    borderRadius: '4px',
    ':hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.05),
    },
}));

const SearchInputStyled = styled(InputBase)(() => ({
    color: 'black',
    fontSize: 'small',
    backgroundColor: 'transparent',
  }));


function Header() {
    return (  
        <>
            <Box sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                alignContent: 'space-between',
                backgroundColor: '#FFFFFF'}}>
                <AppBar sx={{
                    backgroundColor: 'white'
                }}>
                    <Toolbar sx={{padding:'0 0.3rem', justifyContent:'space-between'}}>
                        <Box sx={{display:'flex', alignItems:'center'}}>
                            <Logo src="/img/icone.png"></Logo>
                            <Typography
                            variant="body2"
                            noWrap
                            component="div"
                            sx={{color:'black', padding:'0 0.3rem'}}
                            >
                                CoreNotes
                            </Typography>
                        </Box>
                        
                        <Search>
                            <SearchInputStyled placeholder="Pesquisar notas..."
                            sx={{margin:"0 1rem"}}
                            >
                            </SearchInputStyled>

                            <Button variant="text" sx={{width:'1rem'}}>
                                <SearchIcon sx={{backgroundColor: 'transparent', color:'darkgrey', height:'1.2rem'}}/>
                            </Button>
                            
                        </Search>

                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default Header;