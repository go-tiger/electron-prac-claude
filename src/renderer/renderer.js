// 버전 정보 표시
const versionInfo = document.getElementById('version-info');
window.launcher.getVersions().then(versions => {
  versionInfo.textContent = `v${versions.app}`;
});

// 업데이트 상태 표시
const updateStatus = document.getElementById('update-status');
window.launcher.onUpdateStatus(text => {
  updateStatus.textContent = text;
  console.log('업데이트:', text);
});

// 게임 시작 버튼
const launchButton = document.querySelector('.launch-button');
launchButton.addEventListener('click', () => {
  alert('게임 시작 기능은 아직 구현되지 않았습니다.');
});
