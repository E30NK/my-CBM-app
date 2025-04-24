// متغیر برای دکمه‌های انتخاب حالت (حجم / وزن)
const volumeModeButton = document.getElementById("volume-mode");
const weightModeButton = document.getElementById("weight-mode");

// کارت‌های حجم و وزن
const volumeCard = document.getElementById("volume-card");
const weightCard = document.getElementById("weight-card");

// تغییر حالت (حجم یا وزن)
volumeModeButton.addEventListener("click", () => {
  // نمایش کارت حجم و مخفی کردن کارت وزن
  volumeCard.style.display = "block";
  weightCard.style.display = "none";

  // تغییر دکمه‌ها
  volumeModeButton.classList.add("active");
  weightModeButton.classList.remove("active");
});

weightModeButton.addEventListener("click", () => {
  // نمایش کارت وزن و مخفی کردن کارت حجم
  volumeCard.style.display = "none";
  weightCard.style.display = "block";

  // تغییر دکمه‌ها
  weightModeButton.classList.add("active");
  volumeModeButton.classList.remove("active");
});

// محاسبه برای حجم
document.getElementById("calc-btn").addEventListener("click", function () {
  const length = parseFloat(document.getElementById("length").value);
  const width = parseFloat(document.getElementById("width").value);
  const height = parseFloat(document.getElementById("height").value);
  const quantity = parseInt(document.getElementById("quantity").value);

  // بررسی وارد کردن مقادیر صحیح
  if (isNaN(length) || isNaN(width) || isNaN(height) || isNaN(quantity)) {
    alert("لطفاً تمام مقادیر را به‌درستی وارد کنید.");
    return;
  }

  // محاسبه حجم
  const cbm = ((length * width * height) / 1000000) * quantity;
  document.getElementById("result").innerText = `حجم کل: ${cbm.toFixed(
    4
  )} متر مکعب`;
});

// محاسبه برای وزن
document
  .getElementById("weight-calc-btn")
  .addEventListener("click", function () {
    const quantity = parseInt(document.getElementById("weight-quantity").value);
    const selectedProduct =
      document.getElementById("product-select").options[
        document.getElementById("product-select").selectedIndex
      ];
    const productWeight = parseInt(selectedProduct.getAttribute("data-weight"));

    // محاسبه وزن
    const totalWeight = productWeight * quantity;
    document.getElementById(
      "weight-result"
    ).innerText = `وزن کل: ${totalWeight} کیلوگرم`;
  });

// دکمه پاک کردن برای کارت حجم
document.getElementById("clear-btn").addEventListener("click", function () {
  document.getElementById("length").value = "";
  document.getElementById("width").value = "";
  document.getElementById("height").value = "";
  document.getElementById("quantity").value = "1";
  document.getElementById("result").innerText = "حجم:";
});

// دکمه پاک کردن برای کارت وزن
document
  .getElementById("clear-weight-btn")
  .addEventListener("click", function () {
    document.getElementById("weight-quantity").value = "1";
    document.getElementById("weight-result").innerText = "وزن:";
  });
  document.getElementById("back-to-volume").addEventListener("click", () => {
    // نمایش کارت حجم و مخفی کردن کارت وزن
    volumeCard.style.display = "block";
    weightCard.style.display = "none";
  
    // تغییر دکمه‌ها
    volumeModeButton.classList.add("active");
    weightModeButton.classList.remove("active");
  });
  

