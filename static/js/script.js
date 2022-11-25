function getDetails(){
  uploadObject = ["None"]

  let url = "/displaydetails";
  let xhttp = new XMLHttpRequest();
  let data_res = "Error"
  xhttp.onreadystatechange = function() {
    let strResponse = "Error: no response";
    if (this.readyState == 4 && this.status == 200) {
      console.log("here")
      strResponse = JSON.parse(this.responseText);
      data_res = strResponse.data

      console.log(data_res)
      if (strResponse.message != 404){
        displaydetails(data_res)
      }else{
        alert("Whoops somthing went wrong!")
        console.log("Get details error - " + strResponse.message)
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

function addElemen(){
  let parentDiv = document.createElement("div");
  let cDiv1 = document.createElement("div");
  let cDiv2 = document.createElement("div");
  let cDiv3 = document.createElement("div");


  let cDiv1t = document.createTextNode("Whassup bitches");
  let cDiv2t = document.createTextNode("Whassup bitches");
  let cDiv3t = document.createTextNode("Whassup bitches");

  cDiv1.appendChild(cDiv1t);
  cDiv2.appendChild(cDiv2t);
  cDiv3.appendChild(cDiv3t);

  parentDiv.appendChild(cDiv1);
  parentDiv.appendChild(cDiv2);
  parentDiv.appendChild(cDiv3);

  let jobL = document.getElementById("job-list");
  document.body.insertBefore(parentDiv, jobL);

}


function addJob(){
  fetch('/display/jobview')

  .then(response => response.json())
  .then(data=>{

    if(data.message != 200){
      console.log("Failed to retrieve data")
    }else{
      addElemen();
    }
  })


}
addJob()