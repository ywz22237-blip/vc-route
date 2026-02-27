// 투자펀드 데이터 (API에서 로드)
let fundsData = [];
let filteredFunds = [];

// API에서 펀드 데이터 로드
async function loadFundsFromAPI() {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/funds`);
    if (response.ok) {
      fundsData = await response.json();
      filteredFunds = [...fundsData];
      renderFunds(fundsData);
      updateResultsCount(fundsData.length);
    } else {
      console.error("펀드 데이터 로드 실패:", response.status);
      // 폴백: 기본 데이터 표시
      showNoDataMessage();
    }
  } catch (error) {
    console.error("펀드 API 연결 오류:", error);
    showNoDataMessage();
  }
}

function showNoDataMessage() {
  const grid = document.getElementById("fundsGrid");
  const noResults = document.getElementById("noResults");
  if (grid) grid.style.display = "none";
  if (noResults) noResults.style.display = "block";
  updateResultsCount(0);
}

// 페이지 로직
document.addEventListener("DOMContentLoaded", () => {
  loadFundsFromAPI();
});

// 펀드 카드 렌더링
function renderFunds(funds) {
  const grid = document.getElementById("fundsGrid");
  const noResults = document.getElementById("noResults");

  if (funds.length === 0) {
    grid.style.display = "none";
    noResults.style.display = "block";
    return;
  }

  grid.style.display = "grid";
  noResults.style.display = "none";

  grid.innerHTML = funds
    .map(
      (fund) => `
    <div class="u-card" data-id="${fund.id}" onclick="openFundModal(${fund.id})">
      <div class="card-header">
        <div class="avatar">
          <i class="fa-solid fa-coins"></i>
        </div>
        <div class="investor-info">
          <h3 style="font-size: 1.1rem; margin-bottom: 0.2rem;">${fund.fundName}</h3>
          <div class="company" style="font-size: 0.85rem; color: var(--accent-color); font-weight: 700;">${fund.companyName}</div>
        </div>
      </div>

      <div style="margin-bottom: 1.25rem;">
        <div class="fund-info-item" style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.9rem;">
          <span style="color: var(--text-secondary);">등록일자</span>
          <span style="font-weight: 700;">${fund.registeredAt}</span>
        </div>
        <div class="fund-info-item" style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.9rem;">
          <span style="color: var(--text-secondary);">만기일자</span>
          <span style="font-weight: 700;">${fund.expiredAt}</span>
        </div>
        <div class="fund-info-item" style="display: flex; justify-content: space-between; font-size: 0.9rem;">
          <span style="color: var(--text-secondary);">결성총액</span>
          <span style="font-weight: 700; color: var(--accent-color);">${formatAmount(fund.totalAmount)}</span>
        </div>
      </div>

      <div class="investor-tags" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
        <span class="tag">${fund.fundType}</span>
        <span class="tag">${fund.industry.split(",")[0]}</span>
      </div>

      <div class="card-footer" style="margin-top: auto; display: flex; gap: 0.75rem; align-items: center;">
        <button class="btn-primary" style="flex: 1; padding: 0.6rem; font-size: 0.85rem;">상세보기</button>
        <button class="btn-bookmark ${BookmarkMgr.isBookmarked("funds", fund.id) ? "active" : ""}"
                onclick="event.stopPropagation(); handleBookmarkUpdate('funds', ${fund.id}, this)">
          <i class="fa-${BookmarkMgr.isBookmarked("funds", fund.id) ? "solid" : "regular"} fa-star"></i>
        </button>
      </div>
    </div>
  `,
    )
    .join("");
}

// 특수 필터 토글
function toggleSpecialFilter(value) {
  const items = document.querySelectorAll(".special-tag");
  const clickedItem = document.querySelector(
    `.special-tag[data-special="${value}"]`,
  );

  if (value === "all") {
    items.forEach((item) => item.classList.remove("active"));
    clickedItem.classList.add("active");
  } else {
    clickedItem.classList.toggle("active");
    const specialItems = Array.from(items).filter(
      (item) => item.dataset.special !== "all",
    );
    const anyActive = specialItems.some((item) =>
      item.classList.contains("active"),
    );
    const allItem = document.querySelector('.special-tag[data-special="all"]');

    if (anyActive) {
      allItem.classList.remove("active");
    } else {
      allItem.classList.add("active");
    }
  }
  filterFunds();
}

// 필터 초기화
function resetFilters() {
  // 검색어 초기화
  clearFundSearch();

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((cb) => {
    cb.checked = cb.name === "fundType" && cb.value === "all";
  });

  const tags = document.querySelectorAll(".special-tag");
  tags.forEach((t) => t.classList.remove("active"));
  document
    .querySelector('.special-tag[data-special="all"]')
    .classList.add("active");

  filterFunds();
}

// 검색 초기화 함수
function clearFundSearch() {
  const input = document.getElementById("fundSearch");
  const clearBtn = document.getElementById("searchClear");
  const searchStats = document.getElementById("searchStats");

  input.value = "";
  clearBtn.classList.remove("visible");
  searchStats.style.display = "none";

  filterFunds();
}

// 검색 및 사이드바 필터링
function filterFunds() {
  const input = document.getElementById("fundSearch");
  const query = input.value.toLowerCase();
  const clearBtn = document.getElementById("searchClear");
  const searchStats = document.getElementById("searchStats");
  const searchKeyword = document.getElementById("searchKeyword");
  const specialFilters = getCheckedValues("special");
  const typeFilters = getCheckedValues("fundType");

  // Clear 버튼 및 검색 통계 표시
  if (query.length > 0) {
    clearBtn.classList.add("visible");
    searchStats.style.display = "flex";
    searchKeyword.textContent = query;
  } else {
    clearBtn.classList.remove("visible");
    searchStats.style.display = "none";
  }

  filteredFunds = fundsData.filter((fund) => {
    // 0. 특수 필터
    let matchSpecial = true;
    if (specialFilters.length > 0 && !specialFilters.includes("all")) {
      matchSpecial = specialFilters.every((filter) => {
        if (filter === "bookmarked")
          return BookmarkMgr.isBookmarked("funds", fund.id);
        return false;
      });
    }

    // 1. 유형 필터
    const matchType =
      typeFilters.length === 0 ||
      typeFilters.includes("all") ||
      typeFilters.includes(fund.fundType);

    // 2. 검색 필터 (펀드명, 운용사, 투자분야, 목적, 매니저)
    const matchSearch =
      fund.fundName.toLowerCase().includes(query) ||
      fund.companyName.toLowerCase().includes(query) ||
      fund.industry.toLowerCase().includes(query) ||
      fund.purpose.toLowerCase().includes(query) ||
      fund.manager.toLowerCase().includes(query);

    return matchSpecial && matchType && matchSearch;
  });

  sortFunds(); // 필터링 후 정렬 유지
}

// 체크된 값 가져오기
function getCheckedValues(name) {
  if (name === "special") {
    const activeTags = document.querySelectorAll(".special-tag.active");
    return Array.from(activeTags).map((tag) => tag.dataset.special);
  }
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  return Array.from(checkboxes).map((cb) => cb.value);
}

// 정렬
function sortFunds() {
  const sortValue = document.getElementById("sortSelect").value;
  let sorted = [...filteredFunds];

  switch (sortValue) {
    case "name":
      sorted.sort((a, b) => a.fundName.localeCompare(b.fundName));
      break;
    case "regDate":
      sorted.sort(
        (a, b) => new Date(b.registeredAt) - new Date(a.registeredAt),
      );
      break;
    case "amount":
      sorted.sort((a, b) => b.totalAmount - a.totalAmount);
      break;
  }

  renderFunds(sorted);
  updateResultsCount(sorted.length);
}

// 모달 열기
function openFundModal(id) {
  const fund = fundsData.find((f) => f.id === id);
  if (!fund) return;

  const modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = `
    <div class="modal-header">
      <div style="display: flex; align-items: center; gap: 2rem;">
        <div class="avatar avatar-lg" style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);">
          <i class="fa-solid fa-coins"></i>
        </div>
        <div>
          <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem; letter-spacing: -0.01em;">${fund.fundName}</h2>
          <p style="color: var(--primary-color); font-weight: 700; font-size: 1.1rem; margin-bottom: 0.75rem;">${fund.companyName}</p>
          <div style="display: flex; gap: 0.5rem;">
            <span class="tag" style="background: #eef2ff; color: #4f46e5; border: 1px solid #dbeafe;">${fund.fundType}</span>
            <span class="tag" style="background: #f0fdf4; color: #166534; border: 1px solid #dcfce7;">${fund.industry.split(",")[0]}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-body">
      <div class="u-section">
        <h3>펀드 핵심 지표</h3>
        <div class="u-grid-2">
          <div class="u-card" style="padding: 1.5rem; background: linear-gradient(to bottom right, #ffffff, #f8fafc); border: 1px solid #e2e8f0; box-shadow: none;">
            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem; font-weight: 600;">결성 약정총액</div>
            <div style="font-size: 1.75rem; font-weight: 900; color: #0f172a; letter-spacing: -0.02em;">${formatAmount(fund.totalAmount)}</div>
          </div>
          <div class="u-card" style="padding: 1.5rem; background: linear-gradient(to bottom right, #ffffff, #f8fafc); border: 1px solid #e2e8f0; box-shadow: none;">
            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem; font-weight: 600;">기준 수익률 (Hurdle Rate)</div>
            <div style="font-size: 1.75rem; font-weight: 900; color: #2563eb; letter-spacing: -0.02em;">${fund.baseRate}%</div>
          </div>
        </div>
      </div>

      <div class="u-section">
        <h3>상세 운용 정보</h3>
        <div class="u-card" style="padding: 0; background: white; border: 1px solid #e2e8f0; box-shadow: none; overflow: hidden;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 1.25rem; color: var(--text-secondary); width: 140px; background: #f8fafc; font-weight: 600;">등록 및 만기</td>
              <td style="padding: 1.25rem; font-weight: 600; color: var(--text-primary);">${fund.registeredAt} ~ ${fund.expiredAt}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 1.25rem; color: var(--text-secondary); background: #f8fafc; font-weight: 600;">결산월 / 매니저</td>
              <td style="padding: 1.25rem; font-weight: 600; color: var(--text-primary);">${fund.settlementMonth}월 / ${fund.manager} 매니저</td>
            </tr>
            <tr>
              <td style="padding: 1.25rem; color: var(--text-secondary); background: #f8fafc; font-weight: 600;">주요 출자자(LP)</td>
              <td style="padding: 1.25rem; font-weight: 700; color: var(--primary-color);">${fund.support}</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="u-section">
        <h3>결성 목적 및 투자 전략</h3>
        <div style="padding: 1.5rem; border-radius: 20px; background: #f8fafc; border: 1px solid #e2e8f0; line-height: 1.7; color: #475569; font-size: 1rem;">
          <i class="fa-solid fa-quote-left" style="color: #cbd5e1; margin-bottom: 1rem; display: block; font-size: 1.2rem;"></i>
          ${fund.purpose}
        </div>
      </div>

      <div style="margin-top: 2rem;">
        <button class="btn-primary" style="width: 100%; padding: 1.1rem; font-size: 1.1rem; border-radius: 16px;">IR 피칭 자료 접수하기</button>
      </div>
    </div>
  `;

  document.getElementById("fundModal").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeFundModal() {
  document.getElementById("fundModal").style.display = "none";
  document.body.style.overflow = "auto";
}

// 외부 클릭 닫기
window.addEventListener("click", (e) => {
  const modal = document.getElementById("fundModal");
  if (e.target === modal) {
    closeFundModal();
  }
});

// 결과 수 업데이트
function updateResultsCount(count) {
  document.getElementById("totalCount").textContent = count;
}

// 금액 포맷
function formatAmount(amount) {
  if (amount >= 100000000) {
    return (amount / 100000000).toLocaleString() + " 억원";
  }
  return amount.toLocaleString() + " 원";
}
