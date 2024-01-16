document.addEventListener('DOMContentLoaded', (event) => {
    const loginForm = document.getElementById('reminder-form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submit action

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Here you would handle the login logic, e.g. sending a request to the server
        console.log('Email:', email, 'Password:', password);

        // For demonstration purposes, let's just log the credentials
        // In a real application, you would send this information to a server
        // using `fetch` or another AJAX method and handle the response.

        fetch('/login', { // This URL would be where your server's login endpoint is
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Handle success, such as redirecting to another page
            window.location.href = '/dashboard'; // Redirect to the dashboard or home page after login
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle errors, such as showing an error message to the user
        });
    });
});
