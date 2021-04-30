class notecard {
    constructor(title, text, date) {
        this.title = title;
        this.text = text;
        this.date = date;
    }
}

function displaycard(title, text, date) {
    var d = new Date(date)
    var div = document.getElementById("note-list");
    div.innerHTML += "<div class=\"card bg-light text-dark\">" +
                         "<div class=\"card-body\">" +
                            "<h4 class=\"card-title\">"+ title +"</h4>" +
                            "<p class=\"card-text\">"+ "<span  class=\"cur\">" + text + "</span>" +
                            "<br/><span class=\"small text-muted\"> Created on " + 
                            d.toDateString() +"</span></p>" +
                            "<span hidden id=\"milli\">" + d.getTime() + "</span>" +
                            "<button type=\"button\" class=\"btn btn-danger btn-sm delete\">Delete</button>" +
                         "</div>" +
                     "</div>";
}

function displayAll() {
    var notes = JSON.parse(localStorage.getItem("notes"));
    if (notes === null) {
        notes = []
    } else {
        notes.forEach((note) => {
            console.log(note);
            displaycard(note.title, note.text, note.date);
        });
    }
    
}

function selfdestruct() {
    localStorage.removeItem("notes");
    location.reload();
    
}

document.getElementById("add").addEventListener("submit", (e) => {
    e.preventDefault();
    var title = document.getElementById("ttl").value;
    var text = document.getElementById("note").value;
    var date = new Date();
    displaycard(title, text, date.getTime());

    var notes = JSON.parse(localStorage.getItem("notes"));

    if (notes === null) {
        notes = [];
    } 
    var note = new notecard(title, text, date.getTime());
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));

    if((title == "SD-3141") && (text == "confirm")) {
        selfdestruct();
    }

    document.getElementById("ttl").value = "";
    document.getElementById("note").value = "";
} 
);

document.getElementById("note-list").addEventListener("click", (e) => {
    ele = e.target;
    if (ele.classList.contains("delete")) {
        var notes = JSON.parse(localStorage.getItem("notes"));
        var uni = ele.previousSibling.textContent;
        // removing from storage
        notes.forEach((note, index) => {
            if (note.date == uni) {
                notes.splice(index, 1);
            }
        });
        localStorage.setItem("notes", JSON.stringify(notes));
        // removing from screen
        ele.parentElement.parentElement.remove();
    }
});

document.addEventListener("DOMContentLoaded", displayAll);