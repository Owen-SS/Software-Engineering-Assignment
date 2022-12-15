/*

  Used to retrieve data then display the details and then load job data

*/

function getDetails(){
  fetch('/displaydetails')

  .then(response => response.json())
  .then(data=>{

    if(data.status != 200){
      alert("Whoops somthing went wrong!");
        console.log("Get details error - " + data.error + " | " + data.status);
    }else{
      displaydetails(data.data);
      addJob();
    }
  })
}

/* 

  Used to display details

  :param data: The data that is wanted to be displayed

*/

function displaydetails(data){
  let topName = document.getElementById("top-name");
  topName.innerHTML = "Welcome - " + data[1]; 
}

/* 

  Used to add elements to the DOM

  :param list: The list of data to be added to the webpage

*/

function addElemen(list){
  if (list.length == 0){
    alert("You don't have any job listings yet!")
  }
  const element = document.getElementById("job-list");

  const idName = ['','comp-name','job-name', 'contract-type', 'start-date', 'salary','location', 'job-desc', 'email'];
  const textB = ['','Company name','Title', 'Contract', 'Start date', 'Yearly salary','Postcode', 'Description', 'contact'];

  

  for(mainIndex in list) {

    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    let editText = document.createTextNode("Edit");
    let deleteText = document.createTextNode("Delete");
    editBtn.class = "editBtn";
    deleteBtn.class = "deleteBtn";
    editBtn.appendChild(editText);
    deleteBtn.appendChild(deleteText);
    deleteBtn.onclick = deleteListing;

    let div = document.createElement("div");
    div.id = "job";
    let id = list[mainIndex][0];
    div.classList = list[mainIndex][3];

    editBtn.value = id;
    deleteBtn.value = id;

    div.appendChild(editBtn);
    div.appendChild(deleteBtn);

    for(index in list[mainIndex]){

      if (index != 0){
        let text = list[mainIndex][index];

        if (text.length >= 70){
          text = text.substring(0,70);
          text=text+"...";
        }
        /*const para = document.createElement("p");
        const node = document.createTextNode(textB[index] + text);
        */
        const para = document.createElement("input");
        para.placeholder = textB[index];
        para.value = text;
        para.id = idName[index];
        //para.appendChild(node);
        div.appendChild(para);
      }
    }
    element.appendChild(div);
  }
}

/* 

  Used to obtain the job data and then adds elements

*/

function addJob(){
  fetch('/display/company/jobview')

  .then(response => response.json())
  .then(data=>{

    if(data.status != 200){
      console.log("Failed to retrieve data")
    }else{
      addElemen(data.data);
    }
  })
}

/* 

  Used to filter the contract types

  :param contr_type: The contract type wanted to be filtered

*/

function filter(contr_type){

  const boxes = document.querySelectorAll('[id=job]');

  for (const box of boxes) {
    if (contr_type == "Both") {
      box.style.display = "";
    }else{
      if (box.classList == contr_type) {
        box.style.display = "";
      }else{
        box.style.display = "none";
      }
    }

  }
}

/* 

  Used to delete job listings

  :param data: The ID of the job being picked

*/

function deleteListing(data){
  id = data['explicitOriginalTarget']['attributes'][0]['value']

  let uploadObject = [id];

  let del = false
  if (confirm("Are you sure you want to delete this listing?")) {
    del = true
  } 

  if (del == true){
    url = "/delete/joblisting";
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        let strResponse = "Error: no response";
        if (this.readyState == 4 && this.status == 200) {
            strResponse = JSON.parse(this.responseText);
            if (strResponse.status == 200){
              alert("Job listing deleted!");
              reload()
            }else{
              console.log(strResponse.message + " - " + strResponse.status)
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