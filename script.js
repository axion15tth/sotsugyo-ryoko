const today = document.getElementById("today");

if (today) {
  const formatted = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(new Date());

  today.textContent = `${formatted} 時点のしおり。集合に迷ったら Discord を見ること。`;
}
