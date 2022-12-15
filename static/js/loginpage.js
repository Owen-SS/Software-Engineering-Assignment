/* 

  Used to set all the vairables and checkboxes to default positions on page load

*/

function pageStart(){
    document.getElementById("student").checked = true;
    studentMode()
}

/* 

  Used to login as a company

*/

function companyMode(){
    account = "company"; 
    var top = document.getElementById("top");
    var loginButton = document.getElementById("loginButton");
    var signButton = document.getElementById("signButton");
    var title = document.getElementById("title");

    title.innerHTML = "Login - Company Account";

    top.style.backgroundColor = "#f32121";
    loginButton.style.backgroundColor = "#f32121";
    signButton.style.backgroundColor = "#f32121";
}

/* 

  Used to login as a student

*/

function studentMode(){
    account = "student";
    var top = document.getElementById("top");
    var loginButton = document.getElementById("loginButton");
    var signButton = document.getElementById("signButton");
    var title = document.getElementById("title");

    title.innerHTML = "Login - Student Account";

    top.style.backgroundColor = "#2196F3";
    loginButton.style.backgroundColor = "#2196F3";
    signButton.style.backgroundColor = "#2196F3";
}

/* 

  The main login funciton

*/

function login(){
    let check = false
    let uploadObject = []
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;

    if (username.length == 0){
        alert("Please enter your username");
    }else if(password.length == 0){
        alert("please enter your password");
    }else{
        uploadObject.push(username, password, account);
        check = true;
    }

    if (check == true){
        let url = "/login";
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            let strResponse = "Error: no response";
            if (this.readyState == 4 && this.status == 200) {
                strResponse = JSON.parse(this.responseText);
                console.log("Login - " + strResponse.data + " | Code - " + strResponse.message);
                if (strResponse.message == 200) {
                    if (account == "student") {
                        window.location = "/jobview"
                    }else {
                        window.location = "/employer"
                    }
                }else {
                    alert(strResponse.data);
                }
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