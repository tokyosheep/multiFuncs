import http from "http" ;
import url from "url";

const connectServer:(receiveDropped:(r:any)=>void,postURL:number)=>void = (receiveDropped,postURL) =>{
    console.log(http.createServer);
    const server = http.createServer((req,res)=>{
        console.log(req.url);
        const url_parts = url.parse(req.url);
        switch(url_parts.pathname){
            case "/":
                if(req.method === "GET"){
                    res.writeHead(200,{"Content-Type":"text/html"});
                    res.end("server listening....");
                }else if(req.method === "POST"){
                    let body = "";
                    req.on("data",chunk=>{
                        body += chunk;
                    });
                    req.on("end",response=>{
                        response = JSON.parse(body);
                        console.log(response);
                        response.forEach(r=>receiveDropped(r));
                        res.end("nothing");
                    });
                }else{
                    console.log("error");
                }
            break;
            
            default:
                res.writeHead(200,{"Content-Type":"text/plain"});
                res.end("no page...");
            break;
        }
    });

    server.listen(postURL);
}

export default connectServer;