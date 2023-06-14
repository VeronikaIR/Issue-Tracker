const handleError = error => {
    const errorLabel = document.querySelector('#message');
    errorLabel.innerHTML = JSON.stringify(error);
    errorLabel.style.color = 'red';
    errorLabel.style.display = 'block';
};

const handleSuccessMessage = message => {
    const label = document.querySelector('#message');
    label.innerHTML = JSON.stringify(message);
    label.style.color = 'green';
    label.style.display = 'block';
};

function handleSuccessCreation(data)
{
    const label = document.querySelector('#message');
    label.innerHTML = 'Ticket added sucessfully';
    label.style.color = 'green';
    label.style.display = 'block';

    return data;
}