const tripDate = new Date("2027-03-15T09:00:00+09:00");
const countdown = document.getElementById("countdown");
const today = document.getElementById("today");

if (countdown) {
  const now = new Date();
  const diffMs = tripDate.getTime() - now.getTime();
  const dayMs = 1000 * 60 * 60 * 24;
  const days = Math.max(0, Math.ceil(diffMs / dayMs));

  countdown.textContent = days === 0 ? "今日です" : `あと${days}日`;
}

if (today) {
  const formatted = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(new Date());

  today.textContent = `${formatted} 時点の内容`;
}
