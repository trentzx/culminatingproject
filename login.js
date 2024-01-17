document.addEventListener('DOMContentLoaded', (event) => {
    const loginForm = document.getElementById('reminder-form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submit action

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('http://localhost:3000/login', { // Make sure this matches the URL of your server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            // Redirect to the dashboard or home page after login
            // Make sure to handle or implement the /dashboard route on your server
            window.location.href = '/dashboard';
        })
        .catch((error) => {
            console.error('Error:', error);
            // Here, you would typically inform the user of the login failure
            // For example, by updating the DOM with an error message
        });
    });
});
