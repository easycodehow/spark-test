
# 프로젝트 작업 규칙

## 기본 원칙
- 내가 "시작" 또는 "진행"이라고 명시적으로 말하기 전까지는 어떤 작업도 시작하지 말것
- 작업 전 항상 계획을 먼저 설명하고 승인을 받을것
- 파일 수정 시 변경 내용을 먼저 요약할 것

----------------

# Vanilla JS + PWA 메모장 앱 개발 가이드

## 프로젝트 정보
- **프로젝트명**: spark-ex
- **앱 이름**: SPARK
- **설명**: PWA 기반 오프라인 메모장 애플리케이션

## 기술 스택
- Frontend: HTML5, CSS3, Vanilla JavaScript
- PWA: Service Worker, Web App Manifest
- Database: Supabase
- Storage: LocalStorage (오프라인), Supabase (동기화)
- 배포: Vercel
- 버전관리: GitHub


# 코딩 규칙
## HTML
- 시맨틱 태그 우선 사용 (header, nav, main, article, section, footer)
- 주석은 한국어로 작성
- 들여쓰기는 2칸

## CSS
- 클래스명은 명확한 의미 전달
- Vanilla CSS 사용 (프레임워크 사용 금지)
- 주석으로 섹션 구분

## JavaScript
- ES6+ 문법 사용
- 가독성을 위해 함수는 작게 분리
- 주석은 한국어로 작성


## 프로젝트 구조
```
spark/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── sw-register.js
├── sw.js (Service Worker)
├── manifest.json
└── icons/
```

## 개발 단계별 체크리스트

##  전체 진행 상황
- [ ] 1단계: 프로젝트 기본 설정
- [ ] 2단계: 메모장 기본 기능
- [ ] 3단계: PWA 기능 추가
- [ ] 4단계: Supabase 연동
- [ ] 5단계: 배포 및 테스트


---

## 1. 프로젝트 기본 설정

### 파일 구조 만들기
- [x] 프로젝트 폴더 생성 (`spark-memo-app`)
- [x] `index.html` 파일 생성
- [x] `css/style.css` 파일 생성
- [x] `js/app.js` 파일 생성
- [x] `manifest.json` 파일 생성
- [x] `icons` 폴더
  - [x] icon-192x192.png (필수)
  - [x] icon-512x512.png (필수)

### Git 설정
- [ ] GitHub 저장소 생성
- [x] `.gitignore` 파일 생성
- [ ] 첫 커밋 완료


## 2. 메모장 기본 기능

### 화면 레이아웃
- [ ] 메모 입력 영역(textarea) 추가
- [ ] 메모 목록 표시 영역 추가
- [ ] 새 메모 추가 버튼
- [ ] 삭제 버튼
- [ ] 기본 스타일링 (CSS)

** Claude Code가 하는 일**:
- HTML 요소들을 배치합니다
- 보기 좋은 디자인 CSS를 작성합니다

### 메모 저장/불러오기
- [ ] 메모를 LocalStorage에 저장하는 기능
- [ ] 저장된 메모를 불러오는 기능
- [ ] 메모 추가 버튼 클릭 시 새 메모 생성
- [ ] 각 메모마다 고유 ID 부여

** Claude Code가 하는 일**:
- JavaScript로 저장/불러오기 코드를 작성합니다
- 브라우저를 닫아도 메모가 사라지지 않게 합니다

### CRUD 기능 완성
- [ ] **C**reate: 새 메모 추가
- [ ] **R**ead: 메모 목록 보기
- [ ] **U**pdate: 메모 수정
- [ ] **D**elete: 메모 삭제

** Claude Code가 하는 일**:
- 각 기능의 JavaScript 함수를 만듭니다
- 버튼 클릭 시 작동하도록 연결합니다

---

## 3️PWA 기능 추가 (1.5시간)

### Web App Manifest
- [ ] `manifest.json` 작성
  - [ ] 앱 이름: SPARK
  - [ ] 아이콘 경로 설정
  - [ ] 테마 색상 지정
  - [ ] 시작 URL 설정
- [ ] `index.html`에 manifest 연결

** Claude Code가 하는 일**:
- manifest.json 파일을 자동으로 작성합니다
- 홈 화면에 추가했을 때 앱처럼 보이게 설정합니다

### Service Worker 설정
- [x] `sw.js` 파일 생성
- [ ] 캐시할 파일 목록 정의
- [ ] 오프라인에서 캐시된 파일 제공
- [x] `js/sw-register.js` 생성 (Service Worker 등록)

** Claude Code가 하는 일**:
- Service Worker 코드를 작성합니다
- 인터넷 없이도 앱이 작동하도록 만듭니다
- 브라우저에 Service Worker를 등록하는 코드를 추가합니다

### 오프라인 동작 테스트
- [ ] 브라우저에서 앱 실행
- [ ] 개발자 도구 → Application → Service Workers 확인
- [ ] 오프라인 모드로 전환
- [ ] 메모 추가/수정/삭제 테스트

** Claude Code가 하는 일**:
- 테스트 방법을 안내합니다
- 오류가 있으면 수정합니다

---

## 4️추가 기능 (1시간)

### 다크모드
- [ ] 다크모드 토글 버튼 추가
- [ ] CSS 변수로 색상 테마 관리
- [ ] 사용자 선택 LocalStorage에 저장
- [ ] 페이지 로드 시 이전 설정 적용

** Claude Code가 하는 일**:
- 밝은 테마/어두운 테마 CSS를 작성합니다
- 토글 버튼 클릭 시 테마 전환 기능을 만듭니다

### 공유 기능
- [ ] 공유 버튼 추가
- [ ] Web Share API 사용
- [ ] 메모 내용 공유 기능

**🤖 Claude Code가 하는 일**:
- 카카오톡, 메시지 등으로 메모를 공유할 수 있게 합니다

### 클립보드 복사
- [ ] 복사 버튼 추가
- [ ] 클립보드 API로 메모 복사
- [ ] 복사 완료 알림 표시

** Claude Code가 하는 일**:
- 버튼 클릭으로 메모를 복사할 수 있게 합니다
- "복사 완료!" 메시지를 보여줍니다

---

## 5️Supabase 연동 (선택사항, 1시간)

### Supabase 프로젝트 설정
- [ ] Supabase 프로젝트 생성
- [ ] `memos` 테이블 생성
  - [ ] id (UUID)
  - [ ] content (Text)
  - [ ] created_at (Timestamp)
  - [ ] user_id (UUID, 선택)
- [ ] API 키 확인

** Claude Code가 하는 일**:
- Supabase 테이블 생성 SQL을 제공합니다

### 데이터 동기화
- [ ] Supabase 클라이언트 설치
- [ ] 메모 저장 시 Supabase에도 저장
- [ ] 앱 로드 시 Supabase에서 메모 불러오기
- [ ] LocalStorage와 Supabase 동기화 로직

** Claude Code가 하는 일**:
- Supabase 연결 코드를 작성합니다
- 로컬과 클라우드에 모두 저장되게 합니다
- 인터넷 연결 시 자동 동기화되게 만듭니다

---

## 6️ 배포 및 테스트 (30분)

### Vercel 배포
- [ ] GitHub 저장소에 최종 코드 푸시
- [ ] Vercel 프로젝트 생성
- [ ] GitHub 저장소 연결
- [ ] 배포 완료
- [ ] 배포 URL 확인

** Claude Code가 하는 일**:
- Vercel 배포 설정 파일을 만듭니다
- 배포 과정을 안내합니다

### PWA 설치 테스트
- [ ] 모바일 브라우저에서 접속
- [ ] "홈 화면에 추가" 테스트
- [ ] 앱 아이콘 확인
- [ ] 오프라인 모드 테스트
- [ ] 모든 기능 정상 작동 확인

**Claude Code가 하는 일**:
- 테스트 체크리스트를 제공합니다
- 문제 발견 시 수정 방법을 안내합니다

---

## ✅ 최종 확인사항

### 기능 점검
- [ ] 메모 추가 작동
- [ ] 메모 수정 작동
- [ ] 메모 삭제 작동
- [ ] 오프라인에서도 작동
- [ ] 다크모드 전환 작동
- [ ] 공유 기능 작동 (모바일)
- [ ] 클립보드 복사 작동

### 코드 품질
- [ ] 콘솔 에러 없음
- [ ] 주석 작성 완료
- [ ] 코드 정리 완료
- [ ] README.md 작성

### 배포 확인
- [ ] Vercel 배포 성공
- [ ] HTTPS 접속 가능
- [ ] 모바일에서 정상 작동
- [ ] PWA 설치 가능

