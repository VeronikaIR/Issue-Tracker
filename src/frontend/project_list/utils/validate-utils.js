function validateData(form) {

    if (form.querySelector('#create_name').value === ''
        || form.querySelector('#create_description').value === ''
        || form.querySelector('#create_lead_user_id').value === '') return false;

    if (Number(form.querySelector('#create_lead_user_id').value) <= 0) return false;


    return true;

}
