function change() // no ';' here
{
    var elem = document.getElementById("myButton1");
    if (elem.value=="Close Curtain") elem.value = "Open Curtain";
    else elem.value = "Close Curtain";
}