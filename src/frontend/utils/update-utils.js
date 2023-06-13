function makeUpdateForm(event) {
    const label = document.querySelector('#message');
    label.innerHTML = '';
    const form = document.querySelector(".update_ticket_info");
    form.style.display = '';
    form.querySelector('#take_id').innerHTML = event.target.parentElement.parentElement.children[0].innerHTML;
    form.querySelector('#take_status').innerHTML = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].innerHTML;
}

function updateInformation(event) {
    event.preventDefault();
    const form = document.querySelector(".update_ticket_info");
    const ticket_id = Number(form.querySelector('#take_id').innerHTML);
    //const ticket = file.tasks.filter(task => task.id === ticket_id)[0];
    const ticket = {};
    const current_status = form.querySelector('#take_status').innerHTML;
    let parent_section;
    let parent_table;

    if (Number(form.querySelector('#set_assignee_id').value) <= 0 && form.querySelector('#set_assignee_id').value !== '') {
        handleError('Assignee id must be positive!');
        return;
    }

    if (current_status === 'To Do') {
        parent_section = document.querySelector('.todo');
        parent_table = parent_section.querySelector('tbody');
    }
    else if (current_status === 'In Progress') {
        parent_section = document.querySelector('.in_progress');
        parent_table = parent_section.querySelector('tbody');
    }
    else if (current_status === 'Code Review') {
        parent_section = document.querySelector('.code_review');
        parent_table = parent_section.querySelector('tbody');
    }
    else {
        parent_section = document.querySelector('.done');
        parent_table = parent_section.querySelector('tbody');
    }

    const rows = parent_table.children;
    let ticketHTML;
    for (let i = 0; i < rows.length; i++) {
        const id = rows[i].firstElementChild.innerHTML;
        if (Number(id) === ticket_id) {
            ticketHTML = rows[i];
        }
    }

    if (form.querySelector('#set_title').value !== '') {
        const new_title = form.querySelector('#set_title').value;
        ticket.title = new_title;
        ticketHTML.children[1].children[0].innerHTML = new_title;

    }
    if (form.querySelector('#set_priority').value !== 'nothing') {
        const new_priority = form.querySelector('#set_priority').value;
        ticket.priority = new_priority.charAt(0).toUpperCase() + new_priority.slice(1);
        ticketHTML.children[2].innerHTML = new_priority.charAt(0).toUpperCase() + new_priority.slice(1);
        ticketHTML.children[2].setAttribute('class', new_priority.toLowerCase());
    }
    if (form.querySelector('#set_description').value !== '') {
        const new_description = form.querySelector('#set_description').value;
        ticket.description = new_description;
    }
    if (form.querySelector('#set_due_date').value !== '') {
        const new_due_date = form.querySelector('#set_due_date').value;
        ticket.due_date = new_due_date;
    }

    if (form.querySelector('#set_status').value !== 'nothing') {
        const new_status = form.querySelector('#set_status').value;
        const status_formatted = new_status.replace(/_./g, function (match) {
            return ' ' + match.charAt(1).toUpperCase();
        });

        const changed_status = status_formatted.charAt(0).toUpperCase() + status_formatted.slice(1);
        if (changed_status !== ticket.status) {
            ticket.status = changed_status;
            parent_table.removeChild(ticketHTML);

            if (changed_status === 'To Do') {

                const todo_section = document.querySelector('.todo');
                const tableBody = todo_section.querySelector('tbody');
                tableBody.append(ticketHTML);

            }
            else if (changed_status === 'In Progress') {
                const in_progress_section = document.querySelector('.in_progress');
                const tableBody = in_progress_section.querySelector('tbody');
                tableBody.append(ticketHTML);

            }
            else if (changed_status === 'Code Review') {
                const code_review_section = document.querySelector('.code_review');
                const tableBody = code_review_section.querySelector('tbody');
                tableBody.append(ticketHTML);

            }
            else {
                const done_section = document.querySelector('.done');
                const tableBody = done_section.querySelector('tbody');
                tableBody.append(ticketHTML);

            }
        }

    }

    if (form.querySelector('#set_assignee_id').value !== '' && Number(form.querySelector('#set_assignee_id').value) >= 0) {
        const new_assignee_id = Number(form.querySelector('#set_assignee_id').value);
        ticket.assignee_id = new_assignee_id;
    }

    sendUpdatedTicketDataByTaskKey(ticket, ticket_id);

    form.style.display = 'none';
    form.querySelector('#set_title').value = '';
    form.querySelector('#set_priority').value = 'nothing';
    form.querySelector('#set_description').value = '';
    form.querySelector('#set_due_date').value = '';
    form.querySelector('#set_status').value = 'nothing';
    form.querySelector('#set_assignee_id').value = '';
    form.querySelector('#take_id').innerHTML = '';

    handleSuccessMessage('Task updated successfully!');

}

function DeleteTask(event) {
    event.preventDefault();
    const form = document.querySelector(".update_ticket_info");
    const ticket_id = Number(form.querySelector('#take_id').innerHTML);
    const ticket = file.tasks.filter(task => task.id === ticket_id)[0];
    const current_status = ticket.status;
    let parent_section;
    let parent_table;

    if (current_status === 'To Do') {
        parent_section = document.querySelector('.todo');
        parent_table = parent_section.querySelector('tbody');
    }
    else if (current_status === 'In Progress') {
        parent_section = document.querySelector('.in_progress');
        parent_table = parent_section.querySelector('tbody');
    }
    else if (current_status === 'Code Review') {
        parent_section = document.querySelector('.code_review');
        parent_table = parent_section.querySelector('tbody');
    }
    else {
        parent_section = document.querySelector('.done');
        parent_table = parent_section.querySelector('tbody');
    }

    const rows = parent_table.children;
    let ticketHTML;
    for (let i = 0; i < rows.length; i++) {
        const id = rows[i].firstElementChild.innerHTML;
        if (Number(id) === ticket_id) {
            ticketHTML = rows[i];
        }
    }

    parent_table.removeChild(ticketHTML);

    file.tasks = file.tasks.filter(task => task.id !== ticket_id);

    form.style.display = 'none';

    form.querySelector('#set_title').value = '';
    form.querySelector('#set_priority').value = 'nothing';
    form.querySelector('#set_description').value = '';
    form.querySelector('#set_due_date').value = '';
    form.querySelector('#set_status').value = 'nothing';
    form.querySelector('#set_assignee_id').value = '';
    form.querySelector('#take_id').innerHTML = '';

    handleSuccessMessage('Task removed successfully!');

}