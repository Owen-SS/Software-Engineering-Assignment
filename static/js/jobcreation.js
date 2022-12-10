function cleardetails(){
    document.getElementById('jName').value = "";
    document.getElementById('contractType').value="";
    document.getElementById('sDate').value="";
    document.getElementById('salary').value = "";
    document.getElementById('loc').value = "";
    document.getElementById('jDescription').value="";
    document.getElementById('contactUs').value="";    
}

function createdJobListing(){
    let uploadObject = [];
    let check_listing = [];

    let upload = false;

    job_name = document.getElementById("jName").value;
    cont_type = document.getElementById("contractType").value;
    start_date = document.getElementById("sDate").value;
    salary = document.getElementById("salary").value;
    postcode= document.getElementById("loc").value;
    job_desc= document.getElementById("jDescription").value;
    contact = document.getElementById("contactUs").value;

    uploadObject.push(
        job_name,
        cont_type,
        start_date,
        salary,
        postcode,
        job_desc,
        contact
    );

    for (let input in uploadObject){
        if (uploadObject[input].length == 0){
            check_listing.push('red');
        }else{
            check_listing.push('none');
        }
    }

    
    if (job_name.length == 0){
        alert("Please add the title of the role");
    }else if(salary.length <= 2){
        check_listing.splice(1, 1, 'red');
        alert("Invalid salary - Must be equal too or greater than 100");
    }else if(postcode.length == 0){
        alert("Please add your postcode");
    }else if(job_desc.length == 0){
        alert("Please add the role description");
    }else if(contact.length == 0){
        alert("Please add contact details");
    }else{
        upload = true;
    }

    red_items(check_listing)

    if (upload == true){
        let url = "/joblisting/upload";
        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            let strResponse = "Error: no response";
            if (this.readyState == 4 && this.status == 200) {
                strResponse = JSON.parse(this.responseText);
                if (strResponse.message == 200){
                    cleardetails();
                    alert(strResponse.data);
                }else {
                    alert("Whoops somthing went wrong!");
                    console.log("Save details error - " + strResponse.message + " | " + strResponse.error);
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

function red_items(check_listing){
    let items = [ "jName","contractType","sDate","salary","loc", "jDescription","contactUs"]
    for (let item in items){
        var element = document.getElementById(items[item]);
        if (check_listing[item] == 'red'){
            element.style.borderColor = "#FF0000";
        }else{
            element.style.borderColor = "#ccc";
        }
    }
}