function deleteProject(event){
    event.preventDefault();

    const project_key = event.target.parentElement.parentElement.children[0].innerHTML;
    const id = project_key.replace(/\D/g, '');

    const row = event.target.parentElement.parentElement;

    const tbody = document.querySelector('tbody');

    deleteProjectByProjectKey(id);
    tbody.removeChild(row);

    handleSuccessMessage('Task removed successfully!');
}