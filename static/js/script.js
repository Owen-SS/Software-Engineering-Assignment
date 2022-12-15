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
  const element = document.getElementById("job-list");

  const idName = ['','comp-name','job-name', 'contract-type', 'start-date', 'salary','location', 'job-desc', 'email'];
  const textB = ['','','Title\n', 'Contract\n', 'Start date\n', 'Yearly salary\n£','Postcode\n', 'Description\n', 'contact\n'];
  for(mainIndex in list) {
    let div = document.createElement("div");
    let id = list[mainIndex][0];

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

function applyJob(data){
  id = data['explicitOriginalTarget']['attributes'][0]['value']
  console.log(id)
}