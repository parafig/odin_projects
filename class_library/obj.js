

function Book(title, author) {
    this.title = title;
    this.author = author;
    this.read = false;
}

function Library() {
    this.myLibrary = [];
}

Library.prototype.addBookToLibrary = function() {
    const newBookTitle = document.querySelector("#title")
    const newBookAuthor = document.querySelector("#author")
    const title = newBookTitle.value
    const author = newBookAuthor.value
    const newBook = new Book(title, author);
    this.myLibrary.push(newBook);
}

Library.prototype.displayBooks = function () {
    const bookTable = document.querySelector("tbody");

    while (bookTable.firstChild) {
        bookTable.firstChild.remove()
    }

    this.myLibrary.forEach((book) =>  {
        const bookRow = document.createElement("tr");

        const bookNumber = document.createElement("td");
        bookNumber.textContent = this.myLibrary.indexOf(book) + 1;

        const bookTitle = document.createElement("td");
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement("td");
        bookAuthor.textContent = book.author;

        const removeCell = document.createElement("td");
        const removeBtn = document.createElement("button")
        removeBtn.classList.add("remove-btn")
        removeBtn.textContent = "remove"
        const indexItem = this.myLibrary.indexOf(book);
        removeBtn.dataset.num = indexItem
        removeBtn.addEventListener("click", this.removeBook.bind(this, indexItem))
        removeCell.appendChild(removeBtn);

        const readCell = document.createElement("td")
        const readBtn = document.createElement("button")
        readBtn.dataset.num =  indexItem;
        readBtn.classList.add("read-btn")
        readBtn.addEventListener("click", this.readBook.bind(this, indexItem))

        if (this.myLibrary[this.myLibrary.indexOf(book)].read) {
            readBtn.textContent = "read"
        } else {
            readBtn.textContent = "Unread"
        }

        readCell.appendChild(readBtn)

        bookRow.appendChild(bookNumber);
        bookRow.appendChild(bookTitle);
        bookRow.appendChild(bookAuthor);
        bookRow.appendChild(removeCell);
        bookRow.appendChild(readCell)

        bookTable.appendChild(bookRow);
    })
}

Library.prototype.removeBook = function(indexItem) {
        this.myLibrary.splice(indexItem, 1)
        this.displayBooks();
}

Library.prototype.readBook = function(indexItem){
        if (this.myLibrary[indexItem].read) {
            this.myLibrary[indexItem].read = false;
        } else {
            this.myLibrary[indexItem].read = true;
        }
        this.displayBooks();
}

Library.prototype.addDisplayBook = function() {
    addBtn.addEventListener('click', () => {
        this.addBookToLibrary()
        this.displayBooks();
    })
}

const newBtn = document.querySelector(".new-btn")
const addBtn = document.querySelector(".add-btn")
const form = document.querySelector("form");


newBtn.addEventListener("click", function() {
    form.setAttribute("style", "visibility:visible;");
    addBtn.setAttribute("style", "visibility:visible;");
})

const matiLibrary = new Library();
matiLibrary.displayBooks();
matiLibrary.addDisplayBook()

