import Header from './components/Header';
import Conteiner from '@mui/material/Container';
import Holding from './components/Holding';

function App() {

    return (
        <Conteiner maxWidth='lg' sx={{
            backgroundColor:'#F0F2F5', 
            }}>

            <Header></Header>
            <Holding></Holding>
        
        </Conteiner>
    )
}

export default App;
