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

const wikiEmbeds = document.querySelectorAll(".wiki-embed[data-wiki-page]");

wikiEmbeds.forEach(async (card) => {
  const pageName = card.getAttribute("data-wiki-page");
  const wikiUrl = card.getAttribute("data-wiki-url");

  if (!pageName) {
    return;
  }

  try {
    const response = await fetch(
      `https://ja.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageName)}`
    );

    if (!response.ok) {
      throw new Error(`Wikipedia summary fetch failed: ${response.status}`);
    }

    const data = await response.json();

    card.textContent = "";
    card.classList.add("is-loaded");

    if (data.thumbnail?.source) {
      const image = document.createElement("img");
      image.className = "wiki-image";
      image.src = data.thumbnail.source;
      image.alt = `${pageName} のWikipedia画像`;
      card.append(image);
    }

    const title = document.createElement("h3");
    title.className = "wiki-title";
    title.textContent = data.title || pageName;
    card.append(title);

    if (data.description) {
      const meta = document.createElement("p");
      meta.className = "wiki-meta";
      meta.textContent = data.description;
      card.append(meta);
    }

    if (data.extract) {
      const extract = document.createElement("p");
      extract.className = "wiki-extract";
      extract.textContent = data.extract;
      card.append(extract);
    }

    if (wikiUrl) {
      const link = document.createElement("a");
      link.href = wikiUrl;
      link.textContent = "Wikipedia を外で開く";
      card.append(link);
    }
  } catch (error) {
    card.textContent = "";

    const message = document.createElement("p");
    message.className = "embed-warning";
    message.textContent = "Wikipedia の要約を読み込めませんでした。外部リンクを使う。";
    card.append(message);

    if (wikiUrl) {
      const link = document.createElement("a");
      link.href = wikiUrl;
      link.textContent = "Wikipedia を外で開く";
      card.append(link);
    }
  }
});
