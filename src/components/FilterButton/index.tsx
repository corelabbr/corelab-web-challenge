import React from "react";

// TODO: remove style
// TODO: types

const FilterButton = (props: any) => {
  return (
    <button
      style={{
        background: "none",
        color: "inherit",
        border: "none",
        padding: 0,
        font: "inherit",
        cursor: "pointer",
        outline: "inherit",
      }}
      onClick={props.onClick}
    >
      <img src='./assets/config.svg' alt='configurações' style={{ width: "54px", height: "39px" }} />
    </button>
  );
};

export default FilterButton;
