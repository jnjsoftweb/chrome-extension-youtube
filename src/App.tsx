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
      // console.log(`http://localhost:3006/downloadYoutubeAll?videoIds=${videoId}`);

      if (videoId) {
        const downloadUrl = `http://localhost:3006/downloadYoutubeAll?videoIds=${videoId}`;
        fetch(downloadUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error("다운로드 요청에 실패했습니다.");
            }
            // 성공적으로 요청을 보냈을 때의 처리
            console.log("다운로드 요청을 보냈습니다.");
          })
          .catch((error) => {
            console.error("오류:", error);
          });
      } else {
        console.error("videoId를 찾을 수 없습니다.");
      }
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
