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
function displaydetails(){
    
    var fName = document.getElementById('fName');
    var sName = document.getElementById("sName");
    var dob = document.getElementById("dob");
    var addOne = document.getElementById("AD1");
    var addTwo = document.getElementById("AD2");
    var addThree = document.getElementById("AD3");
    var postcode = document.getElementById("postcode");

    //sName.placeholder = "Test";
   // document.getElementsByName('fName')[0].placeholder='new text for email';

   if (fName,sName,dob,addOne, addTwo, addThree, postcode  !== undefined && fName,sName,dob,addOne, addTwo, addThree, postcode  !== null) {
    // Now we know that foo is defined, we are good to go. !== means if the operands are not True it will return this
    fName.value = 'preloaded first name';
    sName.value = 'preloaded surname';
    dob.value = '06/09/2004'//not working on website=
    addOne.value = 'preloaded first address' ;
    addTwo.value = 'preloaded second address'; 
    addThree.value='preloaded third address'; 
    postcode.value = 'preloaded postcode';
  }
    console.log(fName)

}


cleardetails();
displaydetails();
