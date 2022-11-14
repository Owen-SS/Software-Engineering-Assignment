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