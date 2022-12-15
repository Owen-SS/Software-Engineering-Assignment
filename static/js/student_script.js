let edit = true

function start() {
  edit = true
  var editBtn = document.getElementById("edit");

  editBtn.style.backgroundColor = "#2196F3";
  editBtn.innerHTML = "Edit";
  fName.removeAttribute("disabled");
  sName.removeAttribute("disabled");
  email.removeAttribute("disabled");
  phoneNum.removeAttribute("disabled");
  dob.removeAttribute("disabled");
  addOne.removeAttribute("disabled");
  addTwo.removeAttribute("disabled");
  addThree.removeAttribute("disabled");
  postcode.removeAttribute("disabled");
}

function editMode() {
  var editBtn = document.getElementById("edit");

  var fName = document.getElementById("fName");
  var sName = document.getElementById("sName");
  var email = document.getElementById('email')
  var phoneNum = document.getElementById('phoneNum')
  var dob = document.getElementById("dob");
  var addOne = document.getElementById("AD1");
  var addTwo = document.getElementById("AD2");
  var addThree = document.getElementById("AD3");
  var postcode = document.getElementById("postcode");

  if (edit == true) {
    edit = false
    editBtn.innerHTML = "Save";
    fName.removeAttribute("disabled");
    sName.removeAttribute("disabled");
    email.removeAttribute("disabled");
    phoneNum.removeAttribute("disabled");
    dob.removeAttribute("disabled");
    addOne.removeAttribute("disabled");
    addTwo.removeAttribute("disabled");
    addThree.removeAttribute("disabled");
    postcode.removeAttribute("disabled");
      
  } else if (edit == false) {
    edit = true
    editBtn.style.backgroundColor = "#2196F3";
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
  fetch('/displaydetails')

  .then(response => response.json())
  .then(data=>{

    if(data.status != 200){
      alert("Whoops somthing went wrong!");
        console.log("Get details error - " + data.error + " | " + data.status);
    }else{
      displaydetails(data.data);
    }
  })
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

  email.value = data[3]; 
  phoneNum.value = data[4]; 
  fName.value = data[5]; 
  topName.innerHTML = "Welcome - " + data[5]; 
  sName.value = data[6];
  dob.value = data[7];
  addOne.value = data[8];
  addTwo.value = data[9];
  addThree.value = data[10];
  postcode.value = data[11];
}

function updateDetails(){
  let uploadObject = []
  var editBtn = document.getElementById("edit");

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

  url = "/update/details";
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
      let strResponse = "Error: no response";
      if (this.readyState == 4 && this.status == 200) {
        strResponse = JSON.parse(this.responseText);
        if (strResponse.status == 200){
          //alert(strResponse.message);
          editBtn.innerHTML = "Saved!";
          editBtn.style.backgroundColor = "#00E400";
          setTimeout(()=> {
            editBtn.innerHTML = "Edit";
            editBtn.style.backgroundColor = "#2196F3";
          },2000);
          

        }else{
          editBtn.innerHTML = "Failed";
          editBtn.style.backgroundColor = "#FF0000";
          setTimeout(()=> {
            editBtn.innerHTML = "Edit";
            editBtn.style.backgroundColor = "#2196F3";
          },2000);
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

function deleteAccount(){
  uploadObject = ["None"]
  var editBtn = document.getElementById("edit");
  
  let del = false
  if (confirm("Are you sure you want to delete your account?")) {
    del = true
  } 
  
  if(del == true){
    let url = "/delete/account";
    let xhttp = new XMLHttpRequest();
    let data_res = "Error"
    xhttp.onreadystatechange = function() {
      let strResponse = "Error: no response";
      if (this.readyState == 4 && this.status == 200) {
        strResponse = JSON.parse(this.responseText);
        data_res = strResponse.data

        if (strResponse.message != 404){
          displaydetails(data_res)
        }else{
          editBtn.value = "Failed";
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
}


/* should allow a user to view there cv in another page i need to create a page for it
Also still need to make th ep tag change when the file is selected */
function cvContents(){
  const reader = new FileReader()

  let files = document.getElementById('cv_upload').files
  reader.onload = async (event) => {
      document.getElementById('preview').setAttribute('src', event.target.result)
  }
  reader.readAsDataURL(files[0])
}