interface IButton {
  onClick: () => void;
  text: string;
}

const Button = ({ onClick, text }: IButton) => (
  <button type="button" onClick={onClick}>
    {text}
  </button>
);
export default Button;
