const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { Client,LocalAuth } = require('whatsapp-web.js');
const express=require('express');
const app=express();
//const puppeteer=require('puppeteer');
// const bot= async ()=>{
// const browser = await puppeteer.launch({
//     headless: true,
//     args: ['--no-sandbox','--disable-setuid-sandbox']
//   })
// }
//  bot();
// const SESSION_FILE_PATH = './session.json';

// let sessionData;
// if(fs.existsSync(SESSION_FILE_PATH)) {
//     sessionData = require(SESSION_FILE_PATH);
// }



// const client = new Client(
//     {
//    // authStrategy: new LegacySessionAuth({
//         session: sessionData
//     //})
// }
// );

const client= new Client({
    authStrategy: new LocalAuth(),
    puppeteer:{
        headless:true
        ,args:['--no-sandbox','--disable-setuid-sandbox']
    }
});

 

client.on('qr', qr => {
    console.log(qr);
    qrcode.generate(qr, {small: true},(qrcode)=>{
        console.log(qrcode);
    });
});

client.on('ready', () => {
    console.log('Client is ready!');
});
// client.on('authenticated', (session) => {
//     sessionData = session;
//     fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
//         if (err) {
//             console.error(err);
//         }
//     });
// });
//const Chat_id="";
client.on('message', async message => {
    //console.log(message);
	//const chat_id=message.id._serialized;
    let chat = await message.getChat();
    
    let response="";
    const hola=["hii","Hii","hello","hey","hola"];
    if(message.body=='Hii'||message.body=='Hi!'||message.body=='Hello'||message.body=='hey' ){
         response=hola[Math.floor(Math.random()*Array.length)];
    }else if (message.body=="Good Morning"||message.body=="gd mrng"||message.body=="Gd mrng"){
        response="Good Morning!";
    }else{ 
        //console.log("else");
        if(chat.isGroup==false){
        await setTimeout(()=>{

            client.sendMessage(message.from,"I\’m sorry I couldn\’t reply you at this time, I\’m either  busy or away from my phone. I\'ll get back to you as soon as possible.")
        },20000);

        }
    }
    if(response){
     client.sendMessage(message.from,response);
    }
   
});
client.initialize();
app.listen(process.env.PORT||5000,()=>{
    console.log(`server is runing ${process.env.PORT||5000}`);
});
 