function makeCreateForm(event) {
    event.preventDefault();
    const label = document.querySelector('#message');
    label.innerHTML = '';
    const form = document.querySelector('.create_ticket');
    form.style.display = '';

}

async function createNewTask(event) {
    event.preventDefault();
    const form = document.querySelector('.create_ticket');
    const isDataValid = validateData(form);
    if (isDataValid === false) {
        handleError('Invalid data! (Write in all the sections provided!)');
        return;
    }

    const priority = form.querySelector('#create_priority').value;
    const modified_priority = priority.charAt(0).toUpperCase() + priority.slice(1);

    const status = form.querySelector('#create_status').value;
    const modified_status = status.replace(/_./g, function (match) {
        return ' ' + match.charAt(1).toUpperCase();
    });

    const projectNumber = new URLSearchParams(window.location.search).get('proj');
    const changed_status = modified_status.charAt(0).toUpperCase() + modified_status.slice(1);
    const task = {
        "title": form.querySelector('#create_title').value,
        "description": form.querySelector('#create_description').value,
        "priority": modified_priority,
        "dueDate": form.querySelector('#create_due_date').value,
        "status": changed_status,
        "projectId": Number(projectNumber),
        "assigneeId": Number(form.querySelector('#create_assignee_id').value)
    }

    let id;
    try{
        const taskEntity = await sendTicketData(task);
        id = 'TASK-' + taskEntity.id;
    }catch (error)
    {
        console.error('Error:', error);
        return;
    }

    const tr_task = document.createElement('tr');

    const td_id = document.createElement('td');
    td_id.innerHTML = id;

    const td_title = document.createElement('td');
    const a_title = document.createElement('a');
    a_title.setAttribute('class', 'info');
    a_title.setAttribute('href', '#');
    a_title.innerHTML = form.querySelector('#create_title').value;
    a_title.addEventListener('click', showInfoForTask);

    td_title.append(a_title);

    const td_priority = document.createElement('td');
    td_priority.setAttribute('class', priority);
    td_priority.innerHTML = modified_priority;

    const td_btn = document.createElement('td');
    const btn_update = document.createElement('button');
    btn_update.setAttribute('class', 'btn update');
    btn_update.innerHTML = 'update';
    btn_update.addEventListener('click', makeUpdateForm);

    td_btn.append(btn_update);

    tr_task.append(td_id, td_title, td_priority, td_btn);

    if (changed_status === 'To Do') {

        const todo_section = document.querySelector('.todo');
        const tableBody = todo_section.querySelector('tbody');
        tableBody.append(tr_task);

    }
    else if (changed_status === 'In Progress') {
        const in_progress_section = document.querySelector('.in_progress');
        const tableBody = in_progress_section.querySelector('tbody');
        tableBody.append(tr_task);

    }
    else if (changed_status === 'Code Review') {
        const code_review_section = document.querySelector('.code_review');
        const tableBody = code_review_section.querySelector('tbody');
        tableBody.append(tr_task);

    }
    else {
        const done_section = document.querySelector('.done');
        const tableBody = done_section.querySelector('tbody');
        tableBody.append(tr_task);

    }
    handleSuccessMessage('Task added successfully!');

    form.style.display = 'none';
    form.querySelector('#create_title').value = '';
    form.querySelector('#create_priority').value = 'nothing';
    form.querySelector('#create_description').value = '';
    form.querySelector('#create_due_date').value = '';
    form.querySelector('#create_status').value = 'nothing';
    form.querySelector('#create_assignee_id').value = '';

}