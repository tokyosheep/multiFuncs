const photoshop = require("photoshop");
const {app} = require("photoshop");
const batchPlay = photoshop.action.batchPlay;
/*
    appのprototypeにガイド作成メソッドを作成する
*/
exports.initPsMethod = () =>{
    app.Document.prototype.drawGuide = async (direction,value) =>{
        if( isNaN(value) || (direction !== "vertical" && direction !== "horizontal") ){
            app.showAlert("the value is invalid");
            return;
        }
        return await batchPlay(
            [
                {
                "_obj": "make",
                "new": {
                    "_obj": "good",
                    "position": {
                        "_unit": "pixelsUnit",
                        "_value": value
                    },
                    "orientation": {
                        "_enum": "orientation",
                        "_value": direction,/* "vertical or "horizontal" */
                    },
                    "kind": {
                        "_enum": "kind",
                        "_value": "document"
                    },
                    "_target": [
                        {
                            "_ref": "document",
                            "_id": 275
                        },
                        {
                            "_ref": "good",
                            "_index": 1
                        }
                    ]
                },
                "_target": [
                    {
                        "_ref": "good"
                    }
                ],
                "guideTarget": {
                    "_enum": "guideTarget",
                    "_value": "guideTargetCanvas"
                    },
                    "_isCommand": true,
                    "_options": {
                        "dialogOptions": "dontDisplay"
                    }
                }
            ],{
                "synchronousExecution": false,
                "modalBehavior": "fail"
            });
    };
}