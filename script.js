let library = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages) {
  const book = new Book(title, author, pages, false);
  library.push(book);
  mapBookCardElements();
  console.log('Items in library', library)
}

function markAsRead(book) {
  if (book == null || book == undefined) return;

  book.read = !book.read;
  
  mapBookCardElements();
}

function deleteBook(book) {
  if (book == null || book == undefined) return;

  library = library.filter(oldBook => oldBook !== book);
  
  mapBookCardElements();
}

const bookContainerElem = document.querySelector(".book-container");
const dialogElem = document.getElementById("dialog");
const showBtnElem = document.querySelector(".open-add-book-dialog-button");
const closeBtnElem = document.querySelector(".close");
const addButtonElem = document.getElementById('add-book-button');
const formElem = document.querySelector('form');

function mapBookCardElements() {
  bookContainerElem.innerHTML = "";
  library.forEach(book => {
    createBookCardElement(book);
  });
}

function createBookCardElement(book) {
  bookContainerElem.innerHTML += `
  <div class="book-card">
      <div class="book-id">${book.id}</div>
      <div class="book-info">
          <div class="book-title">${book.title}</div>
          <div class="book-author">${book.author}</div>
      </div>
      <div class="book-pages">${book.pages} pages</div>
      <div class="book-button-list">
          <button class="mark-book-button ${book.read ? 'read' : ''}"><img src="./assets/check-bold.svg" alt="check"><span>${book.read ? 'Read' : 'Mark as read'}</span></button>
          <button class="delete-book-button"><img src="./assets/delete.svg" alt="trash"><span>Delete</span></button>
      </div>
  </div>
  `
}

addButtonElem.addEventListener('click', (event) => {
  event.preventDefault();

  const formData = new FormData(formElem);
  if (formData.values().some(value => !value)) return;
  
  const { title, author, pages } = Object.fromEntries(formData.entries());
  
  addBookToLibrary(title, author, pages);
  dialogElem.close();
});

showBtnElem.addEventListener("click", () => {
  dialogElem.showModal();
});

bookContainerElem.addEventListener("click", (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  const bookCard = button.closest('.book-card');
  const bookId = bookCard.querySelector('.book-id').textContent;
  const book = library.find(book => book.id == bookId);

  if (button.classList.contains('mark-book-button')) {
    markAsRead(book);
  } else if (button.classList.contains('delete-book-button')) {
    deleteBook(book);
  }
});
