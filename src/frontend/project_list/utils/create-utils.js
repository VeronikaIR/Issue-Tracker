function makeCreateForm(event) {
    event.preventDefault();
    const label = document.querySelector('#message');
    label.innerHTML = '';
    const form = document.querySelector('.create_project');
    form.style.display = '';

}
async function createNewProject(event)
{
    event.preventDefault();
    const form = document.querySelector('.create_project');
    const isValid = validateData(form);

    if(isValid === false)
    {
        handleError('Invalid data! (Write in all the sections provided!)');
        return;
    }
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const userNumber = new URLSearchParams(window.location.search).get('user');
    const project = {
        "name": form.querySelector('#create_name').value,
        "description": form.querySelector('#create_description').value,
        "creationDate": formattedDate,
        "leadUserId": Number(userNumber)
    }
    let id;
    try{
        const projectEntity = await sendProjectData(project);
        id = 'PROJECT-' + projectEntity.id;
    }catch (error)
    {
        console.error('Error:', error);
        return;
    }

    const tbody = document.querySelector('tbody');

    const tr = document.createElement('tr');

    const td_project_id = document.createElement('td');
    td_project_id.innerHTML = id;

    const td_project_name = document.createElement('td');
    const a_project = document.createElement('a');
    const take_id = id.split('-')[1];

    a_project.setAttribute('href', `../dashboard/dashboard.html?proj=${take_id}`);
    a_project.innerHTML = project.name;
    td_project_name.append(a_project);

    const td_project_description = document.createElement('td');
    td_project_description.innerHTML = project.description;

    const td_btn = document.createElement('td');
    const btn_delete = document.createElement('button');
    btn_delete.setAttribute('class', 'btn delete');
    btn_delete.innerHTML = 'delete';
    btn_delete.addEventListener('click', deleteProject);

    td_btn.append(btn_delete);
    tr.append(td_project_id, td_project_name, td_project_description, td_btn);

    tbody.append(tr);

    handleSuccessMessage('Project added successfully!');

    form.style.display = 'none';
    form.querySelector('#create_name').value = '';
    form.querySelector('#create_description').value = '';
}