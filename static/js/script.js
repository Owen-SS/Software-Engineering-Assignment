function getDetails(){
  uploadObject = ["None"];

  let url = "/displaydetails";
  let xhttp = new XMLHttpRequest();
  let data_res = "Error";
  xhttp.onreadystatechange = function() {
    let strResponse = "Error: no response";
    if (this.readyState == 4 && this.status == 200) {
      strResponse = JSON.parse(this.responseText);
      data_res = strResponse.data;

      console.log(data_res);
      if (strResponse.message != 404){
        displaydetails(data_res);
        addJob();
      }else{
        alert("Whoops somthing went wrong!");
        console.log("Get details error - " + strResponse.message);
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

function displaydetails(data){
  let topName = document.getElementById("top-name");
 
  topName.innerHTML = "Welcome - " + data[2]; 
}

function addElemen(list){
  const element = document.getElementById("job-list");

  const idName = ['job-name', 'contract-type', 'start-date', 'salary','location', 'job-desc', 'email'];
  const textB = ['', '', '', '£','', '', ''];
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

addJob() // Remove this after layout is done!