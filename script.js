const form = document.getElementById("medicine-form");
const tableBody = document.querySelector("#medicine-table tbody");
const searchInput = document.getElementById("search-input");
const totalValueDisplay = document.getElementById("total-value");

let medicines = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("med-name").value;
  const brand = document.getElementById("med-brand").value;
  const qty = parseInt(document.getElementById("med-qty").value);
  const price = parseFloat(document.getElementById("med-price").value);
  const expiry = document.getElementById("med-expiry").value;

  const medicine = { name, brand, qty, price, expiry };
  medicines.push(medicine);

  form.reset();
  updateTable();
});

function updateTable() {
  tableBody.innerHTML = "";

  const filtered = medicines.filter(med =>
    med.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  let total = 0;

  filtered.forEach((med, index) => {
    const row = document.createElement("tr");

    const isExpired = new Date(med.expiry) < new Date();
    if (isExpired) row.classList.add("expired");

    total += med.qty * med.price;

    row.innerHTML = `
      <td>${med.name}</td>
      <td>${med.brand}</td>
      <td>${med.qty}</td>
      <td>${med.price.toFixed(2)}</td>
      <td>${med.expiry}</td>
      <td><button onclick="deleteMedicine(${index})">Delete</button></td>
    `;

    tableBody.appendChild(row);
  });

  totalValueDisplay.textContent = `Total Inventory Value: $${total.toFixed(2)}`;
}

function deleteMedicine(index) {
  if (confirm("Are you sure you want to delete this medicine?")) {
    medicines.splice(index, 1);
    updateTable();
  }
}

searchInput.addEventListener("input", updateTable);
