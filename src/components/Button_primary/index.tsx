import { ButtonHTMLAttributes } from 'react';
import './index.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function BtnPrimary(props: ButtonProps){
	return(
		<>
			<button className="button" { ...props} />
		</>
	);
};