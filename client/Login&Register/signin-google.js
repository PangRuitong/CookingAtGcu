function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    fetch('https://api.gotcookedatgcu.com/api/auth/google-login', { // Calls ASP.NET backend
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.credential }),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Google Sign-In Response:", data);
        if (data.user) {
            alert("Login Successful: " + data.user.FullName);

            window.location.href = '../MainPage/home.html'; // redirect to home page

        } else {
            alert("Login Failed: " + data.error);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "866934536387-udvlu0vv09mlggdbr4kotn2t39ggmv8k.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    document.getElementById("googleSignInButton").addEventListener("click", function() {
        google.accounts.id.prompt();
    });
};



// login.js - Handles Email/Password Login for PocketCookTest

document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the form from submitting the default way

    // Get form values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        // Make a POST request to backend login endpoint
        const response = await fetch('https://api.gotcookedatgcu.com/api/auth/login'
, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }) // Send as JSON
        });

        const data = await response.json(); // Parse the JSON response

        if (response.ok) {
            console.log('Login Successful:', data);

            // Store JWT token in localStorage for future authenticated requests
            localStorage.setItem('jwtToken', data.token);

            alert("Login Successful!");

            // OPTIONAL: Redirect to dashboard or home page
            window.location.href = '/client/MainPage/home.html'; // Adjust to your actual dashboard page

        } else {
            // Handle invalid credentials
            alert('Login Failed: ' + data);
        }

    } catch (error) {
        // Handle network or unexpected errors
        console.error('Error during login:', error);
        alert('An error occurred while logging in: ' + error.message);
    }
});