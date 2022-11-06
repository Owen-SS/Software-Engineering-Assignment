function capture(){
    console.log("ran")
    fName = document.getElementById("fName").value;
    sName = document.getElementById("sName").value;

    addOne = document.getElementById("AD1").value;

    addOne = document.getElementById("AD1").value;
    addTwo = document.getElementById("AD2").value;
    addThree = document.getElementById("AD3").value;
    postcode = document.getElementById("postcode").value;

    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    password_match = document.getElementById("password_match").value;

    if (password != password_match) {
        alert("Passwords don't match!")
    }

    console.log(fName);
}