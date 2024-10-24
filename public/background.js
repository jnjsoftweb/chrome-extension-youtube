chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url && tab.url.includes("youtube.com/watch")) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["contentScript.js"],
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "download") {
    fetch(request.url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("다운로드 요청에 실패했습니다.");
        }
        return response.text();
      })
      .then((data) => {
        console.log("다운로드 성공:", data);
        sendResponse({ status: "success", message: "다운로드가 시작되었습니다." });
      })
      .catch((error) => {
        console.error("다운로드 오류:", error);
        sendResponse({ status: "error", message: error.toString() });
      });
    return true; // 비동기 응답을 위해 true 반환
  }
});
