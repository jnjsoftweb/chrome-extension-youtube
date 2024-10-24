import React, { useEffect, useState } from "react";
import Button from "./components/ui/button";
import "./App.css";

interface TabInfo {
  url: string;
  title: string;
}

function App() {
  const [info, setInfo] = useState<TabInfo>({ url: "", title: "" });

  useEffect(() => {
    getCurrentTabInfo();
  }, []);

  const getCurrentTabInfo = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      setInfo({ url: tab.url || "", title: tab.title || "" });
    });
  };

  const handleDownload = () => {
    if (info.url.includes("youtube.com")) {
      const urlParams = new URLSearchParams(new URL(info.url).search);
      const videoId = urlParams.get("v");
      const playlistId = urlParams.get("list");

      let downloadUrl: string;
      console.log(playlistId, videoId);

      if (playlistId) {
        downloadUrl = `http://localhost:3006/downloadPlaylist?playlistId=${playlistId}`;
      } else if (videoId) {
        downloadUrl = `http://localhost:3006/downloadYoutubeAll?videoIds=${videoId}`;
      } else {
        console.error("videoId 또는 playlistId를 찾을 수 없습니다.");
        return;
      }

      fetch(downloadUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("다운로드 요청에 실패했습니다.");
          }
          console.log("다운로드 요청을 보냈습니다.");
        })
        .catch((error) => {
          console.error("오류:", error);
        });
    } else {
      console.log("YouTube URL이 아닙니다.");
    }
  };

  return (
    <div className="app-container">
      <Button onClick={handleDownload} className="red-btn">
        download
      </Button>
      <p className="info-text">URL: {info.url}</p>
      <p className="info-text">Title: {info.title}</p>
    </div>
  );
}

export default App;
