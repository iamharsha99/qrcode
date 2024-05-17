const express=require('express')

const app=express();

const QRCode = require('qrcode')

app.get('/',(req,res)=>{
    
    res.sendFile(__dirname+'/index.html',(err)=>{
        if(err)
            console.log(err)
        console.log("File sent sucessfully");
    });
})

app.get('/generate',(req,res)=>{
    let data=req.query.data;

    QRCode.toDataURL(data, function (err, url) {
        if(err){
             res.write("Error generating qr code");
             res.end();
        }
        else
            {
                res.write('<body style="height:100vh; display: flex; flex-direction:column; justify-content:center; align-items:center;">');
                res.write(`<img src="${url}" style="width: 396px; height: 396px ;">`);
                res.write(`<button style="background-color: #4CAF50; 
                border: none;
                border-radius:12px;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;"><a href="${url}" style="text-decoration:none; color: white;" download="qr-code.jpg">Download Image</a></button>`)
                res.write('</body>');
                res.end();
            }
      })
})
app.listen(3000);
