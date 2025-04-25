document.addEventListener("DOMContentLoaded", () => {
  const calcBtn = document.getElementById("calc-container-price");
  const clearBtn = document.getElementById("clear-container-price");
  const containerPriceInput = document.getElementById("container-price");
  const unitsPerContainerDiv = document.getElementById("units-per-container");
  const pricePerUnitDiv = document.getElementById("price-per-unit");

  // Load saved container price if it exists
  if (localStorage.getItem("containerPrice")) {
    containerPriceInput.value = localStorage.getItem("containerPrice");
  }

  // Function to format numbers with thousand separators
  function formatNumber(input) {
    // Remove all non-digit characters
    let value = input.value.replace(/\D/g, "");

    // Add thousand separators
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Update the input value
    input.value = value;
  }

  // Function to format number with thousand separators
  function formatNumberWithSeparators(num) {
    // Convert to string and remove any existing commas
    let str = num.toString().replace(/,/g, "");

    // Add thousand separators
    str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return str;
  }

  // Add input event listener for number formatting
  containerPriceInput.addEventListener("input", function (e) {
    formatNumber(this);
  });

  // Calculate and show units per container immediately
  function showUnitsPerContainer() {
    // Get the dimensions from localStorage
    const length = parseFloat(localStorage.getItem("length"));
    const width = parseFloat(localStorage.getItem("width"));
    const height = parseFloat(localStorage.getItem("height"));

    if (isNaN(length) || isNaN(width) || isNaN(height)) {
      unitsPerContainerDiv.innerText = "لطفاً ابتدا ابعاد کالا را در صفحه اصلی وارد کنید.";
      return;
    }

    // Calculate unit volume
    const unitVolume = (length * width * height) / 1000000;

    // Calculate how many units can fit in a container (40-foot container = 67.5 CBM)
    const containerVolume = 67.5;
    const unitsPerContainer = Math.floor(containerVolume / unitVolume);

    // Display result
    unitsPerContainerDiv.innerText = `تعداد واحد در کانتینر: ${formatNumberWithSeparators(unitsPerContainer)} واحد`;
  }

  // Show units per container when page loads
  showUnitsPerContainer();

  calcBtn.addEventListener("click", () => {
    // Get the container price
    const containerPrice = parseFloat(containerPriceInput.value.replace(/,/g, ""));

    if (isNaN(containerPrice) || containerPrice <= 0) {
      alert("لطفاً قیمت کانتینر را به درستی وارد کنید.");
      return;
    }

    // Store container price in localStorage
    localStorage.setItem("containerPrice", containerPriceInput.value);

    // Get the dimensions from localStorage
    const length = parseFloat(localStorage.getItem("length"));
    const width = parseFloat(localStorage.getItem("width"));
    const height = parseFloat(localStorage.getItem("height"));

    if (isNaN(length) || isNaN(width) || isNaN(height)) {
      alert("لطفاً ابتدا ابعاد کالا را در صفحه اصلی وارد کنید.");
      return;
    }

    // Calculate unit volume
    const unitVolume = (length * width * height) / 1000000;

    // Calculate how many units can fit in a container (40-foot container = 67.5 CBM)
    const containerVolume = 67.5;
    const unitsPerContainer = Math.floor(containerVolume / unitVolume);

    // Calculate price per unit
    const pricePerUnit = containerPrice / unitsPerContainer;

    // Display results
    pricePerUnitDiv.innerText = `قیمت هر واحد: ${formatNumberWithSeparators(Math.round(pricePerUnit))} تومان`;
  });

  clearBtn.addEventListener("click", () => {
    containerPriceInput.value = "";
    pricePerUnitDiv.innerText = "قیمت هر واحد:";
    localStorage.removeItem("containerPrice");
  });
});
