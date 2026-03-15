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
