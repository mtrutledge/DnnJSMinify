function createjscssfile(filename,filetype){if("js"==filetype){var fileref=document.createElement("script");fileref.setAttribute("type","text/javascript"),fileref.setAttribute("src",filename)}else if("css"==filetype){var fileref=document.createElement("link");fileref.setAttribute("rel","stylesheet"),fileref.setAttribute("type","text/css"),fileref.setAttribute("href",filename)}return fileref}function replacejscssfile(oldfilename,newfilename,filetype){for(var targetelement="js"==filetype?"script":"css"==filetype?"link":"none",targetattr="js"==filetype?"src":"css"==filetype?"href":"none",allsuspects=document.getElementsByTagName(targetelement),i=allsuspects.length;i>=0;i--)if(allsuspects[i]&&null!=allsuspects[i].getAttribute(targetattr)&&allsuspects[i].getAttribute(targetattr).indexOf(oldfilename)!=-1){var newelement=createjscssfile(newfilename,filetype);allsuspects[i].parentNode.replaceChild(newelement,allsuspects[i])}}try{__editorOverrideCSSPath&&document.body.appendChild(createjscssfile(__editorOverrideCSSPath,"css"))}catch(e){}