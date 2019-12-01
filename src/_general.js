
export function stringifyDate(date) {
    // converts date obj to string
    return date.toUTCString();
}


export function removeHTMLComments(html, removeComments=false) {
    // removes html comments
    if(!removeComments) {
        return html;
    }

    var re = /(?=<!--)([\s\S]*?)-->/gi;
    return html.replace(re, "");
}

export function removeCSSComments(css, removeComments=false) {
    // removes css comments
    if(!removeComments) {
        return css;
    }

    var re = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gi;
    return css.replace(re, "");
}


export function applyClassesToHTML(html, css, removeComments=false) {
    // takes HTML and CSS as strings and applies the CSS classes as inline style attributes.
    // returns only the new HTML

    // first, get a list of all the CSS classes
    var cssClasses = {},
        cssRegex = /\.([a-z0-9_-]+)\s+{([\s\S]+)}/gi;

    var tmp;

    while((tmp = cssRegex.exec(removeCSSComments(css, removeComments)) ) !== null) {
        if(tmp !== null) {
            cssClasses[ tmp[1] ] = tmp[2].replace(/[\t\n{}]+/gm, "").trim();
        }
    }


    // second, get a list of all the HTML tags with a class attribute
    var newHTML = html,
        codeRegex = /<[a-z ]+\s+(className=['"][a-z\-_0-9 ]+["'])[/a-z0-9:;\-_"' ]*>/gi,
        htmlTags = [];

    tmp = null;

    while((tmp = codeRegex.exec((html).replace("\t", "")) ) !== null) {
        if(tmp !== null) {
            htmlTags.push({
                tag: tmp[0],
                classAttr: tmp[1]
            });
        }
    }

    
    // third, apply the classes to each tag and remove the class attribute
    for(var i = 0; i < htmlTags.length; i++) {
        // for each tag with a class attribute, get a list of its classes
        var classesArray = htmlTags[i].classAttr.replace("className=", "").replace(/["']*/g, "").split(" ");
        

        // classesArray should now have an array of class names from each HTML tag identified
        // now compare this with the array of CSS classes
        var styleString = "";

        for(var x = 0; x < classesArray.length; x++) {
            // for each specified class
            if(classesArray[x] === '"' || classesArray[x] === "") {
                continue;
            }

            // if the class is valid
            var matchedStyle = cssClasses[ classesArray[x] ];
            
            if(matchedStyle !== undefined) {
                styleString += matchedStyle;
            }
        }


        // now the style string needs to be entered into the tag somewhere
        var replaceRegex = new RegExp(htmlTags[i].classAttr.replace(/['"]/g, '\\"').replace(/-/g, '\\-'), "g");

        newHTML = newHTML.replace(replaceRegex, 'style="' + styleString + '" ');
    }

    return newHTML;
}
