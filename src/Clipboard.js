import { useState, useRef, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CopySVG from "./images/clipboard_copy.svg";
import ClickedSVG from "./images/clipboard_clicked.svg";

const Clipboard = ({ text }) => {
  const [clicked, setClicked] = useState(false);
  const timerRef = useRef(null);
  const clipboardImage = clicked ? ClickedSVG : CopySVG;

  const handleClick = () => {
    setClicked(true);

    timerRef.current = setTimeout(() => {
      setClicked(false);
    }, 1000);
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <CopyToClipboard text={text}>
      <img
        src={clipboardImage}
        alt="Copy to Clipboard"
        onClick={handleClick}
        className="position-absolute top-0 end-0 m-1"
        role="button"
      />
    </CopyToClipboard>
  );
};

export default Clipboard;
