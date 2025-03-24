document.getElementById('settingsLink').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default link behavior

    const token = localStorage.getItem('jwtToken'); // Check if the user is logged in

    if (!token) {
        // Show an alert if the user is not signed in
        alert("You need to sign in first to access settings!");
        window.location.href = "../Login&Register/register.html";
        return;
    }

    // Redirect to settings page if logged in
    window.location.href = './user_setting.html';
});
