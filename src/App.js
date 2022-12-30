import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import GeneratorForm from "./GeneratorForm";
import PageTemplate from "./PageTemplate";
import Ajax from "./Ajax";
import Functions from "./Functions";
import AdminMenu from "./AdminMenu";
import Download from "./Download";
import { GeneratorContext } from "./GeneratorContext";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [generator, setGenerator] = useState(null);

  return (
    <GeneratorContext.Provider value={{ generator, setGenerator }}>
      <div className="App h-100 d-flex flex-column">
        <header className="App-header d-flex align-items-center justify-content-center text-white bg-dark mb-5">
          <h1 className="h3 lh-lg">WP Landing Page Generator</h1>
        </header>
        <main className="flex-grow-1">
          <GeneratorForm />

          {generator && (
            <>
              <hr />
              <div className="code-wrap m-5">
                <Tabs defaultActiveKey="download" className="mb-3">
                  <Tab eventKey="download" title="Download">
                    <Download />
                  </Tab>
                  <Tab eventKey="manually" title="Insert Manually">
                    <PageTemplate />
                    <Ajax />
                    <Functions />
                    <AdminMenu />
                    <p>
                      Now create a new page in wordpress and select '
                      {generator.templateName}' as it's template. Done &#128522;
                    </p>
                  </Tab>
                </Tabs>
              </div>
            </>
          )}
        </main>
        <footer className="text-center">
          ©{new Date().getFullYear().toString()} Created by{" "}
          <a href="https://www.EliteWebmaster.com">EliteWebmaster</a>
        </footer>
      </div>
    </GeneratorContext.Provider>
  );
}

export default App;
