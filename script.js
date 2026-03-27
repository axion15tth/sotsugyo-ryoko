const page = document.querySelector(".page");
const today = document.getElementById("today");

if (page) {
  window.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
      return;
    }

    page.scrollBy({
      left: event.key === "ArrowRight" ? page.clientWidth : -page.clientWidth,
      behavior: "smooth",
    });
  });
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
