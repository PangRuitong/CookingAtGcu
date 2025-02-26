function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    fetch('/your_login_endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.credential }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
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
}