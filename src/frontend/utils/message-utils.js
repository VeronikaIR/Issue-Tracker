const handleError = error => {
    const errorLabel = document.querySelector('#message');
    errorLabel.innerHTML = error;
    errorLabel.style.color = 'red';
    errorLabel.style.display = 'block';
};


const handleSuccessMessage = message => {
    const label = document.querySelector('#message');
    label.innerHTML = message;
    label.style.color = 'green';
    label.style.display = 'block';
};