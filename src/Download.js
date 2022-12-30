import { useContext } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Button } from "react-bootstrap";
import { GeneratorContext } from "./GeneratorContext";
import { exportAdminMenu } from "./AdminMenu";
import { exportAjax } from "./Ajax";
import { exportFunctions } from "./Functions";
import { exportPageTemplate } from "./PageTemplate";

const Download = () => {
  const { generator } = useContext(GeneratorContext);

  const downloadTemplate = () => {
    const zip = new JSZip();

    zip.file("landing_page_template.php", exportPageTemplate(generator));
    zip.file("ajax.js", exportAjax(generator));
    zip.file("functions.php", exportFunctions(generator));

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "template.zip");
    });
  };

  const downloadPlugin = () => {
    const zip = new JSZip();

    zip.file("plugin.php", exportAdminMenu(generator));

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "plugin.zip");
    });
  };

  return (
    <>
      <ol>
        <li>
          Download template.zip and extract, then copy the files to your
          template folder.{" "}
          <Button variant="primary" onClick={downloadTemplate}>
            Download template.zip
          </Button>
        </li>
        <li>
          Create a new page in WordPress Admin and choose '
          {generator.templateName}' as it's template.
        </li>
        <li>
          Download plugin.zip and upload as a plugin in WordPress Admin (Plugins
          -&gt; Add New -&gt; Upload Plugin).{" "}
          <Button variant="primary" onClick={downloadPlugin}>
            Download plugin.zip
          </Button>
        </li>
        <li>Activate the plugin.</li>
        <li>Go to Leads Tab in WordPress Admin.</li>
        <li>Done &#128522;</li>
      </ol>
    </>
  );
};

export default Download;
