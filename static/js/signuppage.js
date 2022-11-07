function capture(){

    let uploadObject = [];
    let user_input = [];
    let check = [];

    date = Date.now();

    email = document.getElementById("email").value;
    phone_number = document.getElementById("phoneNum").value;
    uploadObject.push(email);
    uploadObject.push(phone_number);

    fName = document.getElementById("fName").value;
    sName = document.getElementById("sName").value;
    uploadObject.push(fName);
    uploadObject.push(sName);

    dob = document.getElementById("dob").value;
    uploadObject.push(dob);

    addOne = document.getElementById("AD1").value;
    addTwo = document.getElementById("AD2").value;
    addThree = document.getElementById("AD3").value;
    postcode = document.getElementById("postcode").value;
    uploadObject.push(addOne);
    uploadObject.push(postcode);

    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    password_match = document.getElementById("password_match").value;
    uploadObject.push(username);
    uploadObject.push(password);
    uploadObject.push(password_match);

    id = sName + date.toString();

    for (input in user_input){
        if (input.length == 0){

        }
    }

    if (email.length == 0 & phone_number.length == 0){
        alert("Please add your contact info");
    }else if(phone_number.length != 11 & phone_number.length > 0){
        alert("Invalid phone number");
    }else if (password != password_match) {
        alert("Passwords do not match");
    }
    else{
        uploadObject.push(id);
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
    }

    console.log(uploadObject);
    if (uploadObject.length != 0){
        let xhttp = new XMLHttpRequest();
        let url = "/student/upload";
        xhttp.onreadystatechange = function() {
            let strResponse = "Error: no response";
            if (this.readyState == 4 && this.status == 200) {
                strResponse = JSON.parse(this.responseText);
                alert(strResponse.message);
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