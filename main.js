function showForm() {
  const sections = document.querySelectorAll(".form-section");
  sections.forEach((section) => {
    section.style.display = "none";
  });

  const selectedValue = document.getElementById("category").value;

  if (selectedValue) {
    document.getElementById(selectedValue).style.display = "block";
  }
}

const input = document.getElementById("autocompleteInput");
const suggestionsContainer = document.getElementById("suggestions");
const selectedItemsContainer = document.getElementById("selectedItems");
const selectedItems = new Set(); // Store unique selected items

input.addEventListener("input", function () {
  const value = this.value.toLowerCase();
  suggestionsContainer.innerHTML = "";
  if (!value) {
    suggestionsContainer.style.display = "none";
    return;
  }

  const filteredSuggestions = tshirts.filter(
    (item) =>
      item.model.toLowerCase().includes(value) || item.id.toString() === value
  );

  if (filteredSuggestions.length) {
    suggestionsContainer.style.display = "block";
    filteredSuggestions.forEach((tshirt) => {
      const div = document.createElement("div");
      div.classList.add("autocomplete-suggestion");
      div.textContent = `ID: ${tshirt.id}, Model: ${tshirt.model}`; // Display ID and model

      div.addEventListener("click", function () {
        if (!selectedItems.has(tshirt.id)) {
          selectedItems.add(tshirt.id);
          addSelectedItem(tshirt);
        }
        input.value = "";
        suggestionsContainer.innerHTML = "";
        suggestionsContainer.style.display = "none";
      });
      suggestionsContainer.appendChild(div);
    });
  } else {
    suggestionsContainer.style.display = "none";
  }
});

function addSelectedItem(tshirt) {
  const itemDiv = document.createElement("div");
  itemDiv.classList.add("selected-item");
  itemDiv.textContent = `ID: ${tshirt.id}, Model: ${tshirt.model}`;

  const colorSelect = document.createElement("select");
  colorSelect.innerHTML =
    '<option value="">Select Color</option>' +
    tshirt.colors
      .map((color) => `<option value="${color}">${color}</option>`)
      .join("");
  itemDiv.appendChild(colorSelect);

  const sizeSelect = document.createElement("select");
  sizeSelect.innerHTML =
    '<option value="">Select Size</option>' +
    tshirt.sizes
      .map((size) => `<option value="${size}">${size}</option>`)
      .join("");
  itemDiv.appendChild(sizeSelect);

  const removeBtn = document.createElement("button");
  removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
  removeBtn.classList.add("remove-btn");
  removeBtn.addEventListener("click", function () {
    selectedItems.delete(tshirt.id);
    selectedItemsContainer.removeChild(itemDiv);
  });

  itemDiv.appendChild(removeBtn);
  selectedItemsContainer.appendChild(itemDiv);
}

// Hide suggestions when clicking outside
document.addEventListener("click", function (e) {
  if (!input.contains(e.target)) {
    suggestionsContainer.style.display = "none";
  }
});
