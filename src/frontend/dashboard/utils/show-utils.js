function showTicket(data) {
    return data;
}

async function showInfoForTask(event) {
    event.preventDefault();
    const label = document.querySelector('#message');
    label.innerHTML = '';

    const task_key = event.target.parentElement.previousElementSibling.innerHTML;
    console.log(task_key);
    const id = task_key.replace(/\D/g, '');
    let task;
    try {
        task = await getTicketDataByTicketNumber(id);
    }
    catch (error) {
        console.error(error);
        return;
    }

    const section = document.querySelector('.info_task');

    const p_id = section.querySelector('#p_id');
    p_id.innerHTML = 'Task #ID: ' + 'TASK-'+ task.id;

    const p_title = section.querySelector('#p_title');
    p_title.innerHTML = 'Title: ' + task.title;

    const p_priority = section.querySelector('#p_priority');
    p_priority.innerHTML = 'Priority: ' + task.priority;

    const p_description = section.querySelector('#p_description');
    p_description.innerHTML = 'Description: ' + task.description;

    const p_due_date = section.querySelector('#p_due_date');
    p_due_date.innerHTML = 'Due Date: ' + task.dueDate.split('T')[0];

    const p_status = section.querySelector('#p_status');
    p_status.innerHTML = 'Status: ' + task.status;

    const p_project_id = section.querySelector('#p_project_id');
    p_project_id.innerHTML = 'Project #ID: ' + task.projectId;

    const p_assignee_id = section.querySelector('#p_assignee_id');
    p_assignee_id.innerHTML = 'Assignee #ID: ' + task.assigneeId;

    section.style.display = '';

}

function hideTaskInfo(event) {
    event.preventDefault();

    const section = document.querySelector('.info_task');
    section.style.display = 'none';

    const p_id = section.querySelector('#p_id');
    p_id.innerHTML = '';

    const p_title = section.querySelector('#p_title');
    p_title.innerHTML = '';

    const p_priority = section.querySelector('#p_priority');
    p_priority.innerHTML = '';

    const p_description = section.querySelector('#p_description');
    p_description.innerHTML = '';

    const p_due_date = section.querySelector('#p_due_date');
    p_due_date.innerHTML = '';

    const p_status = section.querySelector('#p_status');
    p_status.innerHTML = '';

    const p_project_id = section.querySelector('#p_project_id');
    p_project_id.innerHTML = '';

    const p_assignee_id = section.querySelector('#p_assignee_id');
    p_assignee_id.innerHTML = '';

}