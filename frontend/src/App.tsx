import Header from './components/Header';
import Conteiner from '@mui/material/Container';
import Holding from './components/Holding';
import Box from '@mui/material/Box';

function App() {

    return (
        <Box>
            <Header></Header>
            <Conteiner maxWidth='lg' sx={{
                    display:'flex', justifyContent:'center', 
                    width:'100lvw', marginTop:'5rem',
                    flexDirection:'column',
                }}>
                <Holding></Holding>
        
            </Conteiner>
        </Box>
        
    )
}

export default App;
