var textarea = document.querySelector('textarea')
var sock = new WebSocket('ws://127.0.0.1:5001');
var msg = ""

SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
let recognition = new SpeechRecognition();

recognition.lang = 'ja-JP';
recognition.interimResults = true;
recognition.continuous = true;

sock.addEventListener('open',function(e){
  console.log('Socket 接続成功');
  sock.send('[client] openai')
});

sock.addEventListener('message', (e)=>{
  switch(e.data.trim()){
    case '[rec]':
      recognition.start()
      break;
    case '[ja]':
      recognition.lang = 'ja-JP'
      break;
    case '[en]':
      recognition.lang = 'en-US'
      break;
    default:
      send(e.data.trim())
      msg = e.data.trim()
      recognition.stop()
  }
  /*
  e.data.text().then((text)=>{
    send(text);
    msg = text;
  })
  */
});

var add= {}
var thread = document.querySelector('.ThreadLayout__NodeWrapper-sc-wfs93o-0')
var mo = new MutationObserver((rec, obs) => {
  for(const mut of rec){
    console.log(mut.addedNodes)
    mut.addedNodes.forEach((m)=>{
      if ( add.innerText != m.innerText && m.innerText.trim().length > 0 ) sock.send('[terminate]')
      add = m
    })
    if ( add.innerText != msg ) sock.send(add.innerText)
  }
})

recognition.onresult = (event) => {
  for (let i = event.resultIndex; i < event.results.length; i++) {
    let transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      send(transcript);
      recognition.stop()
    }
  }
}

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

