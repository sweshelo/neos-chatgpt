var server = require('ws').Server;
var s = new server({port:5001});
var target = ''

s.on('connection',function(ws){

  console.log('hello')

  ws.on('message',function(message){
    if (!ws.clientType){
      if ( message == '[client] openai'){
        ws.clientType = 'openai'
        console.log('OpenAI connected.')
      }
      if ( message == '[client] neosvr'){
        ws.clientType = 'neosvr'
        console.log('NeosVR connected.')
      }
    }else{
      switch(ws.clientType){
        case 'openai':
          target = 'neosvr'
          break;
        case 'neosvr':
          target = 'openai'
          break;
      }
      s.clients.forEach((c)=>{
        if (c.clientType == target){
          console.log('target detect')
          c.send(' ' + message)
        }
      })
    }
  });

  ws.on('close',function(){
    console.log('I lost a client');
  });
});
