// اطمینان از اینکه کد بعد از بارگذاری کامل المان‌های HTML اجرا می‌شود
document.addEventListener("DOMContentLoaded", function () {
  // انتخاب دکمه محاسبه
  const calcBtn = document.getElementById("calc-btn");

  // انتخاب نمایش نتیجه
  const resultDiv = document.getElementById("result");

  // عملکرد دکمه محاسبه
  calcBtn.addEventListener("click", function () {
    // گرفتن مقادیر از ورودی‌ها
    const length = parseFloat(document.getElementById("length").value);
    const width = parseFloat(document.getElementById("width").value);
    const height = parseFloat(document.getElementById("height").value);
    const quantity = parseInt(document.getElementById("quantity").value);

    // بررسی معتبر بودن مقادیر
    if (
      isNaN(length) ||
      isNaN(width) ||
      isNaN(height) ||
      isNaN(quantity) ||
      length <= 0 ||
      width <= 0 ||
      height <= 0 ||
      quantity <= 0
    ) {
      alert("لطفاً تمام مقادیر را به درستی وارد کنید (باید اعداد مثبت باشند).");
      return;
    }

    // محاسبه حجم بر اساس طول، عرض، ارتفاع و تعداد
    const cbm = ((length * width * height) / 1000000) * quantity;

    // نمایش نتیجه در بخش مربوطه
    resultDiv.innerText = `حجم کل: ${cbm.toFixed(4)} متر مکعب`;
  });

  // انتخاب دکمه پاک کردن
  const clearBtn = document.getElementById("clear-btn");

  // عملکرد دکمه پاک کردن
  clearBtn.addEventListener("click", function () {
    // پاک کردن مقادیر ورودی‌ها
    document.getElementById("length").value = "";
    document.getElementById("width").value = "";
    document.getElementById("height").value = "";
    document.getElementById("quantity").value = "1";

    // بازنشانی نتیجه
    resultDiv.innerText = "حجم:";
  });
});
