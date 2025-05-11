# ERC Homework Project

## 프로젝트 개요

이 프로젝트는 React Native와 Expo를 기반으로 한 모바일 애플리케이션입니다. TypeScript를 사용하여 타입 안정성을 보장하며, 현대적인 UI/UX를 제공합니다. 영어 학습을 위해 녹음, 읽기 숙제를 제출하고 학습을 도와주는 앱입니다.

## 기술 스택

- **React Native** (v0.79.2)
- **Expo** (v53.0.7)
- **TypeScript**
- **NativeWind** (TailwindCSS for React Native)
- **Expo Router**

### 주요 라이브러리

- **UI 컴포넌트**: `@gluestack-ui/*`
- **상태 관리**: `Zustand`
- **데이터 페칭**: `@tanstack/react-query`, `Firebase`
- **인증**: `Firebase Authentication`
- **스타일링**: `NativeWind`, `TailwindCSS`
- **애니메이션**: `@legendapp/motion`
- **날짜 처리**: `date-fns`

## 프로젝트 구조

├── app/ # 메인 애플리케이션 코드  
│ ├── auth/ # 인증 관련 코드  
│ ├── context/ # React Context  
│ ├── config/ # 설정 파일  
│ ├── utils/ # 유틸리티 함수  
│ └── (app)/ # 메인 앱 라우트  
├── components/ # 재사용 가능한 컴포넌트  
│ ├── record/ # 기록 관련 컴포넌트  
│ ├── reading/ # 읽기 관련 컴포넌트  
│ ├── home/ # 홈 화면 컴포넌트  
│ └── ui/ # 기본 UI 컴포넌트  
├── api/ # API 통신 관련 코드  
├── store/ # Zustand 스토어  
├── libs/ # 유틸리티 라이브러리  
└── constants/ # 상수 정의

## 주요 기능

1. 사용자 인증 (Firebase Authentication)
2. 녹음, 읽기 숙제 제출
3. 학습 기록 확인
4. 다크 모드 지원
5. 반응형 UI (NativeWind)
6. 모바일 최적화
7. 웹 지원 (React Native Web)

## 개발 환경

### 필수 도구

- Node.js
- Expo CLI
- iOS Simulator (macOS)
- Android Studio (Android 개발)

### 실행 방법

```bash
# 개발 서버 실행
npm start

# iOS 실행
npm run ios

# Android 실행
npm run android

# 웹 실행
npm run web
```

## 코드 품질 관리

- TypeScript를 통한 타입 체크
- Prettier를 통한 코드 포맷팅
- ESLint를 통한 코드 린팅
- Jest를 통한 테스트

## 배포

- EAS (Expo Application Services)를 통한 배포
- iOS App Store 및 Google Play Store 배포 지원

## 보안

- Firebase Authentication을 통한 안전한 사용자 인증
- 환경 변수를 통한 민감한 정보 관리
- API 키 보안 관리

## 성능 최적화

- React Query를 통한 효율적인 데이터 캐싱
- NativeWind를 통한 최적화된 스타일링
- 이미지 최적화
- 코드 스플리팅

## 유지보수

- 모듈화된 컴포넌트 구조
- 명확한 디렉토리 구조
- TypeScript를 통한 코드 문서화
- 테스트 코드 작성
