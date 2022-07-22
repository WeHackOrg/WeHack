
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
        /*make an HTTP request using the attribute value as the file name:*/
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /*remove the attribute, and call this function once more:*/
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
        }
        }      
        xhttp.open("GET", file, true);
        xhttp.send();
        /*exit the function:*/
        return;
    }
    }
    const chk = document.getElementById('chk');
    let lang = window.location.href;
    if (lang.search("vn") == -1) {
        chk.checked = false;
    } else {
        chk.checked = true;
    }
    chk.addEventListener('change', () => {
        let page = lang.slice(lang.lastIndexOf("/"));
        if (chk.checked == true) {
            window.location.href = `/vn${page}`;
        } else {
            window.location.href = `${page}`;
        }
    });
};
