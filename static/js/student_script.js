function editMode(edit) {
    console.log("Ran")
    console.log(edit)

    var fName = document.getElementById("fName");
    var sName = document.getElementById("sName");
    var dob = document.getElementById("dob");
    var addOne = document.getElementById("AD1");
    var addTwo = document.getElementById("AD2");
    var addThree = document.getElementById("AD3");
    var postcode = document.getElementById("postcode");

    if (edit == "Yes") {
        console.log("edit")
        fName.removeAttribute("disabled");
        sName.removeAttribute("disabled");
        dob.removeAttribute("disabled");
        addOne.removeAttribute("disabled");
        addTwo.removeAttribute("disabled");
        addThree.removeAttribute("disabled");
        postcode.removeAttribute("disabled");
        
    } else if (edit == "No") {
        console.log("save")
        fName.setAttribute("disabled", "disabled");
        sName.setAttribute("disabled", "disabled");
        dob.setAttribute("disabled", "disabled");
        addOne.setAttribute("disabled", "disabled");
        addTwo.setAttribute("disabled", "disabled");
        addThree.setAttribute("disabled", "disabled");
        postcode.setAttribute("disabled", "disabled");
    }
}