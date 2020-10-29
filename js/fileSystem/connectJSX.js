const singleProcess = jsx =>{//main.jsから引数を渡さない単発タイプのjsx
    const csInterface = new CSInterface();
    const singleRoot = csInterface.getSystemPath(SystemPath.EXTENSION) +`/jsx/singleProcess/`;
    return new Promise((resolve,reject)=>{
        csInterface.evalScript(`$.evalFile("${singleRoot}${jsx}")`,o=>{
            if(!o)reject(false);
            resolve(o);
        });
    });
}

const hostProcess = obj =>{//main.jsから引数を渡すhostscriptにつなぐ関数
    const csInterface = new CSInterface();
    return new Promise((resolve,reject)=>{
        csInterface.evalScript(`hostScript(${JSON.stringify(obj)})`,o=>{
            if(!o)reject(false);             
            resolve(o);
        });
    });
}