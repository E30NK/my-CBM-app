// Get DOM elements
const weightInput = document.getElementById("weight");
const quantityInput = document.getElementById("weight-quantity");
const shippingCostInput = document.getElementById("shipping-cost");
const calcBtn = document.getElementById("weight-calc-btn");
const clearBtn = document.getElementById("clear-weight-btn");
const weightResult = document.getElementById("weight-result");
const shippingResult = document.getElementById("shipping-result");

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

// Function to format number with thousand separators
function formatNumberWithSeparators(num) {
  // Convert to string and remove any existing commas
  let str = num.toString().replace(/,/g, "");

  // Add thousand separators
  str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return str;
}

// Calculate total weight and shipping cost
function calculateWeight() {
  // Remove commas before calculation
  const weight = parseFloat(weightInput.value.replace(/,/g, "")) || 0;
  const quantity = parseInt(quantityInput.value.replace(/,/g, "")) || 0;
  const shippingCost =
    parseFloat(shippingCostInput.value.replace(/,/g, "")) || 0;

  const totalWeight = weight * quantity;
  const totalShippingCost = totalWeight * shippingCost;

  // Format weight with 2 decimal places and thousand separators
  const formattedWeight = formatNumberWithSeparators(totalWeight.toFixed(2));
  weightResult.textContent = `وزن: ${formattedWeight} کیلوگرم`;

  // Format shipping cost with thousand separators
  const formattedShippingCost = formatNumberWithSeparators(
    totalShippingCost.toFixed(0)
  );
  shippingResult.textContent = `کرایه کل: ${formattedShippingCost} تومان`;
}

// Clear all inputs and results
function clearInputs() {
  weightInput.value = "";
  quantityInput.value = "1";
  shippingCostInput.value = "";
  weightResult.textContent = "وزن:";
  shippingResult.textContent = "کرایه کل:";
}

// Event listeners
calcBtn.addEventListener("click", calculateWeight);
clearBtn.addEventListener("click", clearInputs);

// Add input event listeners for real-time calculation and formatting
weightInput.addEventListener("input", (e) => {
  formatNumber(e.target);
  calculateWeight();
});

quantityInput.addEventListener("input", (e) => {
  formatNumber(e.target);
  calculateWeight();
});

shippingCostInput.addEventListener("input", (e) => {
  formatNumber(e.target);
  calculateWeight();
});
