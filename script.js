document.getElementById("calc-btn").addEventListener("click", calculateCBM);
document.getElementById("clear-btn").addEventListener("click", clearFields);

function calculateCBM() {
  const length = parseFloat(document.getElementById("length").value);
  const width = parseFloat(document.getElementById("width").value);
  const height = parseFloat(document.getElementById("height").value);
  const quantity = parseInt(document.getElementById("quantity").value);

  if (isNaN(length) || isNaN(width) || isNaN(height) || isNaN(quantity)) {
    alert("لطفاً تمام مقادیر را به‌درستی وارد کنید.");
    return;
  }

  const cbm = ((length * width * height) / 1000000) * quantity;
  document.getElementById("result").innerText = `حجم کل: ${cbm.toFixed(
    4
  )} متر مکعب`;
}

function clearFields() {
  document.getElementById("length").value = "";
  document.getElementById("width").value = "";
  document.getElementById("height").value = "";
  document.getElementById("quantity").value = "1";
  document.getElementById("result").innerText = "حجم: ";
}
