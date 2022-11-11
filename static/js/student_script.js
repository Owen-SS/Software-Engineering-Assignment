function editMode(edit) {
    console.log("Ran")
    console.log(edit)

    var editBtn = document.getElementById("edit");
    var saveBtn = document.getElementById("save");

    var fName = document.getElementById("fName");
    var sName = document.getElementById("sName");
    var dob = document.getElementById("dob");
    var addOne = document.getElementById("AD1");
    var addTwo = document.getElementById("AD2");
    var addThree = document.getElementById("AD3");
    var postcode = document.getElementById("postcode");

    if (edit == "Yes") {
        console.log("edit")
        editBtn.style.backgroundColor = "#eee";
        saveBtn.style.backgroundColor = "#2196F3";
        fName.removeAttribute("disabled");
        sName.removeAttribute("disabled");
        dob.removeAttribute("disabled");
        addOne.removeAttribute("disabled");
        addTwo.removeAttribute("disabled");
        addThree.removeAttribute("disabled");
        postcode.removeAttribute("disabled");
        
    } else if (edit == "No") {
        console.log("save")
        editBtn.style.backgroundColor = "#2196F3";
        saveBtn.style.backgroundColor = "#eee";
        fName.setAttribute("disabled", "disabled");
        sName.setAttribute("disabled", "disabled");
        dob.setAttribute("disabled", "disabled");
        addOne.setAttribute("disabled", "disabled");
        addTwo.setAttribute("disabled", "disabled");
        addThree.setAttribute("disabled", "disabled");
        postcode.setAttribute("disabled", "disabled");
    }
}

function cleardetails(){//does work but not in the system. only used for testing something

    document.getElementById('fName').value = "" ;
    document.getElementById("sName").value="";
    document.getElementById("dob").value="";
    document.getElementById("AD1").value="";
    document.getElementById("AD2").value="";
    document.getElementById("AD3").value="";
    document.getElementById("postcode").value="";
    
}

/*
function retrivedatafromjson(){
    console.log("getting data from file");
    let fName = document.getElementById("fName");
    let sName = document.getElementById("sName");
    let dob = document.getElementById("dob");
    let addOne = document.getElementById("AD1");
    let addTwo = document.getElementById("AD2");
    let addThree = document.getElementById("AD3");
    let postcode = document.getElementById("postcode");
    let request = new XMLHttpRequest();
  // in this if statement, if request is equal to 4th readystate(page has loaded completey) and the status code is anywhere between 200 to 299 which means the response was successful. The response will then get the json file to show the data it holds with a counter on the side and the data process in a specific order. The else if is if the ready state was not 4 and was maybe stuck in the 3rd ready state which means its loading with a status code of 400-499 which is client error response, if it was a 500-599 it would be a server error response. the website will display an error message with the status code of the error.
    request.onreadystatechange = function(){
      let response = "";
    if(this.readyState == 4 && this.status == 200){
        //process the response
        response = JSON.parse(this.responseText).studentDetails;
        let htmlString = "";
        let fNamehtml= "";
        let sNamehtml= "";
        let dobhtml= "";//date not working at this time
        let addOnehtml = "";
        let addTwohtml = "";
        let addThreehtml = "";
        let postcodehtml = ""
        for(item of response){
          let message = "Click here to view";
          /*htmlString +="<input 'data-id= '"+item.id+"'data-email='"+item.email+"'data-phone_number='"+item.phone_number+"'data-name= '"+item.name+"'data-surname= '"+item.surname+"'data-dob= '"+item.dob+"'data-addressOne='"+item.addressOne+"'data-addressTwo= '"+item.addressTwo+"'data-addressThree'"+item.addressThree+"'data-postcode= '"+item.postcode+"'data-username= '"+item.username+"'data-password= '"+item.password+"</input>";
          fNamehtml += "<input 'data-name= '"+item.name+"</input>";
          sNamehtml += "<input 'data-surname= '"+item.surname+"</input>";
          dobhtml += "<input 'data-dob= '"+item.dob+"</input>";
          addOnehtml += "<input 'data-addressOne= '"+item.addressOne+"</input>";
          addTwohtml += "<input 'data-addressTwo= '"+item.addressTwo+"</input>";
          addThreehtml += "<input 'data-addressThree= '"+item.addressThree+"</input>";
          postcodehtml += "<input 'data-postcode= '"+item.postcode+"</input>"
          }
      fName.value = fNamehtml; 
      sName.value = sNamehtml;
      dob.value = dobhtml;
      addOne.value = addOnehtml;
      addTwo.value = addTwohtml;
      addThree.value = addThreehtml;
      postcode.value = postcodehtml;
      }
      else if(this.readyState == 4 && this.status != 200){
        //show error to user
          response = "Error:"+this.statusText;
          alert(response);
      }
    }
  request.open("GET","/displaydetails", true);
  request.send();
}*/

function getDetails(){
  uploadObject = ["Smithy1667832522128"]

  let url = "/displaydetails_V2";
  let xhttp = new XMLHttpRequest();
  let data_res = "Error"
  xhttp.onreadystatechange = function() {
    let strResponse = "Error: no response";
    if (this.readyState == 4 && this.status == 200) {
      console.log("here")
      strResponse = JSON.parse(this.responseText);
      data_res = strResponse.data

      console.log(data_res)
      displaydetailsV2(data_res)
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

function displaydetailsV2(data){
  let fName = document.getElementById("fName");
  let sName = document.getElementById("sName");
  let dob = document.getElementById("dob");
  let addOne = document.getElementById("AD1");
  let addTwo = document.getElementById("AD2");
  let addThree = document.getElementById("AD3");
  let postcode = document.getElementById("postcode");

  fName.value = data[2]; 
  sName.value = data[3];
  dob.value = data[4];
  addOne.value = data[5];
  addTwo.value = data[6];
  addThree.value = data[7];
  postcode.value = data[8];
}

getDetails();