# 빌드 및 배포 가이드

## 자동 빌드 (GitHub Actions)

### 릴리즈 생성하기
1. 버전 태그 생성:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. GitHub Actions가 자동으로:
   - Windows, macOS, Linux 빌드
   - GitHub Releases에 업로드
   - 자동 업데이트 파일 생성

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
- GitHub Releases에서 최신 버전 확인
- 새 버전이 있으면 백그라운드에서 다운로드
- 다음 실행 시 자동 업데이트

## 코드 서명 (선택)

Windows에서 SmartScreen 경고를 피하려면 코드 서명 인증서가 필요합니다.

### GitHub Secrets 설정
- `CSC_LINK` - 인증서 파일 (base64)
- `CSC_KEY_PASSWORD` - 인증서 비밀번호

## 버전 관리

`package.json`의 `version` 필드를 업데이트하고 태그를 생성하세요:
```bash
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
git push origin main --tags
```
