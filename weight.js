const elements = {
  weightCalcBtn: document.getElementById("weight-calc-btn"),
  clearWeightBtn: document.getElementById("clear-weight-btn"),
  weightQuantity: document.getElementById("weight-quantity"),
  weightResult: document.getElementById("weight-result"),
  shippingResult: document.getElementById("shipping-result"),
  shippingCost: document.getElementById("shipping-cost"),
  mainMenu: document.getElementById("main-menu"),
  subMenu: document.getElementById("sub-menu"),
};

// Function to format number with thousand separators
function formatNumber(input) {
  // Get cursor position
  const cursorPosition = input.selectionStart;

  // Remove all non-digit characters
  let value = input.value.replace(/[^\d]/g, "");

  // Add thousand separators
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Update input value
  input.value = value;

  // Restore cursor position
  const newCursorPosition =
    cursorPosition + (value.length - input.value.length);
  input.setSelectionRange(newCursorPosition, newCursorPosition);
}

function updateWeightResult(weight, quantity, shippingCost) {
  if (isNaN(weight) || isNaN(quantity) || quantity <= 0) {
    alert("لطفاً تعداد معتبر و زیرمجموعه انتخاب کنید!");
    return;
  }
  const totalWeight = weight * quantity;
  elements.weightResult.textContent = `وزن کل: ${totalWeight} کیلوگرم`;

  if (shippingCost && !isNaN(shippingCost) && shippingCost > 0) {
    const totalShipping = totalWeight * shippingCost;
    elements.shippingResult.textContent = `کرایه کل: ${totalShipping.toLocaleString()} تومان`;
  } else {
    elements.shippingResult.textContent = "کرایه کل:";
  }
}

function clearWeightForm() {
  elements.subMenu.selectedIndex = 0;
  elements.weightQuantity.value = "1";
  elements.shippingCost.value = "";
  elements.weightResult.textContent = "وزن:";
  elements.shippingResult.textContent = "کرایه کل:";
}

function loadSubMenu(selectedCategory) {
  elements.subMenu.innerHTML =
    '<option value="">لطفاً یک زیرمجموعه انتخاب کنید</option>';

  if (!selectedCategory) return;

  fetch(`${selectedCategory}.txt`)
    .then((response) => response.text())
    .then((data) => {
      data.split("\n").forEach((line) => {
        const [productName, weight] = line.split(":");
        if (!productName || !weight) return;

        const option = document.createElement("option");
        option.value = productName.trim();
        option.textContent = `${productName.trim()} (${weight.trim()} کیلوگرم)`;
        option.setAttribute("data-weight", weight.trim());
        elements.subMenu.appendChild(option);
      });
    })
    .catch((error) => console.error("خطا در بارگذاری زیرمجموعه‌ها:", error));
}

// Load initial categories
fetch("categories.txt")
  .then((response) => response.text())
  .then((data) => {
    data.split("\n").forEach((line) => {
      const [value, text] = line.split(",");
      if (!value || !text) return;

      const option = document.createElement("option");
      option.value = value.trim();
      option.textContent = text.trim();
      elements.mainMenu.appendChild(option);
    });
  })
  .catch((error) => console.error("خطا در بارگذاری دسته‌ها:", error));

// Event Listeners
elements.mainMenu.addEventListener("change", (e) =>
  loadSubMenu(e.target.value)
);

// Add input event listener for shipping cost
elements.shippingCost.addEventListener("input", (e) => formatNumber(e.target));

elements.weightCalcBtn.addEventListener("click", () => {
  const selectedOption =
    elements.subMenu.options[elements.subMenu.selectedIndex];

  if (!selectedOption.value) {
    alert("لطفاً یک زیرمجموعه انتخاب کنید!");
    return;
  }

  const weight = parseFloat(selectedOption.getAttribute("data-weight"));
  const quantity = parseInt(elements.weightQuantity.value);
  const shippingCost = parseFloat(
    elements.shippingCost.value.replace(/,/g, "")
  );
  updateWeightResult(weight, quantity, shippingCost);
});

elements.clearWeightBtn.addEventListener("click", clearWeightForm);
