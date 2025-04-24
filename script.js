// اطمینان از اینکه کد بعد از بارگذاری کامل المان‌های HTML اجرا می‌شود
document.addEventListener("DOMContentLoaded", () => {
  const calcBtn = document.getElementById("calc-btn");
  const resultDiv = document.getElementById("result");
  const containerResultDiv = document.getElementById("container-result");
  const priceResultDiv = document.getElementById("price-result");
  const clearBtn = document.getElementById("clear-btn");
  const cbmPrice = document.getElementById("cbm-price");
  const inputs = {
    length: document.getElementById("length"),
    width: document.getElementById("width"),
    height: document.getElementById("height"),
    quantity: document.getElementById("quantity"),
  };

  // Container volume in CBM
  const containerVolume = 67.5;

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

  // Add input event listener for CBM price
  cbmPrice.addEventListener("input", (e) => formatNumber(e.target));

  calcBtn.addEventListener("click", () => {
    const values = {
      length: parseFloat(inputs.length.value),
      width: parseFloat(inputs.width.value),
      height: parseFloat(inputs.height.value),
      quantity: parseInt(inputs.quantity.value),
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

    // Calculate total price if CBM price is entered
    if (cbmPrice.value) {
      const price = parseFloat(cbmPrice.value.replace(/,/g, "")) * cbm;
      priceResultDiv.innerText = `کرایه کل کالا: ${price.toLocaleString()} تومان`;
    } else {
      priceResultDiv.innerText = "کرایه کل کالا:";
    }

    // Update results
    document.getElementById('total-volume').textContent = `حجم کل کالا: ${formatNumber(cbm)} متر مکعب`;
    document.getElementById('container-percentage').textContent = `درصد حجم کانتینر: ${formatNumber(ratio)}%`;
    document.getElementById('total-price').textContent = `کرایه کل کالا: ${formatNumber(price)} تومان`;
  });

  clearBtn.addEventListener("click", () => {
    Object.values(inputs).forEach((input) => {
      input.value = input.id === "quantity" ? "1" : "";
    });
    cbmPrice.value = "";
    resultDiv.innerText = "حجم:";
    containerResultDiv.innerText = "نسبت به کانتینر:";
    priceResultDiv.innerText = "قیمت کل:";
  });
});
