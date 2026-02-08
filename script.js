document.addEventListener("DOMContentLoaded", function () {
localStorage.removeItem("availableBooks");
localStorage.removeItem("issuedBooks");

    const addBookBtn = document.getElementById("addBookBtn");
    const availableTable = document.getElementById("bookTable");
    const issuedTable = document.getElementById("issuedBookTable");
    const issueSection = document.getElementById("issueSection");

    const searchAvailable = document.getElementById("searchAvailable");
    const searchIssued = document.getElementById("searchIssued");

    
    if (!localStorage.getItem("availableBooks")) {
        const initialAvailableBooks = [
            { book: "Concepts of Physics Vol 1", author: "H.C. Verma", id: "PHY101", shelf: "Physics-A1" },
            { book: "Concepts of Physics Vol 2", author: "H.C. Verma", id: "PHY102", shelf: "Physics-A1" },
            { book: "Problems in General Physics", author: "I.E. Irodov", id: "PHY201", shelf: "Physics-B2" },
            { book: "Organic Chemistry", author: "Morrison & Boyd", id: "CHE101", shelf: "Chemistry-A2" },
            { book: "Physical Chemistry", author: "P. Bahadur", id: "CHE102", shelf: "Chemistry-A2" },
            { book: "Mathematics Class 11", author: "R.D. Sharma", id: "MATH101", shelf: "Maths-A3" },
            { book: "Mathematics Class 12", author: "R.D. Sharma", id: "MATH102", shelf: "Maths-A3" },
            { book: "Problems in Calculus", author: "I.A. Maron", id: "MATH201", shelf: "Maths-B1" }
        ];
        localStorage.setItem("availableBooks", JSON.stringify(initialAvailableBooks));
    }

    if (!localStorage.getItem("issuedBooks")) {
        const initialIssuedBooks = [
            { book: "Advanced Problems in Physics", author: "D.C. Pandey", id: "PHY301", shelf: "Physics-C1", student: "Rahul Kumar", mobile: "9876543210", date: "2026-02-01" },
            { book: "Modern ABC Chemistry", author: "Modern Publishers", id: "CHE201", shelf: "Chemistry-B1", student: "Ankit Singh", mobile: "9123456789", date: "2026-02-03" },
            { book: "Numerical Chemistry", author: "P. Bahadur", id: "CHE202", shelf: "Chemistry-B1", student: "Priya Sharma", mobile: "9012345678", date: "2026-02-02" },
            { book: "Problems in General Physics", author: "I.E. Irodov", id: "PHY302", shelf: "Physics-C2", student: "Neha Gupta", mobile: "8899776655", date: "2026-02-04" },
            { book: "Algebra for JEE", author: "Arihant", id: "MATH301", shelf: "Maths-C1", student: "Aman Verma", mobile: "9988776655", date: "2026-02-05" },
            { book: "Coordinate Geometry", author: "S.L. Loney", id: "MATH302", shelf: "Maths-C1", student: "Suresh Patel", mobile: "9090909090", date: "2026-02-06" }
        ];
        localStorage.setItem("issuedBooks", JSON.stringify(initialIssuedBooks));
    }

    
    let availableBooks = JSON.parse(localStorage.getItem("availableBooks")) || [];
    let issuedBooks = JSON.parse(localStorage.getItem("issuedBooks")) || [];

    addBookBtn.addEventListener("click", addBook);
    searchAvailable.addEventListener("keyup", searchAvailableBooks);
    searchIssued.addEventListener("keyup", searchIssuedBooks);

    
    function loadAvailableBooks() {
        availableTable.innerHTML = "";
        for (let i = 0; i < availableBooks.length; i++) {
            const b = availableBooks[i];
            addAvailableRow(b.book, b.author, b.id, b.shelf);
        }
        updateAvailableSerial();
    }

    
    function renderIssuedBooks() {
        issuedTable.innerHTML = "";
        for (let i = 0; i < issuedBooks.length; i++) {
            const b = issuedBooks[i];
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${i + 1}</td>
                <td>${b.book}</td>
                <td>${b.author}</td>
                <td>${b.id}</td>
                <td>${b.student}</td>
                <td>${b.mobile}</td>
                <td>${b.date}</td>
                <td><button class="return-btn action-btn">Return</button></td>
            `;
            row.querySelector(".return-btn").addEventListener("click", function () {
                returnBook(i);
            });
            issuedTable.appendChild(row);
        }
    }

    loadAvailableBooks();
    renderIssuedBooks();

    
    function addBook() {
        const bookName = document.getElementById("bookName").value.trim();
        const authorName = document.getElementById("authorName").value.trim();
        const bookId = document.getElementById("bookId").value.trim();
        const shelf = document.getElementById("shelfLocation").value.trim();

        if (!bookName || !authorName || !bookId || !shelf) {
            alert("Please fill all fields");
            return;
        }

        availableBooks.push({ book: bookName, author: authorName, id: bookId, shelf });
        localStorage.setItem("availableBooks", JSON.stringify(availableBooks));

        addAvailableRow(bookName, authorName, bookId, shelf);
        updateAvailableSerial();

        document.getElementById("bookName").value = "";
        document.getElementById("authorName").value = "";
        document.getElementById("bookId").value = "";
        document.getElementById("shelfLocation").value = "";
    }

    function addAvailableRow(book, author, id, shelf) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td></td>
            <td>${book}</td>
            <td>${author}</td>
            <td>${id}</td>
            <td>${shelf}</td>
            <td class="status available">Available</td>
            <td><button class="action-btn">Issue</button></td>
        `;
        row.querySelector(".action-btn").addEventListener("click", function () {
            issueSection.style.display = "block";
            window.currentIssueRow = row;
        });
        availableTable.appendChild(row);
    }

    function updateAvailableSerial() {
        const rows = availableTable.querySelectorAll("tr");
        rows.forEach((row, index) => {
            row.children[0].textContent = index + 1;
        });
    }

    
    document.getElementById("confirmIssueBtn").addEventListener("click", function () {
        const name = document.getElementById("issueName").value.trim();
        const mobile = document.getElementById("issueMobile").value.trim();
        const date = document.getElementById("issueDate").value;

        if (!name || !mobile || !date) {
            alert("Please fill all details");
            return;
        }

        const row = window.currentIssueRow;
        if (!row) return;

        const book = row.children[1].textContent;
        const author = row.children[2].textContent;
        const id = row.children[3].textContent;
        const shelf = row.children[4].textContent;

        issuedBooks.push({ book, author, id, shelf, student: name, mobile, date });
        localStorage.setItem("issuedBooks", JSON.stringify(issuedBooks));

        availableBooks = availableBooks.filter(b => b.id !== id);
        localStorage.setItem("availableBooks", JSON.stringify(availableBooks));

        row.remove();
        updateAvailableSerial();
        renderIssuedBooks();

        issueSection.style.display = "none";
        document.getElementById("issueName").value = "";
        document.getElementById("issueMobile").value = "";
        document.getElementById("issueDate").value = "";
        window.currentIssueRow = null;
    });

    
    function returnBook(index) {
        const b = issuedBooks[index];

        availableBooks.push({ book: b.book, author: b.author, id: b.id, shelf: b.shelf });
        localStorage.setItem("availableBooks", JSON.stringify(availableBooks));

        issuedBooks.splice(index, 1);
        localStorage.setItem("issuedBooks", JSON.stringify(issuedBooks));

        loadAvailableBooks();
        renderIssuedBooks();
    }

    
    function searchAvailableBooks() {
        const value = searchAvailable.value.toLowerCase();
        const rows = availableTable.querySelectorAll("tr");
        rows.forEach(row => {
            const bookName = row.children[1].textContent.toLowerCase();
            row.style.display = bookName.includes(value) ? "" : "none";
        });
    }

    function searchIssuedBooks() {
        const value = searchIssued.value.toLowerCase();
        const rows = issuedTable.querySelectorAll("tr");
        rows.forEach(row => {
            const bookName = row.children[1].textContent.toLowerCase();
            row.style.display = bookName.includes(value) ? "" : "none";
        });
    }

});
