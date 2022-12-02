var textarea = document.querySelector('textarea')
var sock = new WebSocket('ws://127.0.0.1:5001');
var msg = ""

sock.addEventListener('open',function(e){
  console.log('Socket 接続成功');
});

sock.addEventListener('message', (e)=>{
  if( e.data.includes('[rec]')){
    recognition.start();
  }else{
    send(e.data)
    msg = e.data
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

SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
let recognition = new SpeechRecognition();

recognition.lang = 'ja-JP';
recognition.interimResults = true;
recognition.continuous = true;

let finalTranscript = ''; // 確定した(黒の)認識結果

recognition.onresult = (event) => {
  for (let i = event.resultIndex; i < event.results.length; i++) {
    let transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      send(transcript);
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

