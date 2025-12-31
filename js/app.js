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
let currentImages = []; // 현재 선택된 이미지 배열 (Base64)

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

// 메뉴 요소
const menuBtn = document.getElementById('menu-btn');
const darkModeBtn = document.getElementById('dark-mode-btn');

// 이미지 요소
const imageBtn = document.getElementById('image-btn');
const imageInput = document.getElementById('image-input');
const imagePreviewContainer = document.getElementById('image-preview-container');
const memoImagesContainer = document.getElementById('memo-images-container');

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
    isImportant: isImportantMode,
    images: [...currentImages] // 이미지 배열 복사
  };

  // 배열에 추가 (최신 메모가 위로)
  memosArray.unshift(newMemo);

  // LocalStorage에 저장
  saveMemos();

  // 입력창 초기화
  memoInput.value = '';
  isImportantMode = false;
  importantBtn.classList.remove('active');
  currentImages = []; // 이미지 초기화
  renderImagePreviews(); // 미리보기 초기화

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
  memo.images = [...currentImages]; // 이미지 업데이트
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
  currentImages = []; // 이미지 초기화
  renderImagePreviews(); // 미리보기 초기화

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

  // 이미지 표시
  renderMemoImages(memo.images || []);

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

  // 이미지 불러오기
  currentImages = memo.images ? [...memo.images] : [];
  renderImagePreviews();

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
// 메모 공유
// ==========================================

function shareMemo() {
  console.log('shareMemo 함수 실행됨');

  // 현재 메모 찾기
  const memo = memosArray.find(m => m.id === currentMemoId);

  if (!memo) {
    alert('메모를 찾을 수 없습니다.');
    return;
  }

  console.log('공유할 메모:', memo.title);
  console.log('navigator.share 지원 여부:', !!navigator.share);

  // Web Share API 지원 확인
  if (!navigator.share) {
    alert('이 브라우저는 공유 기능을 지원하지 않습니다.\n(모바일 브라우저에서 사용 가능합니다)');
    return;
  }

  // 공유 데이터 준비
  const shareData = {
    title: 'SPARK - ' + memo.title,
    text: memo.content,
  };

  // 공유 실행
  navigator.share(shareData)
    .then(() => {
      console.log('메모 공유 성공:', memo.title);
    })
    .catch((error) => {
      // 사용자가 취소한 경우는 에러 메시지 표시 안 함
      if (error.name !== 'AbortError') {
        console.error('공유 실패:', error);
        alert('메모 공유 중 오류가 발생했습니다.');
      }
    });
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
// 드롭다운 메뉴
// ==========================================

// 메뉴 토글
function toggleMenu() {
  const menu = document.getElementById('dropdown-menu');
  menu.classList.toggle('active');
}

// 메뉴 외부 클릭 시 닫기
function closeMenuOnClickOutside(event) {
  const menu = document.getElementById('dropdown-menu');
  const menuBtn = document.getElementById('menu-btn');

  // 메뉴나 메뉴 버튼이 아닌 곳을 클릭하면 메뉴 닫기
  if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
    menu.classList.remove('active');
  }
}

// 메뉴 아이템 클릭 시 메뉴 닫기
function closeMenuAfterClick() {
  const menu = document.getElementById('dropdown-menu');
  menu.classList.remove('active');
}

// ==========================================
// 백업 관리 기능
// ==========================================

// 메모 내보내기 (JSON 다운로드)
function exportMemos() {
  // 메모가 없으면 경고
  if (memosArray.length === 0) {
    alert('내보낼 메모가 없습니다.');
    return;
  }

  // JSON 문자열로 변환 (들여쓰기 2칸)
  const jsonData = JSON.stringify(memosArray, null, 2);

  // Blob 생성 (JSON 파일)
  const blob = new Blob([jsonData], { type: 'application/json' });

  // 다운로드 링크 생성
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;

  // 파일명: spark-backup-2025-12-30.json
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD
  a.download = `spark-backup-${dateStr}.json`;

  // 다운로드 실행
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // URL 해제
  URL.revokeObjectURL(url);

  console.log('메모 내보내기 완료:', memosArray.length + '개');
  alert(`메모 ${memosArray.length}개를 백업 파일로 저장했습니다.`);
}

// 메모 가져오기 (JSON 파일 읽기)
function importMemos() {
  // 파일 선택 input 클릭
  const fileInput = document.getElementById('import-file-input');
  fileInput.click();
}

// 파일 선택 시 실행
function handleFileImport(event) {
  const file = event.target.files[0];

  // 파일이 선택되지 않았으면 종료
  if (!file) {
    return;
  }

  // JSON 파일이 아니면 경고
  if (!file.name.endsWith('.json')) {
    alert('JSON 파일만 가져올 수 있습니다.');
    return;
  }

  // 파일 읽기
  const reader = new FileReader();

  reader.onload = function(e) {
    try {
      // JSON 파싱
      const importedMemos = JSON.parse(e.target.result);

      // 배열이 아니면 에러
      if (!Array.isArray(importedMemos)) {
        throw new Error('올바른 백업 파일이 아닙니다.');
      }

      // 복원 확인
      const confirmMsg = `${importedMemos.length}개의 메모를 가져옵니다.\n기존 메모 ${memosArray.length}개와 병합됩니다.\n계속하시겠습니까?`;
      if (!confirm(confirmMsg)) {
        return;
      }

      // 메모 병합 (중복 제거)
      const existingIds = new Set(memosArray.map(m => m.id));
      let addedCount = 0;

      importedMemos.forEach(memo => {
        // 필수 필드 검증
        if (memo.id && memo.title && memo.content && memo.date !== undefined) {
          // 중복되지 않은 메모만 추가
          if (!existingIds.has(memo.id)) {
            memosArray.push(memo);
            addedCount++;
          }
        }
      });

      // 날짜순 정렬 (최신순)
      memosArray.sort((a, b) => b.id - a.id);

      // LocalStorage에 저장
      saveMemos();

      // 목록 다시 렌더링
      renderMemos();

      console.log('메모 가져오기 완료:', addedCount + '개 추가');
      alert(`${addedCount}개의 메모를 추가했습니다.\n(중복 ${importedMemos.length - addedCount}개 제외)`);

    } catch (error) {
      console.error('파일 가져오기 실패:', error);
      alert('파일을 읽을 수 없습니다.\n올바른 백업 파일인지 확인하세요.');
    }

    // input 초기화
    event.target.value = '';
  };

  reader.onerror = function() {
    alert('파일 읽기 중 오류가 발생했습니다.');
    event.target.value = '';
  };

  // 파일 읽기 시작
  reader.readAsText(file);
}

// ==========================================
// 다크모드 기능
// ==========================================

// 다크모드 토글
function toggleDarkMode() {
  const body = document.body;
  const isDarkMode = body.classList.toggle('dark-mode');

  // 버튼 텍스트 변경
  if (isDarkMode) {
    darkModeBtn.querySelector('.menu-icon').textContent = '☀️';
    darkModeBtn.querySelector('.menu-text').textContent = '라이트모드';
    console.log('다크모드 활성화');
  } else {
    darkModeBtn.querySelector('.menu-icon').textContent = '🌙';
    darkModeBtn.querySelector('.menu-text').textContent = '다크모드';
    console.log('라이트모드 활성화');
  }

  // LocalStorage에 저장
  saveTheme(isDarkMode);
}

// 테마 저장
function saveTheme(isDarkMode) {
  localStorage.setItem('spark-theme', isDarkMode ? 'dark' : 'light');
}

// 테마 불러오기
function loadTheme() {
  const savedTheme = localStorage.getItem('spark-theme');
  const body = document.body;

  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    darkModeBtn.querySelector('.menu-icon').textContent = '☀️';
    darkModeBtn.querySelector('.menu-text').textContent = '라이트모드';
    console.log('저장된 테마 적용: 다크모드');
  } else {
    body.classList.remove('dark-mode');
    darkModeBtn.querySelector('.menu-icon').textContent = '🌙';
    darkModeBtn.querySelector('.menu-text').textContent = '다크모드';
    console.log('저장된 테마 적용: 라이트모드');
  }
}

// ==========================================
// 이미지 첨부 기능
// ==========================================

// 이미지 파일 선택 트리거
function selectImage() {
  imageInput.click();
}

// 이미지 파일 읽기
function handleImageSelect(event) {
  const files = event.target.files;

  if (!files || files.length === 0) {
    return;
  }

  // 최대 5개 제한
  if (currentImages.length + files.length > 5) {
    alert('이미지는 최대 5개까지만 첨부할 수 있습니다.');
    return;
  }

  // 각 파일 읽기
  Array.from(files).forEach(file => {
    // 이미지 파일인지 확인
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 첨부할 수 있습니다.');
      return;
    }

    // 파일 크기 체크 (2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('이미지 크기는 2MB 이하여야 합니다.');
      return;
    }

    // FileReader로 Base64 변환
    const reader = new FileReader();

    reader.onload = function(e) {
      const base64Image = e.target.result;
      currentImages.push(base64Image);
      renderImagePreviews();
      console.log('이미지 추가:', currentImages.length + '개');
    };

    reader.onerror = function() {
      alert('이미지를 읽을 수 없습니다.');
    };

    reader.readAsDataURL(file);
  });

  // input 초기화
  event.target.value = '';
}

// 이미지 미리보기 렌더링
function renderImagePreviews() {
  imagePreviewContainer.innerHTML = '';

  currentImages.forEach((base64Image, index) => {
    const previewItem = document.createElement('div');
    previewItem.className = 'image-preview-item';

    const img = document.createElement('img');
    img.src = base64Image;
    img.alt = `미리보기 ${index + 1}`;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'image-remove-btn';
    removeBtn.innerHTML = '×';
    removeBtn.onclick = () => removeImage(index);

    previewItem.appendChild(img);
    previewItem.appendChild(removeBtn);
    imagePreviewContainer.appendChild(previewItem);
  });
}

// 이미지 삭제
function removeImage(index) {
  currentImages.splice(index, 1);
  renderImagePreviews();
  console.log('이미지 삭제:', currentImages.length + '개 남음');
}

// 메모 보기 화면에 이미지 렌더링
function renderMemoImages(images) {
  memoImagesContainer.innerHTML = '';

  if (!images || images.length === 0) {
    return;
  }

  images.forEach((base64Image, index) => {
    const img = document.createElement('img');
    img.src = base64Image;
    img.alt = `이미지 ${index + 1}`;
    memoImagesContainer.appendChild(img);
  });
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

// 공유 버튼 (디버깅 로그 추가)
console.log('shareBtn 요소:', shareBtn);
if (shareBtn) {
  shareBtn.addEventListener('click', shareMemo);
  console.log('공유 버튼 이벤트 리스너 등록 완료');
} else {
  console.error('shareBtn 요소를 찾을 수 없습니다!');
}

// 드롭다운 메뉴
menuBtn.addEventListener('click', toggleMenu);
document.addEventListener('click', closeMenuOnClickOutside);

// 백업 관리 버튼들
const exportBtn = document.getElementById('export-btn');
const importBtn = document.getElementById('import-btn');
const importFileInput = document.getElementById('import-file-input');

exportBtn.addEventListener('click', () => {
  exportMemos();
  closeMenuAfterClick();
});
importBtn.addEventListener('click', () => {
  importMemos();
  closeMenuAfterClick();
});
importFileInput.addEventListener('change', handleFileImport);

// 다크모드 버튼
darkModeBtn.addEventListener('click', () => {
  toggleDarkMode();
  closeMenuAfterClick();
});

// 이미지 버튼
imageBtn.addEventListener('click', selectImage);
imageInput.addEventListener('change', handleImageSelect);

// ==========================================
// 초기화
// ==========================================

function init() {
  console.log('=== SPARK 메모장 앱 시작 ===');

  // 저장된 테마 불러오기
  loadTheme();

  // LocalStorage에서 메모 불러오기
  loadMemos();

  // 메모 목록 렌더링
  renderMemos();

  console.log('초기화 완료');
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', init);
