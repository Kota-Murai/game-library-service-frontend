// reducerの定義を記述 actionのimportが必要
// Actionsからデータを受け取りStoreのstateをどう変更するのか決める処理を記述する。
import * as Actions from './actions' //Actions.hogehogeでactions.jsファイルのモジュールを呼び出せるようにする
import initialState from '../store/initialState'

export const changeTextReducer = (state = initialState.headerText, action)=>{
    switch(action.type){
        case Actions.CHANGE_TEXT:
            return {
                ...state,  // ...はスプレッド演算子。中のオブジェクトを展開する
                ...action.payload  //最初に初期値を設定することで設定の抜けもれが内容にできる
            }
        default:
            return state;
    }
};