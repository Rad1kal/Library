const btnAdd = document.querySelector('.add-book-btn');
const btnCancel = document.querySelector('.cancel-book-btn');

const inputAuth = document.querySelector('.modal-input-auth');
const inputTitle = document.querySelector('.modal-input-title');
const inputPages = document.querySelector('.modal-input-pages');
const inputIsRead = document.querySelector('.modal-input-is-read');

const booksContainer = document.querySelector('.books-container');
const footer = document.querySelector('.footer-container');
const modal = document.querySelector('.modal');
const form = document.querySelector('.modal-content');

footer.innerHTML= `<p class="footer-info">© Shitov Dmitry ${new Date().getFullYear()}</p>`

const myLibrary = [];

class Book{
    constructor(author, title, pages, isRead){
        this.author = author,
        this.title = title,
        this.pages = pages,
        this.isRead = isRead
    }
}

function closeCardBtn(e){
    let card = e.target.parentNode;
    card.remove();
    let specs = card.children;
    let elem;
    myLibrary.forEach(book=>{
        if (book.auth === specs[0] && book.title === specs[1]) {
            elem = myLibrary.indexOf(book);
        }
    })
    myLibrary.splice(elem, 1);
    console.log(myLibrary);
}

const addBook = () =>{
    let auth = inputAuth.value;
    let title = inputTitle.value;
    let pages = inputPages.value;
    let isRead = inputIsRead.checked;

    if (!auth || !title || !pages) {
        return 0;
    }

    if (pages < 0){
        return 0;
    } 

    isRead = isRead === true ?  'Readed' : 'Not readed';
    
    book = new Book(auth, title, pages, isRead);
    myLibrary.push(book);
}

function toggleReadStatus(e){
    e.target.classList.toggle('red');
    if (e.target.innerText === "Not readed"){
        e.target.innerText = 'Readed';
    } else {
        e.target.innerText = 'Not readed';
    }
}

const refreshBooks = (arr)=>{
    booksContainer.innerHTML = '';
    arr.forEach(book=>{
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        let btnReadColor;
        if (book.isRead === "Readed"){
            btnReadColor = '';
        } else{
            btnReadColor = 'red';
        }
        bookCard.innerHTML =
        `
            <h2 class="book-header"> ${book.title}</h2>
            <p class="book-info"> ${book.author}</p>
            <p class="book-info"> ${book.pages}</p>
            <p class="book-info read-btn ${btnReadColor}" onclick = "toggleReadStatus(event)"> ${book.isRead}</p>
            <button class="book-card-close-button" onclick = "closeCardBtn(event)">Delete</button>
        `
        booksContainer.append(bookCard);
    })
}

btnAdd.addEventListener('click', e=>{
    modal.style.display = 'block';
});

btnCancel.addEventListener('click', e=>{
    e.preventDefault()
    modal.style.display = '';
})

form.addEventListener('submit', e=>{
    e.preventDefault()

    
    res = addBook();
    if (res ===0) return;
    modal.style.display = '';
    refreshBooks(myLibrary);
    form.reset();
});





