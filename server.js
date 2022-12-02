var server = require('ws').Server;
var s = new server({port:5001});

s.on('connection',function(ws){

  console.log('hello')

  ws.on('message',function(message){
    if (!ws.clientType){
      if ( message == '[client] openai') ws.clientType = 'openai'
      if ( message == '[client] neosvr') ws.clientType = 'neosvr'
      console.log('clientType specified')
    }else{
      if(ws.clientType == 'openai'){
        console.log( ws.clientType + message );
        s.clients.forEach((c)=>{
          if (c.clientType == 'neosvr'){
            console.log('target detect')
            c.send(' ' + message)
          }
        })
      }
      if(ws.clientType == 'neosvr'){
        console.log( message );
        s.clients.forEach((c)=>{
          if (c.clientType == 'openai'){
            c.send(' ' + message)
          }
        })
      }

    }
  });

  ws.on('close',function(){
    console.log('I lost a client');
  });
});
