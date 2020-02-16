// Book Constructor 
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor 
function UI() {}

// Ad Book to list 
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');
    // Create tr element 
    const row = document.createElement('tr');
    // insert col 
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">x</a></td>
    `;
    list.appendChild(row);
}

// Show alert 
UI.prototype.showAlert = function(message, className) {
    // Create div 
    const div = document.createElement('div');
    // Add classes 
    div.className = `alert ${className}`;
    // Add text 
    div.appendChild(document.createTextNode(message));
    // Get parent 
    const container = document.querySelector('.container');
    // Get form 
    const form = document.querySelector('#book-form');
    // Insert alert 
    container.insertBefore(div, form);
    // Timeout 
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000);
}

// Delete book 
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
};

// clear fields 
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Event Listner 
document.getElementById('book-form').addEventListener('submit', 
function(e){
    // Get form values 
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;
    // Instantiate book 
    const book = new Book(title, author, isbn);
    
    // Instantiate UI 
    const ui = new UI();

    // Error alert 
    if(title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all fields','error');
    } else {
        // Add book to list 
        ui.addBookToList(book);
        // Show alert 
        ui.showAlert('Book added!','success');
        // clear fields
        ui.clearFields();
    }
    
    e.preventDefault();
});


document.getElementById('book-list').addEventListener('click',
function(e){
    const ui = new UI();
    // Delete book 
    ui.deleteBook(e.target);
    // Show message 
    ui.showAlert('Book Removed!','success');

    e.preventDefault();
});