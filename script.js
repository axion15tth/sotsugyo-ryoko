const tripStart = new Date("2026-03-28T09:00:00+09:00");
const tripEnd = new Date("2026-03-29T16:59:00+09:00");
const countdown = document.getElementById("countdown");
const today = document.getElementById("today");

if (countdown) {
  const now = new Date();

  if (now < tripStart) {
    const diffMs = tripStart.getTime() - now.getTime();
    const hourMs = 1000 * 60 * 60;
    const hours = Math.max(1, Math.ceil(diffMs / hourMs));

    countdown.textContent = `出発まであと${hours}時間`;
  } else if (now <= tripEnd) {
    countdown.textContent = "旅行中";
  } else {
    countdown.textContent = "伝説化済み";
  }
}

if (today) {
  const formatted = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(new Date());

  today.textContent = `${formatted} 時点のしおり。集合に迷ったら Discord を見ること。`;
}
