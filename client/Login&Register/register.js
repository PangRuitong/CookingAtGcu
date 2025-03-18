document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://api.gotcookedatgcu.com/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration Successful! You can now log in.");
            window.location.href = '../../index.html'; // Adjust path as needed
        } else {
            alert("Registration Failed: " + data);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Registration error: ' + error.message);
    }
});




