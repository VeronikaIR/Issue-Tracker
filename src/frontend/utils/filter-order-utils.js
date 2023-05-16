function filterByAssignee(event) {
    event.preventDefault();
    const assignee_id = Number(event.target.previousElementSibling.value);

    const tables = document.querySelectorAll("table");
    tables.forEach(table => {
        const tbody = table.getElementsByTagName("tbody")[0];
        const rows = [...tbody.children];
        rows.forEach((row) => {
            const id = Number(row.firstElementChild.innerHTML);
            const ticket = file.tasks.filter(task => task.id === id)[0];
            if (ticket.assignee_id === assignee_id) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    })

    event.target.previousElementSibling.value = '';
}


function dueBeforeDate(event) {
    event.preventDefault();
    const date = new Date(event.target.previousElementSibling.value);
    const tables = document.querySelectorAll("table");
    tables.forEach(table => {
        const tbody = table.getElementsByTagName("tbody")[0];
        const rows = [...tbody.children];
        rows.forEach((row) => {
            const id = Number(row.firstElementChild.innerHTML);
            const ticket = file.tasks.filter(task => task.id === id)[0];
            const ticket_due_date = new Date(ticket.due_date);
            if (ticket_due_date <= date) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    })

}

function filterByPriority(selectedPriority) {
    const tables = document.querySelectorAll("table");
    tables.forEach(table => {
        const tbody = table.getElementsByTagName("tbody")[0];
        const rows = [...tbody.children];
        rows.forEach((row) => {
            const priorityCell = row.querySelector("td:nth-child(3)");
            const priority = priorityCell.textContent.trim().toLowerCase();

            if (selectedPriority === "" || priority === selectedPriority) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    })
}
function sortFromHighToLowPriority() {
    const tables = document.querySelectorAll("table");

    tables.forEach(table => {
        const tbody = table.getElementsByTagName("tbody")[0];
        const rows = [...tbody.children];

        rows.sort((rowA, rowB) => {
            const priorityA = rowA.children[2].innerHTML.toLocaleLowerCase();
            const priorityB = rowB.children[2].innerHTML.toLocaleLowerCase();

            if (priorityA === "high") {
                return -1;
            } else if (priorityB === "high") {
                return 1;
            } else if (priorityA === "medium") {
                return -1;
            } else if (priorityB === "medium") {
                return 1;
            } else {
                return 0;
            }
        });

        tbody.innerHTML = "";
        rows.forEach(row => tbody.appendChild(row));
    })

}

function sortFromLowToHighPriority() {
    const tables = document.querySelectorAll("table");

    tables.forEach(table => {
        const tbody = table.getElementsByTagName("tbody")[0];
        const rows = [...tbody.children];

        rows.sort((rowA, rowB) => {
            const priorityA = rowA.children[2].innerHTML.toLocaleLowerCase();
            const priorityB = rowB.children[2].innerHTML.toLocaleLowerCase();

            if (priorityA === "low") {
                return -1;
            } else if (priorityB === "low") {
                return 1;
            } else if (priorityA === "medium") {
                return -1;
            } else if (priorityB === "medium") {
                return 1;
            } else {
                return 0;
            }
        });

        tbody.innerHTML = "";
        rows.forEach(row => tbody.appendChild(row));
    })

}