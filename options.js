/*
 * I use this thing as a dictionary
 **/
var domains = {}

/*
 * Deletes the item with the given key from the dictionary
 * then reloads the table and stores the settings
 **/
function delItem(key) {
    delete domains[key]
    createTable()
    chrome.storage.sync.set({'domains': domains})
}

/**
 * Creates the HTML table to put inside the options page
 **/
function createTable() {
    table = "<table>"
    
    table += "<head>"
    table+="<tr>"
    table+="<td>Domain</td>"
    table+="<td>UserAgent</td>"
    table+="<td></td>"
    table+="</tr>"
    table += "</head>"
        
    
    k = Object.keys(domains)
    for (i=0; i<k.length; i++) {
        colour = i % 2 ? '#FFFFFF' : '#EAEAEA'
        table+='<tr bgcolor="' + colour  + '">'
        
        table+="<td>"
        table+=k[i]
        table+="</td>"
        
        table+="<td>"
        table+=domains[k[i]]
        table+="</td>"
        
        table+="<td>"
        table+='<button id="btnremove'+ i + '">Remove</button>'
        table+="</td>"
        
        table+="</tr>"
    }
    
    table += "</table>"
    
    d = document.getElementById("tablediv");
    d.innerHTML = table;
    
    for (i=0; i<k.length; i++) {
        b = document.getElementById("btnremove"+i);
        
        /* js is the worst language ever, I refuse to put an explicatory comment */
        f = function(q){return function () {delItem(q)}}
        b.addEventListener("click",f(k[i]))
    }
}

chrome.storage.sync.get('domains',                       
    function (result) {
        domains = result.domains
        if (domains == undefined)
            domains = {}
        createTable()
    }
);
