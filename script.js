// اطمینان از اینکه کد بعد از بارگذاری کامل المان‌های HTML اجرا می‌شود
document.addEventListener("DOMContentLoaded", () => {
  const calcBtn = document.getElementById("calc-btn");
  const clearBtn = document.getElementById("clear-btn");
  const resultDiv = document.getElementById("result");
  const containerResultDiv = document.getElementById("container-result");
  const priceResultDiv = document.getElementById("price-result");
  const shippingCost = document.getElementById("shipping-cost");
  const inputs = {
    length: document.getElementById("length"),
    width: document.getElementById("width"),
    height: document.getElementById("height"),
    quantity: document.getElementById("quantity"),
  };

  // Container volume in CBM
  const containerVolume = 67.5;

  // Function to format numbers with thousand separators
  function formatNumber(input) {
    // Remove all non-digit characters
    let value = input.value.replace(/\D/g, "");

    // Add thousand separators
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Update the input value
    input.value = value;
  }

  // Add input event listeners for number formatting
  inputs.quantity.addEventListener("input", function (e) {
    formatNumber(this);
  });

  shippingCost.addEventListener("input", function (e) {
    formatNumber(this);
  });

  calcBtn.addEventListener("click", () => {
    const values = {
      length: parseFloat(inputs.length.value),
      width: parseFloat(inputs.width.value),
      height: parseFloat(inputs.height.value),
      quantity: parseInt(inputs.quantity.value.replace(/,/g, "")),
    };

    if (Object.values(values).some((val) => isNaN(val) || val <= 0)) {
      alert("لطفاً تمام مقادیر را به درستی وارد کنید (باید اعداد مثبت باشند).");
      return;
    }

    // Calculate total volume
    const cbm =
      ((values.length * values.width * values.height) / 1000000) *
      values.quantity;
    resultDiv.innerText = `حجم کل کالا: ${cbm.toFixed(2)} متر مکعب`;

    // Calculate container ratio
    const ratio = (cbm / containerVolume) * 100;
    containerResultDiv.innerText = `درصد حجم کانتینر: ${ratio.toFixed(2)}%`;

    // Calculate total price if shipping cost is entered
    if (shippingCost.value) {
      const price = parseFloat(shippingCost.value.replace(/,/g, "")) * cbm;
      priceResultDiv.innerText = `کرایه کل کالا: ${price.toLocaleString()} تومان`;
    } else {
      priceResultDiv.innerText = "کرایه کل کالا:";
    }
  });

  clearBtn.addEventListener("click", () => {
    Object.values(inputs).forEach((input) => {
      input.value = input.id === "quantity" ? "1" : "";
    });
    shippingCost.value = "";
    resultDiv.innerText = "حجم:";
    containerResultDiv.innerText = "نسبت به کانتینر:";
    priceResultDiv.innerText = "قیمت کل:";
  });
});
