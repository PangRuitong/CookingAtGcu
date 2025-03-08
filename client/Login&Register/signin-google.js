function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    fetch('http://18.116.67.70:5168/api/auth/google-login', { // Calls ASP.NET backend
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
