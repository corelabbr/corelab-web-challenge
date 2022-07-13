import { ButtonHTMLAttributes } from 'react';
import './index.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function BtnRounded(props: ButtonProps){
	return(
		<>
			<button className='button-rounded mx-3' {...props} />
		</>
	);
};