import { Box, Dialog, styled, Stack, IconButton, useMediaQuery } from "@mui/material";

export interface ColorProps{
    open: boolean;
    selectedValue: number;
    onClose: (value: number) => void;
    cores: any[];
}

const CoresSpan = styled(Box)(() => ({
    width: '30px',
    height: '30px',
    borderRadius: '100%',

}));

const ItemCor = styled(IconButton)(() => ({
    padding: '2px',
    ':hover': {
        border: '-1px solid gray',
    },
}))


function Color(props: ColorProps) {
    
    const {onClose, selectedValue, open, cores} = props;

    const responsiveCores = useMediaQuery('(max-width:600px)');

    const handleCLose = () => {
        onClose(selectedValue);
        
    }

    const handleListItemClick = (value: any) => {
        onClose(value);
    }

    return (
        <Dialog onClose={handleCLose} open={open} >
            <Stack  
                direction='row' useFlexGap flexWrap='wrap'
                sx={{ display:'flex', alignItems:'center',
                justifyContent:'space-around',
                width: `${responsiveCores ? '210px' : '450px'}` }}>
                
                {cores.map((item)=> {
                    return <ItemCor 
                        key={item.cor} onClick={() => handleListItemClick(item)} >
                            <CoresSpan sx={{backgroundColor: item.cor}}/>
                    </ItemCor>
                })}
            </Stack>
        </Dialog>
    )
}

export default Color;