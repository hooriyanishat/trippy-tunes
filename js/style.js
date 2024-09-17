function popup(event) {
    event.preventDefault();
    const feedback = document.getElementById("feedback").checked;
    const complaints = document.getElementById("complaints").checked;    

    // Regular expression to check if the first character is a number
    var startsWithNumber = /^[A-Za-z]{1,}[a-z0-9]{1,}@[a-z]{1,}[.]{1}[a-z]{3}$/;

    if (complaints) {
        Swal.fire({
            position: "center",
            icon: "success",
            html: '<span style="color: black; font-size: 20px;">We will fix this soon</span>',
            showConfirmButton: true,
            timer: 1500
        });
        const name = document.getElementById("name").value = "";
    const email = document.getElementById("email").value = "";
    const content = document.getElementById("content").value = "";
    const e = complaints.value = "";
    const f = feedback.value = "";
    } else if (feedback) {
        Swal.fire({
            position: "center",
            icon: "success",
            html: '<span style="color: black; font-size: 20px;">Thanks for your feedback</span>',
            showConfirmButton: true,
            timer: 1500
        });
        const name = document.getElementById("name").value = "";
    const email = document.getElementById("email").value = "";
    const content = document.getElementById("content").value = "";
    const e = complaints.value = "";
    const f = feedback.value = "";
    }
    

};
