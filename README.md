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

## 使い方
### server.js
1. Node.js環境を整備する
2. `npm install` を実行
3. `node server.js` を実行

### client.js
1. 先にserver.jsを立ち上げておく
2. ブラウザで[ChatGPT](https://chat.openai.com/chat)にアクセス
3. F12で開発者ウィンドウを開き、`console`タブ内にclient.jsの内容をすべて貼り付ける。ブラウザによっては拒否されるので、コンソールに表示された文字列(例えば、`allow pasting`)をタイプして再度試す。

### Neos
1. 上記`neosdb://...`のURLをペーストし、アイテムを出現させる
2. `connect`ボタンを押下後、`initialize`ボタンを押す
3. 以後、質問文をテキスト欄に入れて`Ask`を押すか、`REC.`ボタンを押して話しかける。
