const API_KEY = "";

const $select = document.getElementById("filterSelect");
const $nav = document.getElementById("gnb");
const $textBtn = document.querySelector(".textBtn");
const $dateBtn = document.querySelector(".dateBtn");
let $inputText = document.querySelector(".inputText input");
let $inputDate = document.querySelector(".inputDate input");
const $modal = document.querySelector(".modal");
const $loader = document.querySelector(".loader");

// 페이지네이션에 활용하는 변수
const pageSize = 9;
let groupSize = window.innerWidth < 1000 ? 5 : 10;
let totalResults = 0;
let page = 1;
let currentPage = 1;

// api 검색기능에 활용
let currentCodename = null;
let currentTitle = null;
let currentDate = null;

// api를 활용해 dataList 가져옴
const fetchData = async (
  codename = null,
  title = null,
  date = null,
  pageNum = 1
) => {
  try {
    //페이지 로딩 스피너
    $loader.style.display = "block";

    currentCodename = codename;
    currentTitle = title;
    currentDate = date;

    const encodeCodename = codename ? codename : "%20";
    const encodeTitle = title ? title : "%20";
    const encodeDate = date ? date : "%20";
    const startIdx = (pageNum - 1) * pageSize + 1;
    const endIdx = pageNum * pageSize;

    let url = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/${startIdx}/${endIdx}/${encodeCodename}/${encodeTitle}/${encodeDate}`;

    const res = await fetch(url);
    const data = await res.json();
    dataList = data.culturalEventInfo.row;
    totalResults = data.culturalEventInfo.list_total_count;

    renderData(dataList);
    pagination();
    console.log(dataList);
  } catch (e) {
    console.error(e);
  } finally {
    $loader.style.display = "none";
  }
};

// 가져온 데이터의 list html 생성
const createHtml = (info) => {
  const listImage = info.MAIN_IMG || "./img/noimg.jpeg";
  const title = info.TITLE || "제목없음";
  const place = info.PLACE || "장소정보없음";
  const date = info.DATE || "0000-00-00";
  return `
          <li>
            <div class="listImg"><img src="${listImage}" alt="" /></div>
            <p class="title">${title}</p>
            <p class="place">${place}</p>
            <p class="listDate">${date}</p>
          </li>`;
};

// 데이터를 하나씩 생성하기 위해 렌더링
const renderData = (dataList) => {
  const dataHtml = dataList.map((data) => createHtml(data)).join("");
  document.getElementById("listCon").innerHTML = dataHtml;

  // 모달창 생성을 위한 렌더링
  listCon.querySelectorAll("li").forEach((li, index) => {
    li.addEventListener("click", () => openModal(dataList[index]));
  });
};

// 이동할 페이지의 데이터 fetch
const movePage = (pageNum) => {
  page = pageNum;
  currentPage = pageNum;
  fetchData(currentCodename, currentTitle, currentDate, pageNum);
};

// 페이지네이션 함수
const pagination = () => {
  let pageGroup = Math.ceil(page / groupSize);
  let lastPage = Math.min(
    Math.ceil(totalResults / pageSize),
    pageGroup * groupSize
  );
  let firstPage = (pageGroup - 1) * groupSize + 1;
  let totalPage = Math.ceil(totalResults / pageSize);
  let prevGroup = (pageGroup - 2) * groupSize + 1;
  let nextGroup = pageGroup * groupSize + 1;

  let paginationHtml = `<button class="next" ${
    pageGroup == 1 ? "disabled" : ""
  } onClick='movePage(${prevGroup})'>
  <i class="fa-solid fa-angles-left"></i></button>`;

  paginationHtml += `<button class="next" ${
    pageGroup == 1 ? "disabled" : ""
  } onClick='movePage(${
    currentPage - 1
  })'><i class="fa-solid fa-angle-left"></i></button>`;

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHtml += `<button class='${
      i == currentPage ? "on" : ""
    }' onClick='movePage(${i})'>${i}</button>`;
  }

  paginationHtml += `<button class="next" ${
    pageGroup * groupSize >= totalPage ? "disabled" : ""
  } onClick='movePage(${
    currentPage + 1
  })'><i class="fa-solid fa-angle-right"></i></button>`;

  paginationHtml += `<button class="next" ${
    pageGroup * groupSize >= totalPage ? "disabled" : ""
  } onClick='movePage(${nextGroup})'>
  <i class="fa-solid fa-angles-right"></i></button>`;

  document.querySelector(".pgCon").innerHTML = paginationHtml;
};

// 카테고리 선택
$nav.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button) return;

  $nav.querySelectorAll("button").forEach((btn) => {
    btn.classList.remove("selected");
  });
  button.classList.add("selected");

  const codename = button.dataset.cate;

  currentPage = 1;
  fetchData(codename);

  $inputText.value = "";
  $inputDate.value = "";
});

// 행사명 검색
const textSearch = () => {
  const searchWord = $inputText.value;
  currentPage = 1;
  fetchData(null, searchWord);
};

$textBtn.addEventListener("click", () => {
  textSearch();
});

$inputText.addEventListener("keyup", (e) => {
  if (e.key !== "Enter") return;
  textSearch();
});

// 날짜 검색
const dateSearch = () => {
  const searchDate = $inputDate.value;
  currentPage = 1;
  fetchData(null, null, searchDate);
};

$dateBtn.addEventListener("click", () => {
  dateSearch();
});

$inputDate.addEventListener("keyup", (e) => {
  if (e.key !== "Enter") return;
  dateSearch();
});

// 행사명, 날짜 검색 옵션 선택
$select.addEventListener("change", function () {
  const textOpt = document.querySelector(".inputText");
  const dateOpt = document.querySelector(".inputDate");

  if (this.value === "title") {
    textOpt.style.display = "flex";
    dateOpt.style.display = "none";
  } else if (this.value === "date") {
    textOpt.style.display = "none";
    dateOpt.style.display = "flex";
  }
});

const $bar = document.querySelector(".bar");
const $navButtons = document.querySelectorAll("nav button");

// 메뉴바 여닫기
$bar.addEventListener("click", () => {
  $nav.classList.toggle("on");
  $navButtons.forEach((button) => {
    button.classList.toggle("on");
  });
});

// 모달창 생성 함수
const createModal = (info) => {
  const title = info.TITLE || "홈페이지에서 제목 확인";
  const guname = info.GUNAME || "";
  const place = info.PLACE || "홈페이지에서 장소 확인";
  const useTrgt = info.USE_TRGT || "홈페이지에서 연령 확인";
  const useFee = info.USE_FEE || "홈페이지에서 이용요금 확인";
  const date = info.DATE || "0000-00-00";
  const orgLink = info.ORG_LINK || "#";

  $modal.querySelector(".modalContent").innerHTML = `
        <button class="modalClose"><i class="fa-solid fa-xmark"></i></button>
        <p class="title">${title}</p>
        <p>[${guname}] ${place}</p>
        <p>${useTrgt}</p>
        <p>${useFee}</p>
        <p>${date}</p>
        <a class="link" href="${orgLink}"><i class="fa-solid fa-link"></i> 더보기</a>
    `;
};

// 모달 여닫는 함수
const openModal = (info) => {
  createModal(info);
  $modal.classList.remove("hidden");

  const $modalCloseButton = document.querySelector(".modalClose");

  $modalCloseButton.addEventListener("click", () => {
    $modal.classList.add("hidden");
  });
};

// 윈도우 크기에 따라 페이지네이션 groupSize 변경
window.addEventListener("resize", () => {
  groupSize = window.innerWidth < 1000 ? 5 : 10;
  pagination();
});

fetchData();
