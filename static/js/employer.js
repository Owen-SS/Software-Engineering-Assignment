function editMode(edit) {
  
    var editBtn = document.getElementById("edit");
    var saveBtn = document.getElementById("save");
  
    var cName = document.getElementById("cName");
    var cEmail = document.getElementById('cEmail')
    var cPhoneNum = document.getElementById('cPhoneNum')
    var addOne = document.getElementById("AD1");
    var addTwo = document.getElementById("AD2");
    var addThree = document.getElementById("AD3");
    var postcode = document.getElementById("postcode");
  
    if (edit == "Yes") {
        editBtn.style.backgroundColor = "#eee";
        saveBtn.style.backgroundColor = "#2196F3";
        cName.removeAttribute("disabled");
        cEmail.removeAttribute("disabled");
        cPhoneNum.removeAttribute("disabled");
        addOne.removeAttribute("disabled");
        addTwo.removeAttribute("disabled");
        addThree.removeAttribute("disabled");
        postcode.removeAttribute("disabled");
        
    } else if (edit == "No") {
        editBtn.style.backgroundColor = "#2196F3";
        saveBtn.style.backgroundColor = "#eee";
        cName.setAttribute("disabled", "disabled");
        cEmail.setAttribute("disabled", "disabled");
        cPhoneNum.setAttribute("disabled", "disabled");
        addOne.setAttribute("disabled", "disabled");
        addTwo.setAttribute("disabled", "disabled");
        addThree.setAttribute("disabled", "disabled");
        postcode.setAttribute("disabled", "disabled");
        updateDetails();
    }
  }
  
  function cleardetails(){
  
      document.getElementById('cName').value = "";
      document.getElementById('cEmail').value = "";
      document.getElementById('cPhoneNum').value = "";
      document.getElementById("AD1").value="";
      document.getElementById("AD2").value="";
      document.getElementById("AD3").value="";
      document.getElementById("postcode").value="";
      
  }
  
  function getDetails(){
    uploadObject = ["Smithy1667832522128"]
  
    let url = "/displaydetails";
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
    let cName = document.getElementById("cName");
    let cEmail = document.getElementById('cEmail');
    let cPhoneNum = document.getElementById('cPhoneNum');
    let addOne = document.getElementById("AD1");
    let addTwo = document.getElementById("AD2");
    let addThree = document.getElementById("AD3");
    let postcode = document.getElementById("postcode");
  
    cEmail.value = data[3]; 
    cPhoneNum.value = data[4]; 
    cName.value = data[5]; 
    topName.innerHTML = "Welcome - " + data[5]; 
    addOne.value = data[6];
    addTwo.value = data[7];
    addThree.value = data[8];
    postcode.value = data[9];
  }
  
  function updateDetails(){
    let cName = document.getElementById("cName").value;
    let cEmail = document.getElementById('cEmail').value;
    let cPhoneNum = document.getElementById('cPhoneNum').value;
    let addOne = document.getElementById("AD1").value;
    let addTwo = document.getElementById("AD2").value;
    let addThree = document.getElementById("AD3").value;
    let postcode = document.getElementById("postcode").value;
  
    uploadObject.push(
      cEmail,
      cPhoneNum,
      cName,
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
    uploadObject = ["None"]
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
  }