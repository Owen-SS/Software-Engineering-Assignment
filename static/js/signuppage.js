function capture(){

    let uploadObject = [];

    email = document.getElementById("email").value;
    phone_number = document.getElementById("phoneNum").value;

    fName = document.getElementById("fName").value;
    sName = document.getElementById("sName").value;

    dob = document.getElementById("dob").value;

    addOne = document.getElementById("AD1").value;
    addTwo = document.getElementById("AD2").value;
    addThree = document.getElementById("AD3").value;
    postcode = document.getElementById("postcode").value;

    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    password_match = document.getElementById("password_match").value;

    if (password != password_match) {
        alert("Passwords don't match!")
    }else if(phone_number.length != 11){
        alert("Invalid phone number")
    }
    else{
        uploadObject.push(email);
        uploadObject.push(phone_number);
        uploadObject.push(fName);
        uploadObject.push(sName);
        uploadObject.push(dob);
        uploadObject.push(addOne);
        uploadObject.push(addTwo);
        uploadObject.push(addThree);
        uploadObject.push(postcode);
        uploadObject.push(username);
        uploadObject.push(password);
        uploadObject.push(password_match);
    }

    console.log(fName);
}