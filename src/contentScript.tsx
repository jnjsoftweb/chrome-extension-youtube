export {};

const addDownloadButton = () => {
  if (document.querySelector(".download-button")) return;

  const rightControls = document.querySelector(".ytp-right-controls");
  if (!rightControls) return;

  const downloadButton = document.createElement("button");
  downloadButton.className = "ytp-button download-button";
  downloadButton.innerHTML = "⬇️";
  downloadButton.title = "다운로드";
  downloadButton.style.cssText = `
    font-size: 24px;
    line-height: 36px;
    width: 36px;
    height: 36px;
    opacity: 0.9;
    vertical-align: top;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
  `;

  downloadButton.addEventListener("click", handleDownload);

  // 오토플레이 버튼 찾기
  const autoplayButton = rightControls.querySelector('[data-tooltip-target-id="ytp-autonav-toggle-button"]');
  if (autoplayButton) {
    // 오토플레이 버튼 앞에 다운로드 버튼 삽입
    rightControls.insertBefore(downloadButton, autoplayButton);
  } else {
    // 오토플레이 버튼이 없으면 rightControls의 첫 번째 자식으로 삽입
    rightControls.insertBefore(downloadButton, rightControls.firstChild);
  }

  console.log("다운로드 버튼이 추가되었습니다.");
};

const handleDownload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get("v");
  const playlistId = urlParams.get("list");

  let downloadUrl: string;

  if (playlistId) {
    downloadUrl = `http://localhost:3006/downloadPlaylist?playlistId=${playlistId}`;
  } else if (videoId) {
    downloadUrl = `http://localhost:3006/downloadYoutubeAll?videoIds=${videoId}`;
  } else {
    console.error("videoId 또는 playlistId를 찾을 수 없습니다.");
    return;
  }

  console.log("다운로드 URL:", downloadUrl);

  // 백그라운드 스크립트에 메시지 전송
  chrome.runtime.sendMessage({ action: "download", url: downloadUrl }, function (response) {
    console.log("다운로드 요청 응답:", response);
  });
};

// 페이지 로드 시 버튼 추가 시도
addDownloadButton();

// YouTube의 동적 로딩을 고려하여 주기적으로 버튼 추가 시도
const intervalId = setInterval(() => {
  if (document.querySelector(".download-button")) {
    clearInterval(intervalId);
  } else {
    addDownloadButton();
  }
}, 1000);

console.log("콘텐츠 스크립트가 로드되었습니다.");
