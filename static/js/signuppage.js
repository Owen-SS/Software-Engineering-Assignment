function capture(){

    let uploadObject = [];
    let user_input = [];
    let check = [];

    let upload = false;

    date = Date.now();

    email = document.getElementById("email").value;
    phone_number = document.getElementById("phoneNum").value;
    user_input.push(email);
    user_input.push(phone_number);

    fName = document.getElementById("fName").value;
    sName = document.getElementById("sName").value;
    user_input.push(fName);
    user_input.push(sName);

    dob = document.getElementById("dob").value;
    user_input.push(dob);

    addOne = document.getElementById("AD1").value;
    addTwo = document.getElementById("AD2").value;
    addThree = document.getElementById("AD3").value;
    postcode = document.getElementById("postcode").value;
    user_input.push(addOne);
    user_input.push(postcode);

    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    password_match = document.getElementById("password_match").value;
    user_input.push(username);
    user_input.push(password);
    user_input.push(password_match);

    id = sName + date.toString();

    for (let input in user_input){
        if (user_input[input].length == 0){
            check.push('red')
        }else{
            check.push('none')
        }
    }

    console.log(check)

    if (email.length == 0 & phone_number.length == 0){
        alert("Please add your contact info");
    }else if(phone_number.length != 11 & phone_number.length > 0){
        check.splice(1, 1, 'red');
        alert("Invalid phone number");
    }else if (password != password_match) {
        check.splice(8, 1, 'red');
        check.splice(9, 1, 'red');
        alert("Passwords do not match");
    }else if (password.length ==0){
        alert('Please add a password')
    }else{
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
        upload = true;
    }

    red_items(check)

    console.log(uploadObject);
    if (upload == true){
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

function red_items(check){
    let items = ['email', 'phoneNum', 'fName', 'sName', 'dob', 'AD1', 'postcode', 'username', 'password', 'password_match' ]

    for (let item in items){

        var element = document.getElementById(items[item]);
        if (check[item] == 'red'){
            element.style.borderColor = "#FF0000";
        }else{
            element.style.borderColor = "#ccc;";
        }
    }
    
}

function companyMode(){
    var top = document.getElementById("top");
    var lowerBtn = document.getElementById("lower-button");
    var title = document.getElementById("top-title");

    top.style.backgroundColor = "#f32121";
    lowerBtn.style.backgroundColor = "#f32121";
    title.innerHTML = "Create company account";
}

function studentMode(){
    var top = document.getElementById("top");
    var lowerBtn = document.getElementById("lower-button");
    var title = document.getElementById("top-title");

    top.style.backgroundColor = "#2196F3";
    lowerBtn.style.backgroundColor = "#2196F3";
    title.innerHTML = "Create student account";
}