const users = { 
    "user1@gmail.com": { "password": "password1" },
    "user2@gmail.com": { "password": "password2" }
  };

  function loginUser(event) {
      event.preventDefault();
      const username = document.getElementById('regEmail').value;
      const password = document.getElementById('loginPassword').value;
      
      if (!username || !password) {
          document.getElementById('message').innerText = 'Error! Please enter username and password';
          return; 
      }

      if (!username.endsWith('@gmail.com')) {
          document.getElementById('message').innerText = 'Error! Please enter a valid Gmail address';
          return;
      }
      
      else {
          document.getElementById('message2').innerText = "Account created successfully.";
          window.location.href = "html.html"; 
      }
  }