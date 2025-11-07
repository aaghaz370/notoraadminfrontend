const API_URL = "http://localhost:9090/api/books";
const bookSection = document.getElementById("bookSection");

// 🌓 Theme Handling
const themeSelector = document.getElementById("themeSelector");
themeSelector.addEventListener("change", () => {
  const theme = themeSelector.value;
  if (theme === "light") document.body.className = "light";
  else if (theme === "dark") document.body.className = "";
  else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.body.className = prefersDark ? "" : "light";
  }
});

// 📚 Fetch Books
async function fetchBooks() {
  try {
    const res = await fetch(API_URL);
    const books = await res.json();

    bookSection.innerHTML = "";
    books.forEach((b) => {
      const card = document.createElement("div");
      card.className = "book-card";
      card.innerHTML = `
        <img src="${b.thumbnail}" alt="${b.name}" />
        <h3>${b.name}</h3>
        <p>${b.author}</p>
        <button class="edit-btn" onclick="editBook('${b._id}')">Edit</button>
        <button class="delete-btn" onclick="deleteBook('${b._id}')">Delete</button>
      `;
      bookSection.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading books:", err);
    bookSection.innerHTML = "<p>Failed to load books.</p>";
  }
}

async function deleteBook(id) {
  if (!confirm("Delete this book?")) return;
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchBooks();
  } catch (err) {
    alert("Failed to delete.");
  }
}

function editBook(id) {
  window.location.href = `edit.html?id=${id}`;
}

fetchBooks();
