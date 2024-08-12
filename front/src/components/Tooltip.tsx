const Tooltip = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="position-relative error-icon-wrapper">
      {children}
      <span className="tooltip">{text}</span>
    </div>
  );
};

export default Tooltip;
