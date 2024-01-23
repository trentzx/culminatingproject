document.addEventListener('DOMContentLoaded', function() {
    const reminderForm = document.getElementById('reminder-form');
    
    reminderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const reminderTime = document.getElementById('reminder-time').value;
        const medication = document.getElementById('medication').value;
        // Create a JavaScript object to hold the data
        
        const data = {
            email: email,
            'medication': medication,
            'reminder-time': reminderTime
        };

        // Convert the data object to JSON
        const jsonData = JSON.stringify(data);

        // Send the JSON data to the server using fetch
        fetch('/sendReminder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok (HTTP status ${response.status})`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the response from the server
            console.log(data); // You can log the response for debugging
            // Display a message to the user (e.g., success or error message)
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle any errors, including non-JSON responses and network issues
            // You can display a user-friendly error message here
        });
    });
});
