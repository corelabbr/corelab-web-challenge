import { PaintBucket, PencilSimple, Star, X } from '@phosphor-icons/react';
import { useState } from 'react';

import Colors from './Colors'
import pencilSimple from '../images/pencilSimple.png'
import paintBucket from '../images/paintBucket.png'
import star from '../images/star.png'
import yellowStar from '../images/yellowStar.png'

type noteProps = {
    title: string,
    description: string,
    color: string,
    star: boolean,
}

const Note = (props: noteProps) => {
    // Estado local para controlar a visibilidade da paleta de cores
    const [isColorsVisible, setColorsVisible] = useState(false);
    const [isYellowStar, setIsYellowStar] = useState(props.star);
    const [isEditable, setIsEditable] = useState(false);
    const handleClick = () => {
        setColorsVisible(!isColorsVisible);
    }
    const handleChangeIsEditable = () => {
        setIsEditable(!isEditable);
    }
    const handleChangeIsYellowStar = () => {
        setIsYellowStar(!isYellowStar);
    }
    return (
        <div className="flex flex-col mt-4">
            <div className={`${props.color} flex gap-4 text-black mt-2 rounded-[25px] w-[390px] h-[437px] flex-col shadow-md p-4`}>
                <div className="flex">
                    <div contentEditable={isEditable} className="outline-none flex-1 font-bold text-base text-black">
                        {props.title}
                    </div>
                    <button onClick={handleChangeIsYellowStar} className='transition duration-500 ease-in-out' >
                        {
                            isYellowStar
                                ? <img src={yellowStar} alt="yellowStar" />
                                : <img src={star} alt="star" />
                        }
                    </button>
                </div>
                <hr />
                <div contentEditable={isEditable} className=" outline-none w-full flex-1 text-zinc-400">
                    {props.description}
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex justify-between gap-3 items-center'>
                        <button onClick={handleChangeIsEditable} className={isEditable ? ' bg-[#FFE3B3] rounded-full p-2' : ''}>
                            <img src={pencilSimple} alt="pencilSimple" />
                        </button>
                        <button onClick={handleClick} className={isColorsVisible ? 'bg-[#FFE3B3] rounded-full p-3' : ''}>
                            <img src={paintBucket} alt="paintBucket" />
                        </button>
                    </div>
                    <div>
                        <button>
                            <X size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {isColorsVisible &&
                <Colors />
            }
        </div>
    );
}

export default Note;
