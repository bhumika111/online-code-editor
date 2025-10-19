import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";
import { displayNames } from "../constants/displayNames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faRedoAlt
} from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);

export default function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");

  const [srcDoc, setSrcDoc] = useState("");
  const [openEditors, setOpenEditors] = useState({
    html: true,
    css: true,
    js: true
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      const src = `
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `;
      setSrcDoc(src);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const toggleEditor = (language) => {
    setOpenEditors(prev => ({
      ...prev,
      [language]: !prev[language]
    }));
  };

  const clearAll = () => {
    setHtml("");
    setCss("");
    setJs("");
  };

  return (
    <>
      <div className="pane top-pane">
        <div className="top-header">
          <h1>Online Code Editor</h1>
          <button className="clear-all-btn" title="Clear all code" onClick={clearAll}>
            <FontAwesomeIcon icon={faRedoAlt} /> Refresh
          </button>
        </div>

        <Editor
          language="html"
          displayName={displayNames.html}
          value={html}
          onChange={setHtml}
          open={openEditors.html}
          onExpandCollapse={() => toggleEditor("html")}
        />

        <Editor
          language="css"
          displayName={displayNames.css}
          value={css}
          onChange={setCss}
          open={openEditors.css}
          onExpandCollapse={() => toggleEditor("css")}
        />

        <Editor
          language="js"
          displayName={displayNames.js}
          value={js}
          onChange={setJs}
          open={openEditors.js}
          onExpandCollapse={() => toggleEditor("js")}
        />
      </div>

      <div className="pane bottom-pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}
