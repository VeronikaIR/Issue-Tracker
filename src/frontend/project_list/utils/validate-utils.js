function validateData(form) {

    if (form.querySelector('#create_name').value === ''
        || form.querySelector('#create_description').value === '') return false;

    return true;

}
