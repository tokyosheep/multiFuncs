const ElectronURL = "http://localhost:2000/";

const sendMsg = async(files:unknown) =>{
    console.log(files);
    const res = await fetch(ElectronURL,{
        method:"POST",
        body:JSON.stringify(files),
        headers:{"Content-Type":"application/json"}
    }).catch(e=>{
        console.log(e);
    });
    console.log(res);
}

export default sendMsg;