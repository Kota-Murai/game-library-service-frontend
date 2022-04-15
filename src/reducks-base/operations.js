// ボタンのクリックイベントなどが発火した際はこのファイルに定義している関数を呼び出す
// 非同期処理などを実行後、このファイル内でActionsを呼び出す
// イベント⇒operation⇒dispatch(Actions)⇒storeに登録したreducerメソッドが走り、Actionタイプに応じた処理が走る