(function (){

getProjectsData();

    //create a new project
    const newTaskBtn = document.getElementById('new-button');
    newTaskBtn.addEventListener('click', makeCreateForm);

    const form_create = document.querySelector('.create_project');
    const input_create_btn = form_create.querySelector('#create_new_project');
    input_create_btn.addEventListener('click', async function(event)
    {
        await createNewProject(event);
    });

    //delete a project
    // const deleteBtns = document.querySelector('.delete');
    //
    // deleteBtns.forEach(deleteBtn=>{
    //     deleteBtn.addEventListener('click', deleteProject);
    // })

}())