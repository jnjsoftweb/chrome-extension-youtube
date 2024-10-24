import React, { useState } from "react";
import Button from "./components/ui/button";
import "./App.css";

interface TabInfo {
  url: string;
  title: string;
}

function App() {
  const [info, setInfo] = useState<TabInfo>({ url: "", title: "" });

  const getCurrentTabInfo = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      setInfo({ url: tab.url || "", title: tab.title || "" });
    });
  };

  return (
    <div className="app-container">
      <Button onClick={getCurrentTabInfo} className="red-btn">
        여기는??
      </Button>
      <p className="info-text">URL: {info.url}</p>
      <p className="info-text">Title: {info.title}</p>
    </div>
  );
}

export default App;
