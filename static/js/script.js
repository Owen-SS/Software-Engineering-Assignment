function getDetails(){
  /*
  Gets account details and displays to screen
  */
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

function displaydetails(data){
  /*
  displays details to screen
  */
  let topName = document.getElementById("top-name");
  topName.innerHTML = "Welcome - " + data[1]; 
}

function addElement(list){
  /*
  Adds DOM elements to page
  */
 
  const element = document.getElementById("job-list");

  const idName = ['','comp-name','job-name', 'contract-type', 'start-date', 'salary','location', 'job-desc', 'email'];
  const textB = ['','','Title\n', 'Contract\n', 'Start date\n', 'Yearly salary\n£','Postcode\n', 'Description\n', 'contact\n'];
  for(mainIndex in list) {
    let div = document.createElement("div");
    let id = list[mainIndex][0];

    div.classList = list[mainIndex][3];
    div.id = "job";

    const applyBtn = document.createElement("button");
    const applyText = document.createTextNode("Apply");
    applyBtn.class = "applyBtn";
    applyBtn.appendChild(applyText);
    applyBtn.value = id;
    applyBtn.onclick = applyJob;

    for(index in list[mainIndex]){
      if (index != 0){
        let text = list[mainIndex][index];

        if (text.length >= 70){
          text = text.substring(0,70);
          text=text+"...";
        }
        const para = document.createElement("p");
        const node = document.createTextNode(textB[index] + text);
        para.id = idName[index];
        para.appendChild(node);
        div.appendChild(para);
      }
      div.appendChild(applyBtn);
    }
    element.appendChild(div);
  }
}


function addJob(){
  /*
  Retrieves job data from website and adds it to the DOM
  */

  fetch('/display/jobview')

  .then(response => response.json())
  .then(data=>{

    if(data.status != 200){
      console.log("Failed to retrieve data")
    }else{
      addElement(data.data);
    }
  })
}

function filter(contr_type){
  /*
  Filters jobs displayed to user by contract type
  */

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

function applyJob(data){
  /*
  Applies to a specific job listing
  */

  id = data['explicitOriginalTarget']['attributes'][0]['value']
  console.log(id)
  let uploadObject = [id];

  let url = "/apply";
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    let strResponse = "Error: no response";
    if (this.readyState == 4 && this.status == 200) {
      strResponse = JSON.parse(this.responseText);
      if (strResponse.message == 200){
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