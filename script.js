// 여기만 수정하면 돼요!
// date는 반드시 YYYY-MM-DD 형식으로 적기
// password는 편지마다 다르게 설정 가능
const letters = [
  {
    date: "2026-07-06",
    title: "오늘의 편지",
    password: "0418",
    content: `오늘 하루 어땠어?

나는 오늘도 네 생각이 많이 났어.
별거 아닌 하루도 너랑 이어져 있다고 생각하면 조금 더 특별해지는 것 같아.

이 편지를 열어줘서 고마워.
오늘도 많이 좋아해. 💙`
  },
  {
    date: "2026-07-07",
    title: "내일의 편지",
    password: "0707",
    content: `이건 내일 열 수 있는 편지야.

내일의 너도 분명 잘하고 있을 거야.
늘 응원하고 있어.`
  },
  {
    date: "2026-07-08",
    title: "그 다음 날의 편지",
    password: "blue",
    content: `오늘도 편지를 열어줘서 고마워.

하루하루 하나씩 쌓이는 우리 이야기가 너무 소중해.`
  }
];

const passwordInput = document.getElementById("passwordInput");
const message = document.getElementById("message");
const letterBox = document.getElementById("letterBox");
const letterDate = document.getElementById("letterDate");
const letterTitle = document.getElementById("letterTitle");
const letterContent = document.getElementById("letterContent");
const letterList = document.getElementById("letterList");
const todayDate = document.getElementById("todayDate");

const today = getKoreaDateString();
const todayLetter = letters.find(letter => letter.date === today);

todayDate.textContent = formatDate(today);
renderLetterList();

passwordInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    openTodayLetter();
  }
});

function openTodayLetter() {
  if (!todayLetter) {
    showMessage("오늘 등록된 편지가 아직 없어요.", "error");
    return;
  }

  const inputPassword = passwordInput.value.trim();

  if (inputPassword === todayLetter.password) {
    showMessage("암호가 맞았어요!", "success");
    showLetter(todayLetter);
  } else {
    showMessage("암호가 틀렸어요! 다시 시도해 주세요.", "error");
    letterBox.classList.add("hidden");
  }
}

function showLetter(letter) {
  letterDate.textContent = formatDate(letter.date);
  letterTitle.textContent = letter.title;
  letterContent.textContent = letter.content;
  letterBox.classList.remove("hidden");
}

function renderLetterList() {
  letterList.innerHTML = "";

  letters.forEach(letter => {
    const isOpen = letter.date <= today;

    const item = document.createElement("div");
    item.className = "letter-item";

    item.innerHTML = `
      <div class="letter-icon">${isOpen ? "💌" : "✉️"}</div>
      <div class="letter-info">
        <strong>${formatDate(letter.date)}</strong>
        <span>${letter.title}</span>
      </div>
      <div class="status ${isOpen ? "" : "locked"}">
        ${isOpen ? "열람 가능 ›" : "잠김 🔒"}
      </div>
    `;

    letterList.appendChild(item);
  });
}

function showMessage(text, type) {
  message.textContent = text;
  message.className = `message ${type}`;
}

function scrollToList() {
  document.getElementById("list").scrollIntoView({ behavior: "smooth" });
}

function getKoreaDateString() {
  const now = new Date();
  const koreaTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
  const year = koreaTime.getFullYear();
  const month = String(koreaTime.getMonth() + 1).padStart(2, "0");
  const day = String(koreaTime.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const week = days[date.getDay()];

  return `${year}.${month}.${day} (${week})`;
}
