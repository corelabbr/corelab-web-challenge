import './index.scss';

type title = {
	title: string;
}

export default function Title(title: title){
	return(
		<>
			<div className='row '>
				<p className='position-relative line-bottom fw-light fs-2'>{title.title}</p>
			</div>
		</>
	);
};