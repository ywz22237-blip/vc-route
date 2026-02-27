// 투자자 데이터
const investorsData = [
  {
    id: 1,
    name: "김태현",
    company: "벤처캐피탈 A",
    avatar: "김",
    investments: 24,
    successRate: 85,
    type: "vc",
    stages: ["pre-seed", "seed", "pre-a"],
    tps: true,
    lips: false,
    tops: true,
    description:
      "초기 스타트업 전문 투자자. 기술 기반 스타트업의 성장 전략 수립을 지원합니다.",
    fundDescription:
      "AI 및 딥테크 중심의 초기 단계 투자펀드를 운용하고 있습니다.",
    logoUrl: "https://via.placeholder.com/150",
    websiteUrl: "https://example.com",
    email: "kim@vcfund-a.com",
    totalInvestment: 150.5,
    portfolio: 24,
    avgInvestment: 6.3,
    exitCount: 5,
  },
  {
    id: 2,
    name: "이수진",
    company: "스타트업 인베스트먼트",
    avatar: "이",
    investments: 18,
    successRate: 78,
    type: "llc",
    stages: ["seed", "series-a"],
    tps: false,
    lips: true,
    tops: false,
    description:
      "핀테크와 이커머스 분야에서 10년 이상의 투자 경험을 보유하고 있습니다.",
    fundDescription: "핀테크 및 이커머스 전문 투자펀드",
    logoUrl: "https://via.placeholder.com/150",
    websiteUrl: "https://example.com",
    email: "lee@startup-invest.com",
    totalInvestment: 220.0,
    portfolio: 18,
    avgInvestment: 12.2,
    exitCount: 3,
  },
  {
    id: 3,
    name: "박준호",
    company: "퓨처벤처스",
    avatar: "박",
    investments: 32,
    successRate: 92,
    type: "vc",
    stages: ["pre-a", "series-a", "series-b"],
    tps: true,
    lips: true,
    tops: true,
    description:
      "헬스케어 AI 전문가. Series A 이상 투자에 집중하며 글로벌 진출을 지원합니다.",
    fundDescription: "헬스케어 AI 및 바이오테크 전문 투자펀드",
    logoUrl: "https://via.placeholder.com/150",
    websiteUrl: "https://futureventures.com",
    email: "park@futureventures.com",
    totalInvestment: 450.0,
    portfolio: 32,
    avgInvestment: 14.1,
    exitCount: 8,
  },
  {
    id: 4,
    name: "최민서",
    company: "그로스캐피탈",
    avatar: "최",
    investments: 15,
    successRate: 73,
    type: "accelerator",
    stages: ["pre-seed", "seed"],
    tps: false,
    lips: false,
    tops: true,
    description:
      "콘텐츠 및 커머스 분야의 초기 스타트업 발굴에 특화되어 있습니다.",
    fundDescription: "콘텐츠 및 커머스 초기 투자 전문",
    logoUrl: "https://via.placeholder.com/150",
    websiteUrl: "https://growthcapital.com",
    email: "choi@growthcapital.com",
    totalInvestment: 80.0,
    portfolio: 15,
    avgInvestment: 5.3,
    exitCount: 2,
  },
  {
    id: 5,
    name: "정우성",
    company: "테크인베스터스",
    avatar: "정",
    investments: 28,
    successRate: 88,
    type: "cvc",
    stages: ["series-a", "series-b"],
    tps: true,
    lips: false,
    tops: false,
    description:
      "모빌리티와 AI 기술 융합 분야에 투자하며, 기술 검증을 중시합니다.",
    fundDescription: "모빌리티 및 AI 기술 융합 투자펀드",
    logoUrl: "https://via.placeholder.com/150",
    websiteUrl: "https://techinvestors.com",
    email: "jung@techinvestors.com",
    totalInvestment: 380.0,
    portfolio: 28,
    avgInvestment: 13.6,
    exitCount: 6,
  },
  {
    id: 6,
    name: "강지은",
    company: "이노베이션 파트너스",
    avatar: "강",
    investments: 21,
    successRate: 81,
    type: "vc",
    stages: ["seed", "pre-a"],
    tps: false,
    lips: true,
    tops: true,
    description:
      "디지털 헬스케어 솔루션과 B2B SaaS 스타트업에 집중 투자합니다.",
    fundDescription: "디지털 헬스케어 및 B2B SaaS 전문 펀드",
    logoUrl: "https://via.placeholder.com/150",
    websiteUrl: "https://innovationpartners.com",
    email: "kang@innovationpartners.com",
    totalInvestment: 180.0,
    portfolio: 21,
    avgInvestment: 8.6,
    exitCount: 4,
  },
  {
    id: 7,
    name: "윤성민",
    company: "스마트벤처캐피탈",
    avatar: "윤",
    investments: 19,
    successRate: 76,
    type: "tech-finance",
    stages: ["pre-a", "series-a"],
    tps: true,
    lips: true,
    tops: false,
    description:
      "금융 AI 솔루션 전문 투자자. 규제 대응 및 라이센싱 지원 가능합니다.",
    fundDescription: "금융 AI 및 핀테크 전문 투자펀드",
    logoUrl: "https://via.placeholder.com/150",
    websiteUrl: "https://smartvc.com",
    email: "yoon@smartvc.com",
    totalInvestment: 250.0,
    portfolio: 19,
    avgInvestment: 13.2,
    exitCount: 4,
  },
  {
    id: 8,
    name: "한소희",
    company: "넥스트제너레이션VC",
    avatar: "한",
    investments: 26,
    successRate: 84,
    type: "vc",
    stages: ["seed", "pre-a", "series-a"],
    tps: false,
    lips: false,
    tops: true,
    description: "크리에이터 이코노미와 AI 콘텐츠 생성 도구에 관심이 많습니다.",
    fundDescription: "크리에이터 이코노미 및 AI 콘텐츠 전문 펀드",
    logoUrl: "https://via.placeholder.com/150",
    websiteUrl: "https://nextgenvc.com",
    email: "han@nextgenvc.com",
    totalInvestment: 200.0,
    portfolio: 26,
    avgInvestment: 7.7,
    exitCount: 5,
  },
  {
    id: 9,
    name: "서준영",
    company: "글로벌인베스트먼트",
    avatar: "서",
    investments: 35,
    successRate: 90,
    type: "overseas",
    stages: ["series-a", "series-b"],
    tps: true,
    lips: true,
    tops: true,
    description:
      "글로벌 시장 진출을 목표로 하는 스타트업에 투자하며 해외 네트워크를 제공합니다.",
    fundDescription: "글로벌 진출 지원 전문 투자펀드",
    logoUrl: "https://via.placeholder.com/150",
    websiteUrl: "https://globalinvest.com",
    email: "seo@globalinvest.com",
    totalInvestment: 520.0,
    portfolio: 35,
    avgInvestment: 14.9,
    exitCount: 10,
  },
  {
    id: 10,
    name: "임하늘",
    company: "시드파트너스",
    avatar: "임",
    investments: 12,
    successRate: 70,
    type: "angel",
    stages: ["pre-seed", "seed"],
    tps: false,
    lips: true,
    tops: false,
    description: "초기 단계 커머스 스타트업의 PMF 달성을 적극 지원합니다.",
    fundDescription: "초기 커머스 스타트업 전문 투자",
    logoUrl: "https://via.placeholder.com/150",
    websiteUrl: "https://seedpartners.com",
    email: "lim@seedpartners.com",
    totalInvestment: 50.0,
    portfolio: 12,
    avgInvestment: 4.2,
    exitCount: 1,
  },
  {
    id: 11,
    name: "오지훈",
    company: "벤처파트너스코리아",
    avatar: "오",
    investments: 22,
    successRate: 79,
    type: "llc",
    stages: ["pre-a", "series-a"],
    tps: true,
    lips: false,
    tops: true,
    description:
      "헬스케어 핀테크 융합 솔루션에 투자하며 의료 네트워크를 보유하고 있습니다.",
    fundDescription: "헬스케어 핀테크 융합 전문 펀드",
    logoUrl: "https://via.placeholder.com/150",
    websiteUrl: "https://vpkorea.com",
    email: "oh@vpkorea.com",
    totalInvestment: 280.0,
    portfolio: 22,
    avgInvestment: 12.7,
    exitCount: 5,
  },
  {
    id: 12,
    name: "신예린",
    company: "퓨처그로스캐피탈",
    avatar: "신",
    investments: 17,
    successRate: 75,
    type: "angel-club",
    stages: ["seed", "pre-a"],
    tps: false,
    lips: true,
    tops: false,
    description: "B2B SaaS와 엔터프라이즈 AI 솔루션에 특화된 투자자입니다.",
    fundDescription: "B2B SaaS 및 엔터프라이즈 AI 전문",
    logoUrl: "https://via.placeholder.com/150",
    websiteUrl: "https://futuregrowth.com",
    email: "shin@futuregrowth.com",
    totalInvestment: 120.0,
    portfolio: 17,
    avgInvestment: 7.1,
    exitCount: 3,
  },
  {
    id: 13,
    name: "조민준",
    company: "중소벤처기업진흥공단",
    avatar: "조",
    investments: 45,
    successRate: 82,
    type: "public",
    stages: ["pre-seed", "seed", "pre-a"],
    tps: true,
    lips: true,
    tops: false,
    description: "공공 투자기관으로 정책자금 및 보증 지원을 제공합니다.",
    fundDescription: "중소벤처기업 정책자금 및 보증 지원",
    logoUrl: "https://via.placeholder.com/150",
    websiteUrl: "https://kosmes.or.kr",
    email: "cho@kosmes.or.kr",
    totalInvestment: 600.0,
    portfolio: 45,
    avgInvestment: 13.3,
    exitCount: 7,
  },
  {
    id: 14,
    name: "황서연",
    company: "테크액셀러레이터",
    avatar: "황",
    investments: 30,
    successRate: 77,
    type: "accelerator",
    stages: ["pre-seed", "seed"],
    tps: false,
    lips: false,
    tops: true,
    description: "3개월 집중 육성 프로그램과 함께 초기 투자를 제공합니다.",
    fundDescription: "초기 스타트업 육성 프로그램 및 투자",
    logoUrl: "https://via.placeholder.com/150",
    websiteUrl: "https://techaccelerator.com",
    email: "hwang@techaccelerator.com",
    totalInvestment: 90.0,
    portfolio: 30,
    avgInvestment: 3.0,
    exitCount: 2,
  },
  {
    id: 15,
    name: "배현우",
    company: "글로벌CVC",
    avatar: "배",
    investments: 38,
    successRate: 89,
    type: "cvc",
    stages: ["series-a", "series-b"],
    tps: true,
    lips: true,
    tops: true,
    description: "대기업 계열 CVC로 전략적 파트너십과 시너지를 제공합니다.",
    fundDescription: "대기업 연계 전략적 투자펀드",
    logoUrl: "https://via.placeholder.com/150",
    websiteUrl: "https://globalcvc.com",
    email: "bae@globalcvc.com",
    totalInvestment: 550.0,
    portfolio: 38,
    avgInvestment: 14.5,
    exitCount: 9,
  },
];

let filteredInvestors = [...investorsData];
let searchQuery = "";

// 페이지 로드 시 투자자 카드 렌더링
document.addEventListener("DOMContentLoaded", () => {
  renderInvestors(investorsData);
  updateResultsCount(investorsData.length);
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
