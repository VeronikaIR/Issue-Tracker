(function () {

    const urlParams = new URLSearchParams(window.location.search);
    const projectNumber = urlParams.get('proj');
    const userNumber = urlParams.get('user');
    getTicketsData(projectNumber);

    const proj_ref = document.getElementById('proj_href');
    proj_ref.setAttribute('href', `../project_list/projects.html?user=${userNumber}`);

    //filters and order
    const btnSelectOrder = document.getElementById("select_order");

    btnSelectOrder.addEventListener('click', () => {
        const priorityOrder = document.getElementById("priority-order");
        const selectedPriority = priorityOrder.value;
        if (selectedPriority === "high_to_low") {
            sortFromHighToLowPriority();
        }
        if (selectedPriority === "low_to_high") {
            sortFromLowToHighPriority();
        }
    })

    const btnSelectFilter = document.getElementById("select_filter");
    btnSelectFilter.addEventListener('click', () => {

        const priorityFilter = document.getElementById("priority-filter");
        const selectedPriority = priorityFilter.value;
        filterByPriority(selectedPriority);
    });

    const filter_assignee_btn = document.getElementById('filter_assignee_btn');
    filter_assignee_btn.addEventListener('click', async function(event){
        await filterByAssignee(event);
    });

    const before_due_date_btn = document.getElementById('before_due_date_btn');
    before_due_date_btn.addEventListener('click', async function(event){
        await dueBeforeDate(event);
    });


    const hide_btn = document.querySelector('#hide_info_btn');
    hide_btn.addEventListener('click', hideTaskInfo);



    const form_update = document.querySelector(".update_ticket_info");
    const input_update_btn = form_update.querySelector('#update_task');
    input_update_btn.addEventListener('click', updateInformation);

    const delete_task_btn = form_update.querySelector('#delete_btn');
    delete_task_btn.addEventListener('click', DeleteTask);
    

    //create a new task
    const newTaskBtn = document.getElementById('new-button');
    newTaskBtn.addEventListener('click', makeCreateForm);

    const form_create = document.querySelector('.create_ticket');
    const input_create_btn = form_create.querySelector('#create_new_task');
    input_create_btn.addEventListener('click', async function(event)
    {
        await createNewTask(event);
    });

   

}())



