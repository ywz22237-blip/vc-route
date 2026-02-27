// Notice Data (API에서 로드)
let noticesData = [];
let currentCategory = "all";
let searchQuery = "";

// API에서 공지사항 데이터 로드
async function loadNoticesFromAPI() {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/notices`);
    if (response.ok) {
      noticesData = await response.json();
      renderNotices();
      updateCount(noticesData.length);
    } else {
      console.error("공지사항 데이터 로드 실패:", response.status);
      showNoNoticesMessage();
    }
  } catch (error) {
    console.error("공지사항 API 연결 오류:", error);
    showNoNoticesMessage();
  }
}

function showNoNoticesMessage() {
  const noticeList = document.getElementById("noticeList");
  const noResults = document.getElementById("noResults");
  if (noticeList) noticeList.innerHTML = "";
  if (noResults) noResults.style.display = "block";
  updateCount(0);
}

// 날짜를 상대적 시간으로 변환
function formatRelativeDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "오늘";
  if (diffDays === 1) return "1일 전";
  if (diffDays < 7) return `${diffDays}일 전`;
  if (diffDays < 14) return "1주일 전";
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}주일 전`;
  return `${Math.floor(diffDays / 30)}개월 전`;
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // URL 파라미터 확인 (카테고리 필터링 지원)
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get("category");
  if (
    categoryParam &&
    ["notice", "update", "event", "report", "demoday"].includes(categoryParam)
  ) {
    currentCategory = categoryParam;

    // UI 업데이트
    document.querySelectorAll(".filter-item").forEach((item) => {
      item.classList.remove("active");
      if (item.dataset.category === categoryParam) {
        item.classList.add("active");
      }
    });

    const categoryLabels = {
      notice: "공지사항",
      update: "데모데이",
      demoday: "데모데이",
      event: "이벤트",
      report: "투자 리포트",
    };
    const labelEl = document.getElementById("categoryLabel");
    if (labelEl) {
      labelEl.textContent = categoryLabels[categoryParam] || "전체";
    }
  }

  loadNoticesFromAPI();
});

// 카테고리별 태그 매핑
function getCategoryTag(category) {
  const tags = {
    notice: "# 공지",
    update: "# 업데이트",
    demoday: "# 데모데이",
    event: "# 이벤트",
    report: "# 투자리포트",
  };
  return tags[category] || "# 공지";
}

// 기본 썸네일
function getDefaultThumbnail(category) {
  const thumbnails = {
    notice: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
    update: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=1374&auto=format&fit=crop",
    demoday: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1470&auto=format&fit=crop",
    event: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1470&auto=format&fit=crop",
    report: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
  };
  return thumbnails[category] || thumbnails.notice;
}

// Render Notices
function renderNotices() {
  const noticeList = document.getElementById("noticeList");
  const noResults = document.getElementById("noResults");

  if (!noticeList) return;

  const filtered = noticesData.filter((notice) => {
    const matchesCategory =
      currentCategory === "all" || notice.category === currentCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (notice.title || "").toLowerCase().includes(query) ||
      (notice.summary || "").toLowerCase().includes(query) ||
      (notice.author || "").toLowerCase().includes(query) ||
      (notice.tag || "").toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    noticeList.innerHTML = "";
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
    noticeList.innerHTML = filtered
      .map(
        (notice) => `
      <article class="notice-card" onclick="openNoticeDetail(${notice.id})">
        <div class="notice-card-content">
          <span class="notice-tag">${notice.tag || getCategoryTag(notice.category)}</span>
          <h2 class="notice-title">${notice.title}</h2>
          <p class="notice-summary">${notice.summary || ""}</p>
          <div class="notice-footer">
            <div class="author-img"></div>
            <div class="author-info">
              <span class="author-name">${notice.author || "관리자"}</span>
              <span class="author-divider">|</span>
              <span class="author-role" style="color: var(--eopla-text-secondary);">${notice.authorRole || "VC route Team"}</span>
              <span class="author-divider">|</span>
              <span class="notice-date">${formatRelativeDate(notice.date)}</span>
            </div>
          </div>
        </div>
        <div class="notice-thumbnail">
          <img src="${notice.thumbnail || getDefaultThumbnail(notice.category)}" alt="thumbnail" onerror="this.src='https://via.placeholder.com/140x140/252529/B6B7BC?text=VCroute'">
        </div>
      </article>
    `,
      )
      .join("");
  }

  updateCount(filtered.length);
}

// Category Filter
function filterCategory(category) {
  currentCategory = category;

  // Update UI (filter-item active class)
  document.querySelectorAll(".filter-item").forEach((item) => {
    item.classList.remove("active");
    if (item.dataset.category === category) {
      item.classList.add("active");
    }
  });

  const categoryLabels = {
    all: "전체",
    notice: "공지사항",
    update: "데모데이",
    event: "이벤트",
    report: "투자 리포트",
  };
  const labelEl = document.getElementById("categoryLabel");
  if (labelEl) {
    labelEl.textContent = categoryLabels[category] || "전체";
  }

  handleSearch(); // Re-render with new filter
}

// Reset Filters
function resetFilters() {
  currentCategory = "all";
  clearNoticeSearch();
  filterCategory("all");
}

// 검색 초기화 함수
function clearNoticeSearch() {
  const input = document.getElementById("noticeSearch");
  const clearBtn = document.getElementById("searchClear");
  const searchStats = document.getElementById("searchStats");

  input.value = "";
  searchQuery = "";
  clearBtn.classList.remove("visible");
  searchStats.style.display = "none";

  renderNotices();
}

// Search Handler
function handleSearch() {
  const input = document.getElementById("noticeSearch");
  const clearBtn = document.getElementById("searchClear");
  const searchStats = document.getElementById("searchStats");
  const searchKeyword = document.getElementById("searchKeyword");

  searchQuery = input.value.trim();

  // Clear 버튼 및 검색 통계 표시
  if (searchQuery.length > 0) {
    clearBtn.classList.add("visible");
    searchStats.style.display = "flex";
    searchKeyword.textContent = searchQuery;
  } else {
    clearBtn.classList.remove("visible");
    searchStats.style.display = "none";
  }

  renderNotices();
}

// Update Count
function updateCount(count = 0) {
  const countEl = document.getElementById("noticeCount");
  if (countEl) countEl.textContent = count;
}

// Modal Interaction (Mock)
function openNoticeDetail(id) {
  const notice = noticesData.find((n) => n.id === id);
  if (!notice) return;

  alert(`${notice.title} 상세 내용을 표시합니다. (준비 중)`);
}

function closeNoticeModal() {
  document.getElementById("noticeModal").style.display = "none";
  document.body.style.overflow = "auto";
}
