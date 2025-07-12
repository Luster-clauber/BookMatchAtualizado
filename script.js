// Mock data for demonstration (will be replaced with API calls)
const mockBooks = [
  {
    id: 1,
    title: "O Alquimista",
    author: "Paulo Coelho",
    genre: "ficcao",
    rating: 4.5,
    pages: 163,
    ageRating: "livre",
    description: "Uma jornada de autodescoberta através do deserto.",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    genre: "ficcao",
    rating: 4.8,
    pages: 328,
    ageRating: "14",
    description: "Uma distopia sobre vigilância e controle totalitário.",
  },
  {
    id: 3,
    title: "Harry Potter e a Pedra Filosofal",
    author: "J.K. Rowling",
    genre: "fantasia",
    rating: 4.7,
    pages: 223,
    ageRating: "livre",
    description: "O início da jornada mágica de Harry Potter.",
  },
  {
    id: 4,
    title: "O Código Da Vinci",
    author: "Dan Brown",
    genre: "misterio",
    rating: 4.2,
    pages: 454,
    ageRating: "12",
    description: "Um thriller envolvendo arte, religião e mistério.",
  },
  {
    id: 5,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "historia",
    rating: 4.6,
    pages: 443,
    ageRating: "14",
    description: "Uma breve história da humanidade.",
  },
]

// DOM Elements
const genreSelect = document.getElementById("genre")
const ageRatingSelect = document.getElementById("age-rating")
const ratingSelect = document.getElementById("rating")
const pagesSelect = document.getElementById("pages")
const booksGrid = document.getElementById("books-grid")
const resultsCount = document.getElementById("results-count")
const loading = document.getElementById("loading")
const emptyState = document.getElementById("empty-state")

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  showEmptyState()
})

// Search books based on filters
function searchBooks() {
  showLoading()

  // Simulate API delay
  setTimeout(() => {
    const filters = getFilters()
    const filteredBooks = filterBooks(mockBooks, filters)
    displayBooks(filteredBooks)
  }, 1000)
}

// Get current filter values
function getFilters() {
  return {
    genre: genreSelect.value,
    ageRating: ageRatingSelect.value,
    rating: Number.parseInt(ratingSelect.value) || 0,
    pages: pagesSelect.value,
  }
}

// Filter books based on criteria
function filterBooks(books, filters) {
  return books.filter((book) => {
    // Genre filter
    if (filters.genre && book.genre !== filters.genre) {
      return false
    }

    // Age rating filter
    if (filters.ageRating && book.ageRating !== filters.ageRating) {
      return false
    }

    // Rating filter
    if (filters.rating && book.rating < filters.rating) {
      return false
    }

    // Pages filter
    if (filters.pages) {
      if (filters.pages === "short" && book.pages > 200) return false
      if (filters.pages === "medium" && (book.pages <= 200 || book.pages > 400)) return false
      if (filters.pages === "long" && book.pages <= 400) return false
    }

    return true
  })
}

// Display books in the grid
function displayBooks(books) {
  hideLoading()

  if (books.length === 0) {
    showEmptyState()
    updateResultsCount(0)
    return
  }

  hideEmptyState()
  updateResultsCount(books.length)

  booksGrid.innerHTML = books.map((book) => createBookCard(book)).join("")
}

// Create HTML for a book card
function createBookCard(book) {
  const stars = "★".repeat(Math.floor(book.rating)) + "☆".repeat(5 - Math.floor(book.rating))

  return `
        <div class="book-card">
            <h4 class="book-title">${book.title}</h4>
            <p class="book-author">por ${book.author}</p>
            <div class="book-meta">
                <span class="meta-tag">${getGenreLabel(book.genre)}</span>
                <span class="meta-tag">${book.pages} páginas</span>
                <span class="meta-tag">${book.ageRating === "livre" ? "Livre" : book.ageRating + "+"}</span>
            </div>
            <div class="book-rating">
                <span>${stars}</span>
                <span>${book.rating}</span>
            </div>
            <p style="margin-top: 1rem; color: #666; font-size: 0.9rem;">${book.description}</p>
        </div>
    `
}

// Get genre label in Portuguese
function getGenreLabel(genre) {
  const labels = {
    ficcao: "Ficção",
    romance: "Romance",
    misterio: "Mistério",
    fantasia: "Fantasia",
    biografia: "Biografia",
    historia: "História",
    ciencia: "Ciência",
    autoajuda: "Autoajuda",
  }
  return labels[genre] || genre
}

// Random book selector
function randomBook() {
  showLoading()

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * mockBooks.length)
    const randomBook = mockBooks[randomIndex]
    displayBooks([randomBook])

    // Show a fun message
    setTimeout(() => {
      alert(
        `🎲 Livro sorteado: "${randomBook.title}" por ${randomBook.author}!\n\nQue tal dar uma chance a esta leitura?`,
      )
    }, 500)
  }, 800)
}

// Clear all filters
function clearFilters() {
  genreSelect.value = ""
  ageRatingSelect.value = ""
  ratingSelect.value = ""
  pagesSelect.value = ""

  showEmptyState()
  updateResultsCount(0)
}

// Update results count
function updateResultsCount(count) {
  resultsCount.textContent = `${count} ${count === 1 ? "livro encontrado" : "livros encontrados"}`
}

// Loading state functions
function showLoading() {
  loading.style.display = "block"
  emptyState.style.display = "none"
  booksGrid.innerHTML = ""
  booksGrid.appendChild(loading)
}

function hideLoading() {
  loading.style.display = "none"
}

// Empty state functions
function showEmptyState() {
  emptyState.style.display = "block"
  booksGrid.innerHTML = ""
  booksGrid.appendChild(emptyState)
}

function hideEmptyState() {
  emptyState.style.display = "none"
}

// Add some interactivity to filter changes
document.querySelectorAll("select").forEach((select) => {
  select.addEventListener("change", () => {
    // Auto-search when filters change (optional)
    // searchBooks();
  })
})

// Add keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + Enter to search
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    searchBooks()
  }

  // Ctrl/Cmd + R for random book
  if ((e.ctrlKey || e.metaKey) && e.key === "r") {
    e.preventDefault()
    randomBook()
  }
})
