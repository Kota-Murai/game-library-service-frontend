// ボタンのクリックイベントなどが発火した際はこのファイルに定義している関数を呼び出す
// 非同期処理などを実行後、このファイル内でActionsを呼び出す
// イベント⇒operation⇒dispatch(Actions)⇒storeに登録したreducerメソッドが走り、Actionタイプに応じた処理が走る

// import
import {useDispatch} from "react-redux"; // Redux関連メソッドインポート
import axios from "axios"

// 画面初回読み込み時の、詳細検索プルダウンボタンの挙動
// 同期処理だけどとりあえずoperations.jsに定義
export async function getSample(){
    // wikiの情報を取得
    try {
        const res = await axios.get("http://localhost:8080");
        return res.data;
    }
    catch (e) {
        console.log("error: " + e)
    }
}
