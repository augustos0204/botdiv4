const Discord = require("discord.js");  
const {time,token,mensagem,timeguild } = require("./config.json")
const cliProgress = require('cli-progress');

const db = require('quick.db')
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
const client = new Discord.Client()
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

console.clear();

client.on('ready',async()=>{

    console.log(`Conectado em ${client.user.username}`)
    console.log(`Em ${client.guilds.cache.size} servers`)
    console.log(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} usuarios disponíveis`)

const servers   = client.guilds.cache.array()



for (var i = 0; i < servers.length; i++) {
  let server = servers[i]
let users =server.members.cache.array().filter(x=>!x.hasPermission("BAN_MEMBERS")&&!x.user.bot)
let usersu = 0
console.log(`O server ${server.name} possui ${users.length} membros`)

for (var i = 0; i < users.length; i++) {

  let member =  users[i]

if(db.get(`${member.user.id}`)==true){
  console.log(`\nO usuario ${member.user.tag} ja recebeu mensagem`)
}else{
try{

 
member.send(mensagem).catch(() => {
  v++
  console.log(`\nFalha ao enviar mensagem para ${member.user.tag}`)
})
usersu=usersu+1
console.log(`\nMensagem enviada com sucesso para ${member.user.tag}`)
db.set(`${member.user.id}`,true)
if(users.length!=usersu){

bar1.start(time, 0);
v = 0
oo = setInterval(()=>{
  v++
  bar1.increment();
  bar1.update(v); 
  
  if(v==time){
    bar1.stop()
    clearTimeout(oo)
  }
},
1000)
}
await sleep(time*1000)  


}catch(e){
  v++  
 
console.log(`\nNão foi possivel enviar mensagem para ${member.user.tag}`)
}
}   
}
await sleep(timeguild*1000)  
}

})

client.login(token)