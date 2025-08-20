let isActive = false;

window.addEventListener("toggle-link-status", () => {
  isActive = !isActive;
  if (isActive) {
    highlightLinks();
  } else {
    clearHighlights();
  }
});

function isExternalLink(url) {
  try {
    const linkDomain = new URL(url).hostname;
    const currentDomain = window.location.hostname;
    return linkDomain !== currentDomain;
  } catch (e) {
    return false; // Invalid URL
  }
}

function highlightLinks() {
  const links = document.querySelectorAll("a[href]");
  links.forEach(link => {
    const href = link.href;

    // Avoid duplicate highlights
    if (link.getAttribute("data-status") === "true") return;

    // Check if it's an external link
    if (isExternalLink(href)) {
      // Handle external links immediately without fetch
      const badge = document.createElement("div");
      badge.className = "status-code-box external-link";
      badge.textContent = "EXT";
      badge.title = `External Link: ${new URL(href).hostname}`;

      link.classList.add("link-highlighted", "external-link");
      link.appendChild(badge);
      link.setAttribute("data-status", "true");
      
      // Blue border for external links
      link.style.border = "2px solid #0066cc";
      link.style.padding = "2px";
      link.style.position = "relative"; // Ensure proper positioning for badge
    } else {
      // Handle internal links with status check
      chrome.runtime.sendMessage({ type: "checkStatus", url: href }, (response) => {
        const code = response?.status || 0;

        const badge = document.createElement("div");
        badge.className = "status-code-box internal-link";

        if (code === 0) {
          badge.textContent = "CORS";
          badge.title = "Status unknown: likely CORS block or network failure";
        } else {
          badge.textContent = code;
          badge.title = `HTTP Status: ${code}`;
        }

        link.classList.add("link-highlighted", "internal-link");
        link.appendChild(badge);
        link.setAttribute("data-status", "true");
        link.style.position = "relative"; // Ensure proper positioning for badge

        link.style.border = "2px solid " + (
          code === 200 ? "green" :
          code === 301 || code === 302 ? "orange" :
          code === 404 ? "red" :
          code === 403 ? "purple" :
          code >= 500 ? "black" :
          "gray"
        );
        link.style.padding = "2px";
      });
    }
  });
}

function clearHighlights() {
  document.querySelectorAll("a.link-highlighted").forEach(link => {
    if (link.getAttribute("data-status") === "true") {
      const badge = link.querySelector(".status-code-box");
      if (badge) badge.remove();
      link.classList.remove("link-highlighted", "external-link", "internal-link");
      link.style.border = "";
      link.style.padding = "";
      link.removeAttribute("data-status");
    }
  });
}
