const app = require('photoshop').app;

class DocumentPreset{
    constructor(
        name,//document テンプレート名
        width,//documentの幅
        height,//documentの高さ
        resolution,//documentの解像度
        mode,//documentのカラーモード
        layers,//document作成時に作成するlayer
        guides//document作成時に作成するガイド
        ){
        this.name = name;/* string */
        this.width = width;/* number */
        this.height = height;/* number */
        this.resolution = resolution;/* number */
        this.mode = mode;/* RGB CMYK */
        this.layers = layers;/* layer{}[] */
        this.guides = guides/* [[number],[number]] vertical,horizontal */
    }

    async createDocument(){//documentを作成する
        await app.createDocument({
            width:this.width,
            height:this.height,
            resolution:this.resolution,
            mode:this.mode,
            fill:"transparent"
        });
        /*
            createDocumentのオプション、色々設定できそうですが公式ドキュメントのどこを見ても以下しか見つからなかった
            {width: 800, height: 600, resolution: 300, mode: "RGBColorMode", fill: "transparent"}
        */
    }

    async createLayers(layers){
        await Promise.all(layers.reverse().map(async(lay)=>{
            if(lay.type === "layerSet"){//レイヤーセットなら再帰的に子レイヤーを作成する
                await this.createLayers(lay.layers);
                await lay.createLayer(lay.layers.map(l=>l.itSelf));
            }else{
                await lay.createLayer();
            }
            return;
        }));
    }

    async createGuides(){//guide作成
        for(let i=0;i<this.guides.length;i++){
            await Promise.all(this.guides[i].map(async(guide)=>{
                await app.activeDocument.drawGuide(i === 0 ? "vertical" : "horizontal",guide);
            }));
        }
    }
    
}

module.exports.DocumentPreset = DocumentPreset;

class LayerObj{
    constructor(name,opacity=100){
        this.name = name;
        this.opacity = opacity;
        this.type = "layer";
        this.itSelf;//layerを作成した時にそれ自身を格納する
    }
    
    async createLayer(){
        this.itSelf = await app.activeDocument.createLayer({name:this.name,opacity:this.opacity});
    }
}

module.exports.LayerObj = LayerObj;

class LayerSetObj extends LayerObj{//layer classから継承
    constructor(name,layers,opacity){
        super(name,opacity);
        this.layers = layers;//このlayerを格納する
        this.type = "layerSet";
    }

    async createLayer(layers){
        this.itSelf = await app.activeDocument.createLayerGroup({name:this.name,opacity:this.opacity,fromLayers:layers});
    }
}

module.exports.LayerSetObj = LayerSetObj;

