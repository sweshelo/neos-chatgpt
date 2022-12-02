var textarea = document.querySelector('textarea')
var sock = new WebSocket('ws://127.0.0.1:5001');
var msg = ""

sock.addEventListener('open',function(e){
  console.log('Socket 接続成功');
});

sock.addEventListener('message', (e)=>{
  e.data.text().then((text)=>{
    send(text);
    msg = text;
  })
});

var add= {}
var thread = document.querySelector('.ThreadLayout__NodeWrapper-sc-wfs93o-0')
var mo = new MutationObserver((rec, obs) => {
  for(const mut of rec){
    console.log(mut.addedNodes)
    mut.addedNodes.forEach((m)=>{
      add = m
    })
    if ( add.innerText != msg ) sock.send(add.innerText)
  }
})

mo.observe(thread, {
  childList: true,
  characterData: true,
  subtree: true,
})

function send(text){
  textarea.value = text;
  textarea.focus();
  document.querySelector('.PromptTextarea__PositionSubmit-sc-4snkpf-1').click();
}

