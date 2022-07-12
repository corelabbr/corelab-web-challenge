interface IButton {
  onClick: () => void;
  text: string;
}

const Button = (props: IButton) => {
  return <button className='btn-add' onClick={props.onClick}>{props.text}</button>;
};

export default Button;
