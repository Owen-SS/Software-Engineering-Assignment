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
    let uploadJobListing = [];
    let company_input = [];
    let check_listing = [];

    let upload = false;

    job_name = document.getElementById("jName").value;
    contract_type = document.getElementById("contractType").value;
    start_date = document.getElementById("sDate").value;
    salary = document.getElementById("salary").value;
    locat= document.getElementById("loc").value;
    job_description= document.getElementById("jDescription").value;
    contact_us = document.getElementById("contactUs").value;

    company_input.push(job_name);
    company_input.push(contract_type);
    company_input.push(start_date);
    company_input.push(salary);
    company_input.push(locat);
    company_input.push(job_description);
    company_input.push(contact_us);

    for (let input in company_input){
        if (company_input[input].length == 0){
            check_listing.push('red');
        }else{
            check_listing.push('none');
        }
    }

    console.log(check_listing);

    
    if (job_name.length == 0){
        alert("Please add the title of the role");
    }else if(salary.length != 4){
        check_listing.splice(1, 1, 'red');
        alert("Invalid salary");
    }else if(locat.length == 0){
        alert("Please add your companys 1st address and postcode seperated with a comma");
    }else if(job_description.length == 0){
        alert("Please add the roles description");
    }else if(contact_us.length == 0){
        alert("Please add your desired contact details for this role");
    }else{
        uploadJobListing.push(
            job_name,
            contract_type,
            start_date,
            salary,
            locat,
            job_description,
            contact_us
            );
            upload = true;
        }
    red_items(check_listing)

    console.log(uploadJobListing);
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
                    console.log("Save details error - " + strResponse.message);
                }
            }
        };
        xhttp.open("PUT", url, true);
        // Converting JSON data to string
        var data = JSON.stringify(uploadJobListing);
        // Set the request header i.e. which type of content you are sending
        xhttp.setRequestHeader("Content-Type", "application/json");
        //send it
        xhttp.send(data);
    }
}

