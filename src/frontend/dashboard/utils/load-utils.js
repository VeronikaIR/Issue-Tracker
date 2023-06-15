const showTickets = ticketData => {
    ticketData.forEach(ticket => {
        appendTicket(ticket);
    });
};


function appendTicket(ticket)
{
    const status = ticket.status;
    
    const tr_ticket = document.createElement('tr');

    const td_id = document.createElement('td');
    td_id.innerHTML = 'TASK-'+ ticket.id;


    const td_title = document.createElement('td');
    const a_title = document.createElement('a');
    a_title.setAttribute('class', 'info');
    a_title.setAttribute('href', '#');
    a_title.innerHTML = ticket.title;
    a_title.addEventListener('click', showInfoForTask);

    td_title.append(a_title);


    const modified_priority = ticket.priority.charAt(0).toLowerCase()+ ticket.priority.slice(1);
    const td_priority = document.createElement('td');
    td_priority.setAttribute('class', modified_priority);
    td_priority.innerHTML = ticket.priority;

    const td_btn = document.createElement('td');
    const btn_update = document.createElement('button');
    btn_update.setAttribute('class', 'btn update');
    btn_update.innerHTML = 'update';
    btn_update.addEventListener('click', makeUpdateForm);

    td_btn.append(btn_update);

    tr_ticket.append(td_id, td_title, td_priority, td_btn);


    if (status === 'To Do') {

        const todo_section = document.querySelector('.todo');
        const tableBody = todo_section.querySelector('tbody');
        tableBody.append(tr_ticket);

    }
    else if (status === 'In Progress') {
        const in_progress_section = document.querySelector('.in_progress');
        const tableBody = in_progress_section.querySelector('tbody');
        tableBody.append(tr_ticket);

    }
    else if (status === 'Code Review') {
        const code_review_section = document.querySelector('.code_review');
        const tableBody = code_review_section.querySelector('tbody');
        tableBody.append(tr_ticket);

    }
    else {
        const done_section = document.querySelector('.done');
        const tableBody = done_section.querySelector('tbody');
        tableBody.append(tr_ticket);

    }
};