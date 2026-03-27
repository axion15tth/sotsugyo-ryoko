const page = document.querySelector(".page");
const today = document.getElementById("today");

if (page) {
  const jumpTo = (targetId, updateHash = true) => {
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });

    if (updateHash) {
      history.replaceState(null, "", `#${targetId}`);
    }
  };

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href")?.slice(1);

      if (!targetId) {
        return;
      }

      event.preventDefault();
      jumpTo(targetId);
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
      return;
    }

    page.scrollBy({
      left: event.key === "ArrowRight" ? page.clientWidth : -page.clientWidth,
      behavior: "smooth",
    });
  });

  if (window.location.hash) {
    window.addEventListener("load", () => {
      jumpTo(window.location.hash.slice(1), false);
    });
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
