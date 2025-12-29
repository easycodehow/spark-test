// ==========================================
// SPARK 메모장 앱 - JavaScript
// ==========================================

// ==========================================
// 전역 변수
// ==========================================
let memosArray = []; // 메모 배열
let currentFilter = 'all'; // 현재 필터 상태 (기본: 전체)
let isImportantMode = false; // 중요 메모 모드
let currentMemoId = null; // 현재 보고 있는 메모 ID
let isEditMode = false; // 수정 모드 여부

// ==========================================
// DOM 요소
// ==========================================
const memoInput = document.getElementById('memo-input');
const saveBtn = document.getElementById('save-btn');
const importantBtn = document.getElementById('important-btn');
const memoList = document.getElementById('memo-list');
const searchInput = document.getElementById('search-input');
const filterToggle = document.getElementById('filter-toggle');

// 메모 보기 화면 요소
const mainView = document.getElementById('main-view');
const memoView = document.getElementById('memo-view');
const backBtn = document.getElementById('back-btn');
const memoContent = document.getElementById('memo-content');
const memoContentDate = document.getElementById('memo-content-date');
const editBtn = document.getElementById('edit-btn');
const shareBtn = document.getElementById('share-btn');
const copyBtn = document.getElementById('copy-btn');
const deleteBtn = document.getElementById('delete-btn');

// ==========================================
// LocalStorage 함수
// ==========================================

// 메모 저장
function saveMemos() {
  localStorage.setItem('spark-memos', JSON.stringify(memosArray));
  console.log('메모 저장 완료:', memosArray.length + '개');
}

// 메모 불러오기
function loadMemos() {
  const saved = localStorage.getItem('spark-memos');
  if (saved) {
    memosArray = JSON.parse(saved);
    console.log('메모 불러오기 완료:', memosArray.length + '개');
  } else {
    memosArray = [];
    console.log('저장된 메모 없음');
  }
}

// ==========================================
// 메모 추가 기능
// ==========================================

// 메모 저장하기
function addMemo() {
  const content = memoInput.value.trim();

  // 빈 내용 체크
  if (!content) {
    alert('메모 내용을 입력하세요!');
    return;
  }

  // 수정 모드일 경우
  if (isEditMode) {
    updateMemo(content);
    return;
  }

  // 첫 줄을 제목으로 추출
  const lines = content.split('\n').filter(line => line.trim() !== '');
  const title = lines.length > 0 ? lines[0] : '제목 없음';

  // 새 메모 객체 생성
  const newMemo = {
    id: Date.now(),
    title: title,
    content: content,
    date: new Date().toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(/\. /g, '.').replace(/\.$/, ''),
    isImportant: isImportantMode
  };

  // 배열에 추가 (최신 메모가 위로)
  memosArray.unshift(newMemo);

  // LocalStorage에 저장
  saveMemos();

  // 입력창 초기화
  memoInput.value = '';
  isImportantMode = false;
  importantBtn.classList.remove('active');

  // 목록 다시 렌더링
  renderMemos();

  console.log('새 메모 추가:', newMemo.title);
}

// 메모 업데이트 (수정 완료)
function updateMemo(content) {
  // 메모 찾기
  const memo = memosArray.find(m => m.id === currentMemoId);

  if (!memo) {
    alert('메모를 찾을 수 없습니다.');
    return;
  }

  // 첫 줄을 제목으로 추출
  const lines = content.split('\n').filter(line => line.trim() !== '');
  const title = lines.length > 0 ? lines[0] : '제목 없음';

  // 메모 내용 업데이트
  memo.title = title;
  memo.content = content;
  memo.isImportant = isImportantMode;
  memo.date = new Date().toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).replace(/\. /g, '.').replace(/\.$/, '');

  // LocalStorage에 저장
  saveMemos();

  // 수정 모드 초기화
  isEditMode = false;
  currentMemoId = null;
  saveBtn.textContent = '저장하기';

  // 입력창 초기화
  memoInput.value = '';
  isImportantMode = false;
  importantBtn.classList.remove('active');

  // 목록 다시 렌더링
  renderMemos();

  console.log('메모 수정 완료:', memo.title);
  alert('메모가 수정되었습니다.');
}

// ==========================================
// 메모 목록 렌더링
// ==========================================

function renderMemos() {
  // 필터링
  let filteredMemos = memosArray;

  if (currentFilter === 'important') {
    filteredMemos = memosArray.filter(memo => memo.isImportant);
  }

  // 검색어 필터링
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm) {
    filteredMemos = filteredMemos.filter(memo =>
      memo.title.toLowerCase().includes(searchTerm) ||
      memo.content.toLowerCase().includes(searchTerm)
    );
  }

  // 목록 비우기
  memoList.innerHTML = '';

  // 메모가 없을 때
  if (filteredMemos.length === 0) {
    memoList.innerHTML = '<li class="memo-card" style="text-align: center; color: var(--color-text-secondary);">메모가 없습니다.</li>';
    return;
  }

  // 메모 카드 생성
  filteredMemos.forEach(memo => {
    const li = document.createElement('li');
    li.className = 'memo-card' + (memo.isImportant ? ' important' : '');
    li.dataset.id = memo.id;

    li.innerHTML = `
      <h3 class="memo-title">${memo.title}</h3>
      <time class="memo-date">${memo.date}</time>
    `;

    // 클릭 이벤트 (메모 상세보기)
    li.addEventListener('click', () => showMemoDetail(memo.id));

    memoList.appendChild(li);
  });

  console.log('메모 렌더링 완료:', filteredMemos.length + '개');
}

// ==========================================
// 메모 상세보기
// ==========================================

function showMemoDetail(memoId) {
  // 메모 찾기
  const memo = memosArray.find(m => m.id === memoId);

  if (!memo) {
    alert('메모를 찾을 수 없습니다.');
    return;
  }

  // 현재 메모 ID 저장
  currentMemoId = memoId;

  // 메모 내용 표시
  memoContent.innerHTML = memo.content.replace(/\n/g, '<br>');
  memoContentDate.textContent = memo.date;

  // 화면 전환
  mainView.classList.remove('active');
  memoView.classList.add('active');

  console.log('메모 상세보기:', memo.title);
}

// 메인 화면으로 돌아가기
function goBack() {
  memoView.classList.remove('active');
  mainView.classList.add('active');
  currentMemoId = null;

  // 수정 모드였다면 초기화
  if (isEditMode) {
    isEditMode = false;
    saveBtn.textContent = '저장하기';
    memoInput.value = '';
  }

  console.log('메인 화면으로 복귀');
}

// ==========================================
// 메모 수정
// ==========================================

function editMemo() {
  // 현재 메모 찾기
  const memo = memosArray.find(m => m.id === currentMemoId);

  if (!memo) {
    alert('메모를 찾을 수 없습니다.');
    return;
  }

  // 수정 모드 활성화
  isEditMode = true;

  // 메모 내용을 입력창에 불러오기
  memoInput.value = memo.content;

  // 중요 메모 상태 반영
  isImportantMode = memo.isImportant;
  if (isImportantMode) {
    importantBtn.classList.add('active');
  } else {
    importantBtn.classList.remove('active');
  }

  // 저장 버튼 텍스트 변경
  saveBtn.textContent = '수정완료';

  // 메인 화면으로 전환
  memoView.classList.remove('active');
  mainView.classList.add('active');

  // 입력창에 포커스
  memoInput.focus();

  console.log('메모 수정 모드:', memo.title);
}

// ==========================================
// 메모 삭제
// ==========================================

function deleteMemo() {
  // 삭제 확인
  if (!confirm('정말 이 메모를 삭제하시겠습니까?')) {
    return;
  }

  // 메모 찾아서 삭제
  const index = memosArray.findIndex(m => m.id === currentMemoId);

  if (index === -1) {
    alert('메모를 찾을 수 없습니다.');
    return;
  }

  const deletedMemo = memosArray[index];

  // 배열에서 제거
  memosArray.splice(index, 1);

  // LocalStorage에 저장
  saveMemos();

  console.log('메모 삭제:', deletedMemo.title);

  // 메인 화면으로 복귀
  goBack();

  // 목록 다시 렌더링
  renderMemos();

  alert('메모가 삭제되었습니다.');
}

// ==========================================
// 중요 메모 토글
// ==========================================

function toggleImportant() {
  isImportantMode = !isImportantMode;

  if (isImportantMode) {
    importantBtn.classList.add('active');
    console.log('중요 메모 모드 ON');
  } else {
    importantBtn.classList.remove('active');
    console.log('중요 메모 모드 OFF');
  }
}

// ==========================================
// 필터 토글
// ==========================================

function toggleFilter() {
  if (currentFilter === 'all') {
    currentFilter = 'important';
    filterToggle.textContent = '★ 중요';
    filterToggle.dataset.filter = 'important';
  } else {
    currentFilter = 'all';
    filterToggle.textContent = '전체';
    filterToggle.dataset.filter = 'all';
  }

  renderMemos();
  console.log('필터 변경:', currentFilter);
}

// ==========================================
// 이벤트 리스너
// ==========================================

// 저장하기 버튼
saveBtn.addEventListener('click', addMemo);

// 중요 메모 버튼
importantBtn.addEventListener('click', toggleImportant);

// 필터 토글 버튼
filterToggle.addEventListener('click', toggleFilter);

// 검색 입력
searchInput.addEventListener('input', renderMemos);

// Enter 키로 저장
memoInput.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'Enter') {
    addMemo();
  }
});

// 메모 보기 화면 버튼들
backBtn.addEventListener('click', goBack);
editBtn.addEventListener('click', editMemo);
deleteBtn.addEventListener('click', deleteMemo);

// ==========================================
// 초기화
// ==========================================

function init() {
  console.log('=== SPARK 메모장 앱 시작 ===');

  // 메모 불러오기
  loadMemos();

  // 메모 목록 렌더링
  renderMemos();

  console.log('초기화 완료');
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', init);
