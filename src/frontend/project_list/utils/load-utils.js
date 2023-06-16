const showProjects = projectData => {
    projectData.forEach(project => {
        appendProject(project);
    });
};
function appendProject(project)
{
    const tbody = document.querySelector('tbody');

    const tr = document.createElement('tr');

    const td_project_id = document.createElement('td');
    td_project_id.innerHTML = 'PROJECT-'+ project.id;

    const td_project_name = document.createElement('td');
    const a_project = document.createElement('a');
    a_project.setAttribute('href', `../dashboard/dashboard.html?proj=${project.id}`);
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
}