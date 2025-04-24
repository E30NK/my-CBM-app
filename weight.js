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

document
  .getElementById("clear-weight-btn")
  .addEventListener("click", function () {
    document.getElementById("weight-quantity").value = "1";
    document.getElementById("weight-result").innerText = "وزن:";
  });
