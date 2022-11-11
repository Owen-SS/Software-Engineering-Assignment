
function toggle_filter_dropdown() 
{
    var dropdown_content = document.getElementById("dropdown-content");

    if (dropdown_content.style.display === "block")
    {
        dropdown_content.style.display = "none";
    }
    else
    {
        dropdown_content.style.display = "block";
    }
}

