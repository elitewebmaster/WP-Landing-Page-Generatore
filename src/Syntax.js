import { useContext } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { GeneratorContext } from "./GeneratorContext";
import Clipboard from "./Clipboard";
import { exportFunctions } from "./Functions";
import { exportAjax } from "./Ajax";
import { exportPageTemplate } from "./PageTemplate";
import { exportAdminMenu } from "./AdminMenu";

const Syntax = ({ page }) => {
  const { generator } = useContext(GeneratorContext);
  let code = null,
    language = "php";

  switch (page) {
    case "ajax":
      code = exportAjax();
      language = "javascript";
      break;
    case "template":
      code = exportPageTemplate(generator);
      break;
    case "functions":
      code = exportFunctions(generator);
      break;
    case "admin":
    default:
      code = exportAdminMenu(generator);
  }

  return (
    <div className="position-relative">
      <Clipboard text={code} />
      <SyntaxHighlighter
        language={language}
        style={a11yDark}
        className="rounded-3 mb-5"
      >
        {code};
      </SyntaxHighlighter>
    </div>
  );
};

export default Syntax;
