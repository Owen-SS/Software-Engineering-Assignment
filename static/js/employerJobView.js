
/* 

  Used to get user details and then display them

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

  Used to display user details

  :param data: The user data

*/

function displaydetails(data){
  let topName = document.getElementById("top-name");
  topName.innerHTML = "Go to Employer Dashboard - " + data[1]; 
}

/* 

  Used to add the elements to the page

  :param list: The list of user data

*/

function addElemen(list){
  const element = document.getElementById("job-list");

  const idName = ['','comp-name','job-name', 'contract-type', 'start-date', 'salary','location', 'job-desc', 'email'];
  const textB = ['','','Title\n', 'Contract\n', 'Start date\n', 'Yearly salary\n£','Postcode\n', 'Description\n', 'contact\n'];
  for(mainIndex in list) {
    let div = document.createElement("div");
    let id = list[mainIndex][0];

    div.classList = list[mainIndex][3];
    div.id = "job";

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
    }
    element.appendChild(div);
  }
}

/* 

  This gets the job data and then displays it on the page

*/

function addJob(){
  fetch('/display/jobview')

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

  This is used to filer the contrat type

  :param contr_type: The contract that is wanted to be displayed

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

  Used to apply to jobs

  :param data: The ID of the job wanted to be applied too

*/

function applyJob(data){
  id = data['explicitOriginalTarget']['attributes'][0]['value']
  console.log(id)
}