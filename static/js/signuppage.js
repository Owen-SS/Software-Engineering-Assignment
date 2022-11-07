function capture(){

    let uploadObject = [];

    date = Date.now()

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

    id = sName + date.toString()

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

    console.log(uploadObject);
    if (uploadObject.length != 0){
        let xhttp = new XMLHttpRequest();
        let url = "/student/upload"
        xhttp.onreadystatechange = function() {
            let strResponse = "Error: no response";
            if (this.readyState == 4 && this.status == 200) {
                strResponse = JSON.parse(this.responseText);
                alert(strResponse.message)
            }
        };
        xhttp.open("PUT", url, true);
        // Converting JSON data to string
        var data = JSON.stringify(uploadObject);
        // Set the request header i.e. which type of content you are sending
        xhttp.setRequestHeader("Content-Type", "application/json");
        //send it
        xhttp.send(data);
    }
}