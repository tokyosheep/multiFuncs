(function(){
    if(1 > app.documents.length){
        alert("there's nothing any opned document");
        return false;
    }
    return app.activeDocument.documentColorSpace.toString();
})();