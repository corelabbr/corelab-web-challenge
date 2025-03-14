import { colorArray } from '../utils/data'

type ColorsProps = {
    onSelectColor: (color: string) => void
    onClose: () => void
}

const Colors = ({ onSelectColor, onClose }: ColorsProps) => {
    const handleColorClick = (color: string) => {
        onSelectColor(color)
        onClose()
    }

    return (
        <div className='absolute border-2 bg-white mt-32 xl:mt-24 2xl:mt-24 ms-5 lg:mt-24 py-1 px-1 rounded-[9px] shadow-lg items-center'>
            <div className='flex p-1 w-[270px] lg:w-[530px] xl:w-[530px] 2xl:w-[530px] flex-wrap gap-2'>
                {colorArray.map((color, index) => (
                    <button key={index} onClick={() => handleColorClick(color)}>
                        <div style={{ backgroundColor: color }} className='w-9 h-9 rounded-full' />
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Colors
