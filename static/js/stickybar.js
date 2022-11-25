
window.onload = function()
{
    var options = document.getElementById("options");
    var optionsOffset = options.offsetTop;

    window.optionsOffset = optionsOffset;

}



// When scrolled passed original y value, make sticky
window.onscroll = function() {toggleSticky(window.optionsOffset)};


function toggleSticky(optionsOffset) {

    if (window.pageYOffset >= optionsOffset) 
    {
        options.classList.add("sticky")
    } 
    else 
    {
        options.classList.remove("sticky");
    }
}