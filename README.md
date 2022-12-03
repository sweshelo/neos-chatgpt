# neos-chatgpt
NeosVR内からChatGPTを利用するためのスクリプト

## 仕組み
テキストデータ : Neos <=> server.js <=> client.js <=> ブラウザ(OpanAI)  
音声はNeosのユーザとブラウザのユーザが一致していれば利用可能。  


## 環境
- server.js の動作にはNode.jsが動作する環境が必要
- client.js の音声認識機能を含めた動作には対応ブラウザ(ChromeやEdge)が必要
- Neos側のClient も必要

```
neosdb:///5d462293756b8e68c824b5f6568c1cbd8706409007292bb5479e4e7aa2d5c931.7zbson
```
