var textarea = document.querySelector('textarea')
var sock = new WebSocket('ws://127.0.0.1:5001');

sock.addEventListener('open',function(e){
  console.log('Socket 接続成功');
});

sock.addEventListener('message', (e)=>{
  send(e.data)
})

function send(text){
  textarea.value = text;
  textarea.focus();
  document.querySelector('.PromptTextarea__PositionSubmit-sc-4snkpf-1').click();
}
