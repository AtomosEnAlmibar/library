const myLibrary = [];

function Book() {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
  // take params, create a book then store it in the array
}