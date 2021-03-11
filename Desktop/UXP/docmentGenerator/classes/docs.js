const { DocumentPreset , LayerObj , LayerSetObj } = require("./class");

const docLayers = [
    new LayerObj("lay"),
    new LayerSetObj(
        "set",
        [
            new LayerObj("lay1"),
            new LayerObj("lay2"),
            new LayerSetObj(
                "set2",
                [
                    new LayerObj("lay3"),
                    new LayerObj("lay4")
                ]
            )
        ]
    )
];

const basicLayers = [
    new LayerSetObj(
        "set",
        [
            new LayerObj("lay")
        ]
    ),
    new LayerObj("over")
]


/*
    new DocumentPreset(
        name,
        width,
        height,
        resolution,
        mode,
        fill,
        layers,
        guides
    )
*/

module.exports.docs = [
    new DocumentPreset(
        "web",
        700,
        500,
        72,
        "RGBColorMode",
        docLayers,
        [[350],[250]]
    ),
    new DocumentPreset(
        "basic",
        1000,
        1200,
        300,
        "RGBColorMode",
        basicLayers,
        [[100,1000-100],[100,1200-100]]
    ),
    new DocumentPreset(
        "simple",
        500,
        500,
        72,
        "RGBColorMode",
        [
            new LayerObj("over")
        ],
        [[20],[300]]
    )
];

