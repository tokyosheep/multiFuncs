function getActiveBoard(){
        var artBoards = app.activeDocument.artboards;
        var index = artBoards.getActiveArtboardIndex();
        return artBoards[index];
}

function findLayer(){//guide layerがなかったら作成、あったら既存のレイヤーにガイドをいれる
    var layers = app.activeDocument.layers;
    for(var i=0;i<layers.length;i++){
        if(layers[i].name === "guide"){
            return layers[i];
        }
    }
    var lay = app.activeDocument.layers.add();
    lay.name = "guide";
    return lay;
}