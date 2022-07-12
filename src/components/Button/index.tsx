

interface IButton {
  onClick: () => void
  text: string
  type: any
}

const Button = (props: IButton) => {
  return <button onClick={props.onClick} type={props.type}>{props.text}</button>;
};

export default Button;
