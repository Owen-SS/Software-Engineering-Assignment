/* 

  Used to clear the input fields

*/

function cleardetails(){
    document.getElementById('cName').value = "";
    document.getElementById('jName').value = "";
    document.getElementById('contractType').value="";
    document.getElementById('sDate').value="";
    document.getElementById('salary').value = "";
    document.getElementById('loc').value = "";
    document.getElementById('jDescription').value="";
    document.getElementById('contactUs').value="";    
}

/* 

  Used to create job listings

*/

function createdJobListing(){
    let uploadObject = [];
    let check_listing = [];

    let upload = false;

    comp_name = document.getElementById("cName").value;
    job_name = document.getElementById("jName").value;
    start_date = document.getElementById("sDate").value;
    salary = document.getElementById("salary").value;
    postcode= document.getElementById("loc").value;
    job_desc= document.getElementById("jDescription").value;
    contact = document.getElementById("contactUs").value;

    var ele = document.getElementsByName('jobType');
    value = ""
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked) {
            value = ele[i].value;
        }
    }

    cont_type = value;

    let d = new Date();
    let numDate = d.getTime();
    let id = comp_name + numDate.toString();

    uploadObject.push(
        id,
        comp_name,
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
    }else if (comp_name.length == 0){
        alert("Please add the company name");
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

/* 

  Used to highlight items in red if data is wrong

  :param check_listing: The list of which inputs should be red

*/

function red_items(check_listing){
    let items = ["cName","jName","contractType","sDate","salary","loc", "jDescription","contactUs"]
    for (let item in items){
        var element = document.getElementById(items[item]);
        if (check_listing[item] == 'red'){
            element.style.borderColor = "#FF0000";
        }else{
            element.style.borderColor = "#ccc";
        }
    }
}