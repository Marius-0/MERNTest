import React from "react";
import "./dropDown.scss";

export const MenuItem = ({
  isDivider = false,
  title,
  style,
  operation,
  link
}) => {
  return (
    <>
      {isDivider ? (
        <hr className="divider" />
      ) : (
        <div onClick={operation} style={style}>
          {title}
        </div>
      )}
    </>
  );
};

export default function DropDownMenu(props) {
  const dropDownList = React.createRef(null);
  const [isDown, setIsDown] = React.useState(false);

  const handleClickBtn = (event) => {
    setIsDown(true);
    dropDownList.current.classList.add("show");
  };

  const hideDropDown = React.useCallback(() => {
    if (isDown) {
      dropDownList.current.classList.remove("show");
      setIsDown(false);
    }
  }, [dropDownList, isDown]);

  React.useEffect(() => {
    window.addEventListener("mouseup", hideDropDown);
    return () => {
      window.removeEventListener("mouseup", hideDropDown);
    };
  }, [hideDropDown]);

  const btnStyle = {
    width: props.dimension ?? "100%",
    height: props.dimension ?? "100%"
  };

  return (
    <div className="dropdown">
      <button
        style={btnStyle}
        onClick={handleClickBtn}
        className="dropbtn newStyle"
      >
        • • •
      </button>
      <div ref={dropDownList} className="dropdown-content">
        {props.children}
      </div>
    </div>
  );
}
