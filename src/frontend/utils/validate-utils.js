function validateData(form) {

    if (form.querySelector('#create_title').value === ''
        || form.querySelector('#create_priority').value === 'nothing'
        || form.querySelector('#create_description').value === ''
        || form.querySelector('#create_due_date').value === ''
        || form.querySelector('#create_status').value === 'nothing'
        || form.querySelector('#create_assignee_id').value === '') return false;

    if (Number(form.querySelector('#create_assignee_id').value) <= 0) return false;

    const due_date = new Date(form.querySelector('#create_due_date').value);
    const current_date = new Date();
    if (due_date < current_date) return false;


    return true;

}
