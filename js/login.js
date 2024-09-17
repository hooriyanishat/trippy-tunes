let logInEmail = document.getElementById("LogInEmail"); 
let logInPassword = document.getElementById("LogInPassword"); 
let logInBtn = document.getElementById("LogInBtn"); 

logInBtn.addEventListener("click", function(event) {
  event.preventDefault(); 

  let evalue = logInEmail.value;
  let pvalue = logInPassword.value;
  let allUsers = localStorage.getItem("userDetails");

  if (allUsers) {
    let parsedData = JSON.parse(allUsers);
    let emailExist = parsedData.find((user) => user.email === evalue);

    if (emailExist) {
      if (emailExist.password === pvalue) { 
        localStorage.setItem("loginuser", JSON.stringify(emailExist));
        window.location.href = '../html/library.html';
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Please enter the correct password!",
          showConfirmButton: false,
          timer: 2000
        });
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "The email you entered doesn't exist. Please sign up first!",
        showConfirmButton: false,
        timer: 2000
      });
    }
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "No user data found. Please sign up first!",
      showConfirmButton: false,
      timer: 2000
    });
  }
});
