# 빌드 및 배포 가이드

## 자동 빌드 (GitHub Actions)

### 릴리즈 생성하기
1. 변경사항 커밋 후 버전 올리기:
   ```bash
   git add .
   git commit -m "feat: 변경 내용"
   npm version patch
   git push origin main --tags
   ```

2. GitHub Actions가 자동으로:
   - Windows, macOS, Linux 빌드
   - GitHub Releases에 업로드
   - 자동 업데이트 파일 생성 (`latest.yml` 등)

### 수동 빌드 트리거
- GitHub에서 Actions 탭 → "Build and Release" → "Run workflow"

## 로컬 빌드

### Windows
```bash
npm run build:win
```

### macOS
```bash
npm run build:mac
```

### Linux
```bash
npm run build:linux
```

### 모든 플랫폼
```bash
npm run build
```

## 아이콘 파일

`build/` 폴더에 다음 파일을 추가하세요:
- `icon.ico` - Windows (256x256)
- `icon.icns` - macOS (512x512)
- `icon.png` - Linux (512x512)

온라인 도구: https://www.icoconverter.com/

## 자동 업데이트

앱은 시작할 때마다 자동으로 업데이트를 확인합니다.
- 윈도우 로드 완료 후 GitHub Releases에서 최신 버전 확인
- 새 버전이 있으면 백그라운드에서 다운로드 (진행률 표시)
- 다운로드 완료 시 5초 카운트다운 후 자동 재시작하여 업데이트 적용

## 코드 서명 (선택)

Windows에서 SmartScreen 경고를 피하려면 코드 서명 인증서가 필요합니다.

### GitHub Secrets 설정
- `CSC_LINK` - 인증서 파일 (base64)
- `CSC_KEY_PASSWORD` - 인증서 비밀번호

## 버전 관리

변경사항을 커밋한 후 `npm version`으로 버전을 올리세요:
```bash
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
git push origin main --tags
```

`npm version`은 `package.json`의 `version` 필드를 업데이트하고 자동으로 태그가 포함된 커밋을 생성합니다.
