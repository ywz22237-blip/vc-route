let investorsData = [];
let filteredInvestors = [];
let searchQuery = "";

// API에서 투자자 데이터 로드
async function loadInvestors() {
  const grid = document.getElementById("investorsGrid");
  const noResults = document.getElementById("noResults");

  try {
    grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">투자자 정보를 불러오는 중...</div>';
    grid.style.display = "grid";
    if (noResults) noResults.style.display = "none";

    const res = await fetch("/api/investors?limit=200");
    if (!res.ok) throw new Error("API 요청 실패");

    const json = await res.json();
    investorsData = (json.data || []);
    filteredInvestors = [...investorsData];

    renderInvestors(investorsData);
    updateResultsCount(investorsData.length);
  } catch (err) {
    console.error("투자자 데이터 로드 실패:", err);
    grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">투자자 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</div>';
    grid.style.display = "grid";
    if (noResults) noResults.style.display = "none";
  }
}

// 페이지 로드 시 투자자 카드 렌더링
document.addEventListener("DOMContentLoaded", () => {
  loadInvestors();
});

// 검색 기능
function handleSearch() {
  const input = document.getElementById("investorSearch");
  const clearBtn = document.getElementById("searchClear");
  const searchStats = document.getElementById("searchStats");
  const searchKeyword = document.getElementById("searchKeyword");

  searchQuery = input.value.trim();

  // Clear 버튼 표시/숨김
  if (searchQuery.length > 0) {
    clearBtn.classList.add("visible");
    searchStats.style.display = "flex";
    searchKeyword.textContent = searchQuery;
  } else {
    clearBtn.classList.remove("visible");
    searchStats.style.display = "none";
  }

  applyFilters();
}

// 검색 초기화
function clearSearch() {
  const input = document.getElementById("investorSearch");
  const clearBtn = document.getElementById("searchClear");
  const searchStats = document.getElementById("searchStats");

  input.value = "";
  searchQuery = "";
  clearBtn.classList.remove("visible");
  searchStats.style.display = "none";

  applyFilters();
}

// 투자자 카드 렌더링
function renderInvestors(investors) {
  const grid = document.getElementById("investorsGrid");
  const noResults = document.getElementById("noResults");

  if (investors.length === 0) {
    grid.style.display = "none";
    noResults.style.display = "block";
    return;
  }

  grid.style.display = "grid";
  noResults.style.display = "none";

  grid.innerHTML = investors
    .map(
      (investor) => `
    <div class="u-card" data-id="${investor.id}" onclick="openInvestorModal(${investor.id})">
      <div class="card-header">
        <div class="avatar">
          <i class="fa-solid fa-user-tie"></i>
        </div>
        <div class="investor-info">
          <h3 style="font-size: 1.1rem; margin-bottom: 0.2rem;">${investor.name}</h3>
          <div class="company" style="font-size: 0.85rem; color: var(--accent-color); font-weight: 700;">${investor.company}</div>
        </div>
      </div>

      <div style="margin-bottom: 1.25rem;">
        <div class="fund-info-item" style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.9rem;">
          <span style="color: var(--text-secondary);">총 투자건수</span>
          <span style="font-weight: 700;">${investor.investments}건</span>
        </div>
        <div class="fund-info-item" style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.9rem;">
          <span style="color: var(--text-secondary);">매칭 성공률</span>
          <span style="font-weight: 700; color: var(--success-color);">${investor.successRate}%</span>
        </div>
        <div class="fund-info-item" style="display: flex; justify-content: space-between; font-size: 0.9rem;">
          <span style="color: var(--text-secondary);">투자 규모</span>
          <span style="font-weight: 700;">${investor.avgInvestment}억원</span>
        </div>
      </div>

      <div class="investor-tags" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
        <span class="tag">${formatType(investor.type)}</span>
        ${investor.tps ? '<span class="tag tag-special">TPS</span>' : ""}
        ${investor.lips ? '<span class="tag tag-special">LIPS</span>' : ""}
        ${investor.tops ? '<span class="tag tag-special">TOPS</span>' : ""}
      </div>

      <div class="card-footer" style="margin-top: auto; display: flex; gap: 0.75rem; align-items: center;">
        <button class="btn-primary" style="flex: 1; padding: 0.6rem; font-size: 0.85rem;">상세보기</button>
        <button class="btn-bookmark ${BookmarkMgr.isBookmarked("investors", investor.id) ? "active" : ""}"
                onclick="event.stopPropagation(); handleBookmarkUpdate('investors', ${investor.id}, this)">
          <i class="fa-${BookmarkMgr.isBookmarked("investors", investor.id) ? "solid" : "regular"} fa-star"></i>
        </button>
      </div>
    </div>
  `,
    )
    .join("");
}

// 투자자 상세 모달 열기
function openInvestorModal(id) {
  const investor = investorsData.find((inv) => inv.id === id);
  if (!investor) return;

  const modalBody = document.getElementById("modalBody");
  // modalBody는 .modal-content 내부에 위치함.
  // 기존 HTML 구조가 <div id="investorModal"><div class="modal-content"><span class="modal-close">&times;</span><div id="modalBody">...</div></div></div> 임을 전제

  modalBody.innerHTML = `
    <div class="modal-header">
      <div style="display: flex; align-items: center; gap: 2rem;">
        <div class="avatar avatar-lg">
          <i class="fa-solid fa-user-tie"></i>
        </div>
        <div>
          <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">${investor.name}</h2>
          <p style="color: var(--primary-color); font-weight: 700; font-size: 1.1rem; margin-bottom: 0.75rem;">${investor.company}</p>
          <div style="display: flex; gap: 0.5rem;">
            <span class="tag">${formatType(investor.type)}</span>
            ${investor.tps ? '<span class="tag tag-special">TPS</span>' : ""}
            ${investor.lips ? '<span class="tag tag-special">LIPS</span>' : ""}
            ${investor.tops ? '<span class="tag tag-special">TOPS</span>' : ""}
          </div>
        </div>
      </div>
    </div>

    <div class="modal-body">
      <div class="u-section">
        <h3>투자 요약</h3>
        <div class="u-grid-2">
          <div class="u-card" style="padding: 1.25rem; background: #f8fafc; border: none; box-shadow: none;">
            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">총 투자금액</div>
            <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary-color);">${investor.totalInvestment}억원</div>
          </div>
          <div class="u-card" style="padding: 1.25rem; background: #f8fafc; border: none; box-shadow: none;">
            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">포트폴리오</div>
            <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary-color);">${investor.portfolio}개사</div>
          </div>
        </div>
      </div>

      <div class="u-section">
        <h3>투자 성향 및 단계</h3>
        <div class="u-card" style="padding: 1.5rem; background: #fcfdff; border: 1px solid #eef2ff; box-shadow: none;">
          <p style="color: #4b5563; line-height: 1.7; margin-bottom: 1.25rem; font-size: 0.95rem;">${investor.description}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${investor.stages.map((s) => `<span class="tag" style="background: white; border: 1px solid #e2e8f0;">${formatStage(s)}</span>`).join("")}
          </div>
        </div>
      </div>

      <div class="u-section">
        <h3>운용 펀드 정보</h3>
        <div style="padding: 1.25rem; border-radius: 16px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-left: 4px solid var(--primary-color);">
          <p style="font-size: 0.95rem; color: var(--text-primary); line-height: 1.6;">${investor.fundDescription}</p>
        </div>
      </div>

      <div class="u-section">
        <h3>문의 및 네트워크</h3>
        <div class="u-grid-2">
          <div style="display: flex; align-items: center; gap: 12px; padding: 1rem; background: #f8fafc; border-radius: 12px;">
            <i class="fa-solid fa-envelope" style="color: var(--primary-color);"></i>
            <span style="font-size: 0.9rem;">${investor.email}</span>
          </div>
          <a href="${investor.websiteUrl}" target="_blank" style="display: flex; align-items: center; gap: 12px; padding: 1rem; background: #f8fafc; border-radius: 12px; text-decoration: none; color: inherit;">
            <i class="fa-solid fa-globe" style="color: var(--primary-color);"></i>
            <span style="font-size: 0.9rem;">공식 홈페이지</span>
          </a>
        </div>
      </div>

      <div style="margin-top: 2rem;">
        <button class="btn-primary" style="width: 100%; padding: 1rem; font-size: 1rem;" onclick="contactInvestor(${investor.id})">연락하기 매칭 요청</button>
      </div>
    </div>
  `;

  document.getElementById("investorModal").style.display = "flex";
  document.body.style.overflow = "hidden";
}

// 모달 닫기
function closeInvestorModal() {
  document.getElementById("investorModal").style.display = "none";
  document.body.style.overflow = "auto";
}

// 모달 외부 클릭 시 닫기
window.onclick = function (event) {
  const modal = document.getElementById("investorModal");
  if (event.target === modal) {
    closeInvestorModal();
  }
};

// 특수 필터 토글 (모든 투자자, TPS, LIPS, TOPS)
function toggleSpecialFilter(value) {
  const items = document.querySelectorAll(".special-tag");
  const clickedItem = document.querySelector(
    `.special-tag[data-special="${value}"]`,
  );

  if (value === "all") {
    // '모든 투자자' 클릭 시 다른 특수 필터들 비활성화
    items.forEach((item) => item.classList.remove("active"));
    clickedItem.classList.add("active");
  } else {
    // TPS, LIPS, TOPS 토글
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
  applyFilters();
}

// 필터 적용
function applyFilters() {
  const specialFilters = getCheckedValues("special");
  const typeFilters = getCheckedValues("type");
  const stageFilters = getCheckedValues("stage");

  filteredInvestors = investorsData.filter((investor) => {
    // 검색어 필터
    let matchSearch = true;
    if (searchQuery.length > 0) {
      const query = searchQuery.toLowerCase();
      matchSearch =
        investor.name.toLowerCase().includes(query) ||
        investor.company.toLowerCase().includes(query) ||
        investor.description.toLowerCase().includes(query) ||
        investor.fundDescription.toLowerCase().includes(query) ||
        formatType(investor.type).toLowerCase().includes(query);
    }

    // 특수 필터 (복수 선택 가능, AND 조건)
    let matchSpecial = true;
    if (specialFilters.length > 0 && !specialFilters.includes("all")) {
      matchSpecial = specialFilters.every((filter) => {
        if (filter === "tps") return investor.tps;
        if (filter === "lips") return investor.lips;
        if (filter === "tops") return investor.tops;
        if (filter === "bookmarked")
          return BookmarkMgr.isBookmarked("investors", investor.id);
        return false;
      });
    }

    // 투자유형별 필터 (체크박스)
    const matchType =
      typeFilters.length === 0 ||
      typeFilters.includes("all-types") ||
      typeFilters.includes(investor.type);

    // 투자단계별 필터 (체크박스)
    const matchStage =
      stageFilters.length === 0 ||
      investor.stages.some((stage) => stageFilters.includes(stage));

    return matchSearch && matchSpecial && matchType && matchStage;
  });

  renderInvestors(filteredInvestors);
  updateResultsCount(filteredInvestors.length);
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

// 필터 초기화
function resetFilters() {
  // 검색어 초기화
  clearSearch();

  // 모든 체크박스 해제
  document
    .querySelectorAll('.filter-item input[type="checkbox"]')
    .forEach((checkbox) => {
      checkbox.checked =
        checkbox.name === "type" && checkbox.value === "all-types";
    });

  // 특수 필터 초기화
  document.querySelectorAll(".special-tag").forEach((tag) => {
    tag.classList.remove("active");
  });
  const allTag = document.querySelector('.special-tag[data-special="all"]');
  if (allTag) allTag.classList.add("active");

  filteredInvestors = [...investorsData];
  renderInvestors(filteredInvestors);
  updateResultsCount(filteredInvestors.length);
}

// 정렬
function sortInvestors() {
  const sortValue = document.getElementById("sortSelect").value;

  let sorted = [...filteredInvestors];

  switch (sortValue) {
    case "name":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "investments":
      sorted.sort((a, b) => b.investments - a.investments);
      break;
    case "recent":
    default:
      sorted = [...filteredInvestors];
      break;
  }

  renderInvestors(sorted);
}

// 결과 수 업데이트
function updateResultsCount(count) {
  document.getElementById("totalCount").textContent = count;
}

// 투자자 연락하기
function contactInvestor(id) {
  const investor = investorsData.find((inv) => inv.id === id);
  if (investor) {
    alert(
      `${investor.name}님에게 연락 요청을 보냈습니다.\n곧 연락처 정보를 받으실 수 있습니다.`,
    );
    // 실제로는 여기서 API 호출하여 연락 요청 전송
  }
}

// 북마크 토글 삭제 (handleBookmarkUpdate로 대체)

// 포맷 헬퍼 함수
function formatStage(stage) {
  const stageMap = {
    "pre-seed": "PRE-SEED",
    seed: "SEED",
    "pre-a": "PRE-A",
    "series-a": "SERIES A",
    "series-b": "SERIES B+",
  };
  return stageMap[stage] || stage;
}

function formatType(type) {
  const typeMap = {
    vc: "VC",
    llc: "LLC",
    "tech-finance": "신기술금융",
    cvc: "CVC",
    accelerator: "AC",
    angel: "엔젤",
    "angel-club": "엔젤클럽",
    public: "공공",
    overseas: "해외",
  };
  return typeMap[type] || type;
}
