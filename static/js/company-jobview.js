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

function displaydetails(data){
  let topName = document.getElementById("top-name");
  topName.innerHTML = "Welcome - " + data[1]; 
}

function addElemen(list){
  if (list.length == 0){
    alert("You don't have any job listings yet!")
  }
  const element = document.getElementById("job-list");

  const idName = ['comp-name','job-name', 'contract-type', 'start-date', 'salary','location', 'job-desc', 'email'];
  const textB = ['','Title\n', 'Contract\n', 'Start date\n', 'Yearly salary\n£','Postcode\n', 'Description\n', 'contact\n'];
  for(mainIndex in list) {
    let div = document.createElement("div");
    div.id = "job";
    let id = list[mainIndex][0];

    for(index in list[mainIndex]){

      let text = list[mainIndex][index];
      const para = document.createElement("p");
      const node = document.createTextNode(textB[index] + text);
      para.id = idName[index];
      para.appendChild(node);
      div.appendChild(para);
    }
    element.appendChild(div);
  }
}


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