const letters = [
  {
    date: "2026-07-06",
    title: "오늘의 편지",
    password: "0418",
    hint: "우리가 처음 만난 날짜",
    content: `
오늘 하루 어땠어?

나는 오늘도 네 생각을 많이 했어.
항상 고맙고, 많이 사랑해. 💙

- 예은이가 -
    `
  },
  
];

const today = new Date();
today.setHours(0, 0, 0, 0);

const letterList = document.getElementById("letterList");
const selectedDate = document.getElementById("selectedDate");
const selectedTitle = document.getElementById("selectedTitle");
const passwordInput = document.getElementById("passwordInput");
const openBtn = document.getElementById("openBtn");
const hintText = document.getElementById("hintText");
const messageText = document.getElementById("messageText");
const letterBox = document.getElementById("letterBox");
const letterContent = document.getElementById("letterContent");

let currentLetter = null;

function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${dateString.replaceAll("-", ".")} (${days[date.getDay()]})`;
}

function isAvailable(dateString) {
  const letterDate = new Date(dateString + "T00:00:00");
  letterDate.setHours(0, 0, 0, 0);
  return letterDate <= today;
}

function renderLetters() {
  letterList.innerHTML = "";

  letters.forEach((letter, index) => {
    const available = isAvailable(letter.date);

    const item = document.createElement("div");
    item.className = "letter-item";
    item.innerHTML = `
      <div class="letter-left">
        <div class="letter-icon">${available ? "💌" : "✉️"}</div>
        <div>
          <div class="letter-date">${formatDate(letter.date)}</div>
          <div class="letter-title">${letter.title}</div>
        </div>
      </div>
      <div class="letter-status">
        ${available ? "열람 가능 ›" : "잠김 🔒"}
      </div>
    `;

    item.addEventListener("click", () => {
      if (!available) {
        alert("아직 열 수 없는 편지야!");
        return;
      }

      selectLetter(index);
    });

    letterList.appendChild(item);
  });
}

function selectLetter(index) {
  currentLetter = letters[index];

  selectedDate.textContent = formatDate(currentLetter.date);
  selectedTitle.textContent = currentLetter.title;

  passwordInput.value = "";
  messageText.textContent = "";
  letterBox.classList.add("hidden");
  letterContent.textContent = "";

  hintText.textContent = "💡 힌트 : " + currentLetter.hint;
}

function openLetter() {
  if (!currentLetter) {
    alert("먼저 편지를 선택해줘!");
    return;
  }

  const inputPassword = passwordInput.value.trim();

  if (inputPassword === currentLetter.password) {
    messageText.textContent = "암호가 맞았어요!";
    messageText.style.color = "#4a90e2";

    letterContent.textContent = currentLetter.content.trim();
    letterBox.classList.remove("hidden");
  } else {
    messageText.textContent = "암호가 틀렸어요!";
    messageText.style.color = "#e06b6b";
    letterBox.classList.add("hidden");
  }
}

openBtn.addEventListener("click", openLetter);

passwordInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    openLetter();
  }
});

renderLetters();

const firstAvailableIndex = letters.findIndex(letter => isAvailable(letter.date));
if (firstAvailableIndex !== -1) {
  selectLetter(firstAvailableIndex);
}
