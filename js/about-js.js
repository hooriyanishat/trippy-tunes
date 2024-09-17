
function popup(){
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const feedback = document.getElementById("feedback");
  const complaints = document.getElementById("complaints");
   if(feedback.checked){
    Swal.fire({
      position: "middle",
      icon: "success",
      title: "Thanks for your feedback",
      style: "center",
      showConfirmButton: false,
      timer: 1500 
    });
   }if (complaints.checked) {
    Swal.fire({
      position: "middle",
      title: "We will Fix this soon",
      style: "center",
      showConfirmButton: true,
      timer: 1500 
    });
   } else {
    
   }
  }





 
  /* About js end */