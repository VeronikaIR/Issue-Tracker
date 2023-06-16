const getProjectsData = () => {
    const url = 'http://localhost:3000/projects';

    const options = {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    sendRequest(url, options, showProjects, handleError);
};

const sendProjectData = async (projectData) => {
    const url = 'http://localhost:3000/projects';

    const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
    };

    return await sendAndReturnRequest(url, options, handleSuccessCreation, handleError);
};


const deleteProjectByProjectKey = project_key => {
    const url = `http://localhost:3000/projects/${project_key}`;

    const options = {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    sendRequest(url, options, handleSuccessMessage, handleError);
};


// const getProjectDataByProjectNumber = async (project_key) => {
//     const url = `http://localhost:3000/projects/${project_key}`;
//
//     const options = {
//         method: 'GET',
//         mode: 'cors',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };
//
//     return await sendAndReturnRequest(url, options, showTicket, handleError);
// };