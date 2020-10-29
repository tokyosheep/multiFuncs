(function(){
    if(1 > app.documents.length){
        alert("there's nothing any opned document");
        return false;
    }
    var selectedBord = getActiveBoard();
    var rect = selectedBord.artboardRect;

    var width = rect[0] + rect[2];
    var height = rect[1] + rect[3];
    
    var guideLay = findLayer();
    var vertical = app.activeDocument.pathItems.add();
    vertical.filled = false;
    vertical.setEntirePath([[width/2,rect[1]],[width/2,rect[3]]]);
    vertical.move(guideLay, ElementPlacement.PLACEATBEGINNING);
    vertical.guides = true;
    var horizontal = app.activeDocument.pathItems.add();
    horizontal.filled = false;
    horizontal.setEntirePath([[rect[0],height/2],[rect[2],height/2]]);
    horizontal.move(guideLay, ElementPlacement.PLACEATBEGINNING);
    horizontal.guides = true;
    return true;
})();