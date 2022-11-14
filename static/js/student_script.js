function editMode(edit) {
  console.log("Ran")
  console.log(edit)

  var editBtn = document.getElementById("edit");
  var saveBtn = document.getElementById("save");

  var fName = document.getElementById("fName");
  var sName = document.getElementById("sName");
  var email = document.getElementById('email')
  var phoneNum = document.getElementById('phoneNum')
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
      email.removeAttribute("disabled");
      phoneNum.removeAttribute("disabled");
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
      email.setAttribute("disabled", "disabled");
      phoneNum.setAttribute("disabled", "disabled");
      dob.setAttribute("disabled", "disabled");
      addOne.setAttribute("disabled", "disabled");
      addTwo.setAttribute("disabled", "disabled");
      addThree.setAttribute("disabled", "disabled");
      postcode.setAttribute("disabled", "disabled");
      updateDetails();
  }
}

function cleardetails(){

    document.getElementById('fName').value = "";
    document.getElementById("sName").value="";
    document.getElementById('email').value = "";
    document.getElementById('phoneNum').value = "";
    document.getElementById("dob").value="";
    document.getElementById("AD1").value="";
    document.getElementById("AD2").value="";
    document.getElementById("AD3").value="";
    document.getElementById("postcode").value="";
    
}

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
  let fName = document.getElementById("fName");
  let sName = document.getElementById("sName");
  let email = document.getElementById('email');
  let phoneNum = document.getElementById('phoneNum');
  let dob = document.getElementById("dob");
  let addOne = document.getElementById("AD1");
  let addTwo = document.getElementById("AD2");
  let addThree = document.getElementById("AD3");
  let postcode = document.getElementById("postcode");

  email.value = data[0]; 
  phoneNum.value = data[1]; 
  fName.value = data[2]; 
  topName.innerHTML = "Welcome - " + data[2]; 
  sName.value = data[3];
  dob.value = data[4];
  addOne.value = data[5];
  addTwo.value = data[6];
  addThree.value = data[7];
  postcode.value = data[8];
}

function updateDetails(){

  let id = "Smithy1667832522128"

  let fName = document.getElementById("fName").value;
  let sName = document.getElementById("sName").value;
  let email = document.getElementById('email').value;
  let phoneNum = document.getElementById('phoneNum').value;
  let dob = document.getElementById("dob").value;
  let addOne = document.getElementById("AD1").value;
  let addTwo = document.getElementById("AD2").value;
  let addThree = document.getElementById("AD3").value;
  let postcode = document.getElementById("postcode").value;

  uploadObject.push(
    email,
    phoneNum,
    fName,
    sName,
    dob,
    addOne,
    addTwo,
    addThree,
    postcode
    );

  url = "/student/update";
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
      let strResponse = "Error: no response";
      if (this.readyState == 4 && this.status == 200) {
          strResponse = JSON.parse(this.responseText);
          alert(strResponse.message);
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

function deleteAccount(){
  let id = "Smithy1667832522128"
}