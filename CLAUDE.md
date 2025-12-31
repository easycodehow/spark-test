
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
- Storage: LocalStorage (메모 저장)
- Backup: JSON 파일 내보내기/가져오기
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
- [x] 1단계: 프로젝트 기본 설정
- [x] 2단계: 메모장 기본 기능
- [x] 3단계: PWA 기능 추가
- [x] 4단계: 백업 관리 기능
- [x] 5단계: 추가 기능
- [x] 6단계: 배포 및 테스트


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
- [x] GitHub 저장소 생성 
- [x] `.gitignore` 파일 생성
- [x] 첫 커밋 완료
- [x] 원격 저장소 연결 완료


## 2. 메모장 기본 기능

### 화면 레이아웃
- [x] 메모 입력 영역 추가
- [x] 메모 목록 목록 보기 추가
- [x] 메모 저장하기
- [x] 삭제 버튼 (메모 보기 화면)
- [x] 기본 스타일링 (CSS)
- [x] 중요 메모 기능 UI (별 버튼, 필터 토글)
- [x] 검색 기능 UI (검색 입력창)
- [x] 아이콘들
- [x] 메모 보기 화면 높이 자동 조절 (내용에 따라 동적 조절)
- [x] 작성일 박스 하단 배치
- [x] 액션 버튼 아이콘화 및 박스 내 배치 (✏️📤📋🗑️)
- [x] 구분선 위치 조정 (날짜와 버튼 사이)


### 메모 저장/불러오기
- [x] 메모를 LocalStorage에 저장(브라우저를 닫아도 메모가 사라지지 않게 하는 기능)
- [x] 저장된 메모를 불러오는 기능
- [x] 메모 추가 버튼 클릭 시 새 메모 생성
- [x] 각 메모마다 고유 ID 부여


### CRUD 기능 완성
- [x] **C**reate: 새 메모 추가
- [x] **R**ead: 메모 목록 보기
- [x] **U**pdate: 메모 수정
- [x] **D**elete: 메모 삭제

---

## 3️PWA 기능 추가 (1.5시간)

### Web App Manifest
- [x] `manifest.json` 작성
  - [x] 앱 이름: SPARK
  - [x] 아이콘 경로 설정
  - [x] 테마 색상 지정
  - [x] 시작 URL 설정
- [x] `index.html`에 manifest 연결

** Claude Code가 하는 일**:
- manifest.json 파일을 자동으로 작성합니다
- 홈 화면에 추가했을 때 앱처럼 보이게 설정합니다

### Service Worker 설정
- [x] `sw.js` 파일 생성
- [x] 캐시할 파일 목록 정의
- [x] 오프라인에서 캐시된 파일 제공
- [x] `js/sw-register.js` 생성 (Service Worker 등록)

** Claude Code가 하는 일**:
- Service Worker 코드를 작성합니다
- 인터넷 없이도 앱이 작동하도록 만듭니다
- 브라우저에 Service Worker를 등록하는 코드를 추가합니다

### 오프라인 동작 테스트
- [x] 브라우저에서 앱 실행
- [x] 개발자 도구 → Application → Service Workers 확인
- [x] Service Worker "activated and is running" 확인
- [x] 오프라인 모드로 전환 (Network 탭 → Offline 체크)
- [x] 페이지 새로고침 후 앱 정상 작동 확인
- [x] 오프라인에서 메모 추가 테스트
- [x] 오프라인에서 메모 수정 테스트
- [x] 오프라인에서 메모 삭제 테스트
- [x] 온라인 복구 후 데이터 유지 확인

** Claude Code가 하는 일**:
- 테스트 방법을 안내합니다
- 오류가 있으면 수정합니다

---

## 4️ 백업 관리 기능 (30분)

### 메모 내보내기 (Export)
- [x] 내보내기 버튼 추가 (헤더)
- [x] LocalStorage 메모를 JSON으로 변환
- [x] JSON 파일 다운로드 기능
- [x] 파일명에 날짜 포함 (예: spark-backup-2025-12-30.json)

** Claude Code가 하는 일**:
- File Download API를 사용하여 JSON 파일 생성
- 모든 메모 데이터를 백업 파일로 저장

### 메모 가져오기 (Import)
- [x] 가져오기 버튼 추가 (헤더)
- [x] 파일 선택 기능 (input file)
- [x] JSON 파일 읽기
- [x] LocalStorage에 메모 복원
- [x] 기존 메모와 병합 옵션

** Claude Code가 하는 일**:
- File Reader API를 사용하여 JSON 파일 읽기
- 백업 파일에서 메모 데이터 복원
- 중복 메모 처리 로직 구현

### 백업 관리
- [x] 백업 성공/실패 알림
- [x] 복원 전 확인 메시지
- [x] 잘못된 파일 형식 검증

** Claude Code가 하는 일**:
- 사용자 친화적인 백업/복원 UI 제공
- 에러 처리 및 검증 로직 구현

---

## 5️ 추가 기능 (1.5시간)

### 이미지 첨부
- [x] 갤러리에서 이미지 선택 기능
- [x] 카메라로 사진 촬영 기능
- [x] 이미지 미리보기
- [x] LocalStorage에 이미지 저장 (Base64)
- [x] 메모에 이미지 표시
- [x] 이미지 삭제 기능

** Claude Code가 하는 일**:
- File API를 사용한 이미지 선택 기능 구현
- IndexedDB를 사용하여 로컬에 이미지 저장
- 이미지 미리보기 UI 작성
- Base64 인코딩으로 이미지 데이터 관리

### 다크모드
- [x] 다크모드 토글 버튼 추가
- [x] CSS 변수로 색상 테마 관리
- [x] 사용자 선택 LocalStorage에 저장
- [x] 페이지 로드 시 이전 설정 적용

** Claude Code가 하는 일**:
- 밝은 테마/어두운 테마 CSS를 작성합니다
- 토글 버튼 클릭 시 테마 전환 기능을 만듭니다

### 공유 기능
- [x] 공유 버튼 추가
- [x] Web Share API 사용
- [x] 메모 내용 공유 기능

**🤖 Claude Code가 하는 일**:
- 카카오톡, 메시지 등으로 메모를 공유할 수 있게 합니다

### 클립보드 복사
- [x] 복사 버튼 추가
- [x] 클립보드 API로 메모 복사
- [x] 복사 완료 알림 표시

** Claude Code가 하는 일**:
- 버튼 클릭으로 메모를 복사할 수 있게 합니다
- "복사 완료!" 메시지를 보여줍니다

---

## 6️ 배포 및 테스트 (30분)

### Vercel 배포
- [x] GitHub 저장소에 최종 코드 푸시
- [x] Vercel 프로젝트 생성
- [x] GitHub 저장소 연결
- [x] 배포 완료
- [x] 배포 URL 확인

** Claude Code가 하는 일**:
- Vercel 배포 설정 파일을 만듭니다
- 배포 과정을 안내합니다

### PWA 설치 테스트
- [x] 모바일 브라우저에서 접속
- [x] "홈 화면에 추가" 테스트
- [x] 앱 아이콘 확인
- [x] 설치 후 CRUD 기능 테스트 (메모 추가/수정/삭제)
- [x] 오프라인 모드 테스트
- [x] 모든 기능 정상 작동 확인

**Claude Code가 하는 일**:
- 테스트 체크리스트를 제공합니다
- 문제 발견 시 수정 방법을 안내합니다

---

## ✅ 최종 확인사항

### 기능 점검
- [x] 메모 추가 작동
- [x] 메모 수정 작동
- [x] 메모 삭제 작동
- [x] 오프라인에서도 작동
- [x] 메모 백업/복원 작동
- [x] 다크모드 전환 작동
- [x] 공유 기능 작동 (모바일)
- [x] 클립보드 복사 작동

### 코드 품질
- [ ] 콘솔 에러 없음
- [ ] 주석 작성 완료
- [ ] 코드 정리 완료
- [ ] README.md 작성

### 배포 확인
- [x] Vercel 배포 성공
- [x] HTTPS 접속 가능
- [x] 모바일에서 정상 작동
- [x] PWA 설치 가능

---

## 📋 향후 개선 사항

### UI/UX 개선
- [ ] **Floating Action Button 구현** (우선순위: 중)
  - 키보드가 올라와도 버튼이 보이도록 개선
  - Visual Viewport API 활용
  - NoteIn 앱과 동일한 UX

### 코드 품질
- [ ] 콘솔 에러 체크 및 수정
- [ ] 주석 정리 및 보완
- [ ] 코드 리팩토링
- [ ] README.md 작성

