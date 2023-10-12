document.addEventListener("DOMContentLoaded", function () {
  const helpButton = document.getElementById("helpButton");
  const popupContainer = document.getElementById("popupContainer");
  const closeButton = document.getElementById("closeButton");

  helpButton.addEventListener("click", () => {
    popupContainer.style.display = "block";
  });

  closeButton.addEventListener("click", () => {
    popupContainer.style.display = "none";
  });

  // ปิด Pop-up เมื่อคลิกนอกเนื้อหา Pop-up
  popupContainer.addEventListener("click", (e) => {
    if (e.target === popupContainer) {
      popupContainer.style.display = "none";
    }
  });

  // ปิด Pop-up เมื่อกดปุ่ม Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      popupContainer.style.display = "none";
    }
  });

  helpButton.addEventListener("click", () => {
    popupContainer.style.display = "block";
  });

  closeButton.addEventListener("click", () => {
    popupContainer.style.display = "none";
  });

  popupContainer.addEventListener("click", (e) => {
    if (e.target === popupContainer) {
      popupContainer.style.display = "none";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      popupContainer.style.display = "none";
    }
  });
});
