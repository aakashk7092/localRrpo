document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("medicine-form");
  const tableBody = document.querySelector("#medicine-table tbody");
  const totalValueDisplay = document.getElementById("total-value");
  const searchInput = document.getElementById("search-input");

  let medicines = JSON.parse(localStorage.getItem("medicines")) || [];

  function updateLocalStorage() {
    localStorage.setItem("medicines", JSON.stringify(medicines));
  }

  function renderTable(data) {
    tableBody.innerHTML = "";
    let total = 0;

    data.forEach((med, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${med.name}</td>
        <td>${med.brand}</td>
        <td>${med.quantity}</td>
        <td>$${med.price.toFixed(2)}</td>
        <td>${med.expiry}</td>
        <td><button onclick="deleteMedicine(${index})">🗑️ Delete</button></td>
      `;
      total += med.price * med.quantity;
      tableBody.appendChild(row);
    });

    totalValueDisplay.textContent = `Total Inventory Value: $${total.toFixed(2)}`;
  }

  window.deleteMedicine = function(index) {
    medicines.splice(index, 1);
    updateLocalStorage();
    renderTable(medicines);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newMed = {
      name: document.getElementById("med-name").value.trim(),
      brand: document.getElementById("med-brand").value.trim(),
      quantity: parseInt(document.getElementById("med-qty").value),
      price: parseFloat(document.getElementById("med-price").value),
      expiry: document.getElementById("med-expiry").value
    };

    medicines.push(newMed);
    updateLocalStorage();
    renderTable(medicines);
    form.reset();
  });

  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = medicines.filter(med =>
      med.name.toLowerCase().includes(keyword) ||
      med.brand.toLowerCase().includes(keyword)
    );
    renderTable(filtered);
  });

  renderTable(medicines); // Initial load
});
