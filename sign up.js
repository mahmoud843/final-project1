function SignupUser(event) {
    event.preventDefault(); 

    const users = { 
        "user1@gmail.com": { "password": "password1" },
        "user2@gmail.com": { "password": "password2" }
    };

    var username = document.getElementById("regUsername").value;
    var email = document.getElementById("regEmail").value;
    var password = document.getElementById("regPassword").value;
    var confirmPassword = document.getElementById("regConfirmPassword").value;
    var gender = document.querySelector('input[name="gender"]:checked');
    var programming = document.querySelector('input[name="programming"]:checked');

    if (username === "" || email === "" || password === "" || confirmPassword === "" || !gender || !programming) {
        alert("Please fill in all fields and select gender and programming knowledge level.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return false;
    }

    if (!email.endsWith('@gmail.com')) {
        document.getElementById('message').innerText = 'Error! Please enter a valid Gmail address';
        return false;
    }

    if (users[email]) {
        alert("Email already exists. Please use a different email.");
        return false;
    }

 
    users[email] = { "password": password };

    document.getElementById('message').innerText = "Account created successfully.";

    setTimeout(function() {
        window.location.href = "html.html";
    }, 1000); 
}