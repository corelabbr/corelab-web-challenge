const Divider = ({ color }: { color?: string }) => (
  <hr
    style={{
      width: "100%",
      border: "none",
      borderTop: `2px solid ${color || "#d9d9d9"}`,
      margin: 0,
    }}
  />
);

export default Divider;
