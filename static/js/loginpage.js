function login(){
    let check = false
    let uploadObject = []
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;

    if (username.length == 0){
        alert("Please enter your username")
    }else if(password.length == 0){
        alert("please enter your password")
    }else{
        uploadObject.push(username, password)
        check = true 
    }

    if (check == true){
        let url = "/login";
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            let strResponse = "Error: no response";
            if (this.readyState == 4 && this.status == 200) {
                strResponse = JSON.parse(this.responseText);
                alert(strResponse.data);
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