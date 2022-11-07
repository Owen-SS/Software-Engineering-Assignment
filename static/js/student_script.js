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