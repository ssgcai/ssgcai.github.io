document.querySelectorAll("[data-day-tabs]").forEach((tabRoot) => {
  const buttons = Array.from(tabRoot.querySelectorAll(".tab-button"));
  const panels = Array.from(tabRoot.querySelectorAll(".tab-panel"));

  if (!buttons.length || !panels.length) {
    return;
  }

  const activateTab = (button) => {
    const targetId = button.dataset.tabTarget;

    buttons.forEach((currentButton) => {
      const isActive = currentButton === button;
      currentButton.classList.toggle("is-active", isActive);
      currentButton.setAttribute("aria-selected", String(isActive));
      currentButton.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isActive = panel.id === targetId;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  };

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => activateTab(button));

    button.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
        return;
      }

      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (index + direction + buttons.length) % buttons.length;
      const nextButton = buttons[nextIndex];
      nextButton.focus();
      activateTab(nextButton);
    });
  });

  const initiallyActiveButton =
    buttons.find((button) => button.getAttribute("aria-selected") === "true") || buttons[0];

  activateTab(initiallyActiveButton);
});

document.querySelectorAll("[data-music-toggle]").forEach((button) => {
  const panelId = button.getAttribute("aria-controls");
  const panel = panelId ? document.getElementById(panelId) : null;

  if (!panel) {
    return;
  }

  button.addEventListener("click", () => {
    const nextExpanded = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(nextExpanded));
    panel.hidden = !nextExpanded;

    if (nextExpanded && !panel.querySelector("iframe")) {
      const iframe = document.createElement("iframe");
      iframe.src =
        "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/alex-gu-254660687/starships&color=%2369aee6&auto_play=true&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false";
      iframe.allow = "autoplay";
      iframe.loading = "lazy";
      iframe.title = "Alex's Starships cover";
      panel.appendChild(iframe);
    }
  });
});
