const supportedPages = new Set(["lr4", "lre", "lr5-pro"]);
const requestedPage = new URLSearchParams(window.location.search).get("page");
const activePage = supportedPages.has(requestedPage) ? requestedPage : "lr4";

document.querySelectorAll(".model-nav a").forEach((link) => {
    const isActive = link.dataset.page === activePage;
    link.classList.toggle("active", isActive);

    if (isActive) {
        link.setAttribute("aria-current", "page");
    } else {
        link.removeAttribute("aria-current");
    }
});

document.querySelectorAll(".lr4-card").forEach((card) => {
    card.hidden = activePage !== "lr4";
});

document.querySelectorAll(".other-model-card").forEach((card) => {
    card.hidden = activePage === "lr4";
});
