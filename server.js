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
                res.write('<body style="height:100vh; display: flex; justify-content:center; align-items:center;">');
                res.write(`<img src="${url}" style="width: 396px; height: 396px ;">`);
                res.write('</body>');
                res.end();
            }
      })
})
app.listen(3000);
