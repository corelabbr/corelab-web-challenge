interface IButton {
  onClick: () => void;
  text: string;
}

const Button = (props: IButton) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

export default Button;
