const menu = document.getElementById("menu");
const menuButton = document.getElementById("menu-btn");

if (menu && menuButton) {
    menuButton.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open menu");
        });
    });
}

document.querySelectorAll(".photo[data-photo]").forEach(element => {
    const filename = element.dataset.photo;
    element.style.setProperty("--img", `url("images/${filename}")`);
});

const navigationLinks = menu ? [...menu.querySelectorAll('a[href^="#"]')] : [];
const sections = navigationLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navigationLinks.forEach(link => {
                    const isActive = link.getAttribute("href") === `#${entry.target.id}`;
                    link.classList.toggle("active", isActive);
                    if (isActive) link.setAttribute("aria-current", "location");
                    else link.removeAttribute("aria-current");
                });
            }
        });
    }, { threshold: 0.3 });
    sections.forEach(section => observer.observe(section));
}

const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();
