const electron = require("electron");
const { ipcMain } = electron;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require(`path`);
const fs = require("fs");

const dir_home = process.env[process.platform == `win32` ? `USERPROFILE` : `HOME`];
const dir_desktop = path.join(dir_home, `Desktop`);//デスクトップパス

const createDirectory = async filePath =>{//mainprocessだけでfile処理
    const pureName = path.basename(filePath,path.extname(filePath));
    await fs.promises.mkdir(`${dir_desktop}/${pureName}`);
}

let mainWindow;

const createWindow = () =>{
    mainWindow = new BrowserWindow({width:400,height:300,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.webContents.openDevTools();
    mainWindow.on("closed",()=>{
        mainWindow = null;
    });
}

app.on("will-finish-launching",()=>{
    app.on("open-file",(event,filePath)=>{
        event.preventDefault();
        if(mainWindow){
            mainWindow.webContents.send("dropFile",filePath);
        }else{
            app.on("ready",()=>{//ドラッグしてウインドウが開いたらipc通信開始
                mainWindow.webContents.on("did-finish-load",()=>{
                    mainWindow.webContents.send("dropFile",filePath);
                    (async()=>{
                        await createDirectory(filePath);
                    })();
                });
            });
        }
    })
})

app.on("ready",()=>{
    createWindow();
});