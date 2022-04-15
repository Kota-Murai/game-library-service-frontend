// reducerの定義を記述 actionのimportが必要
// Actionsからデータを受け取りStoreのstateをどう変更するのか決める処理を記述する。
import * as Actions from './actions' //Actions.hogehogeでactions.jsファイルのモジュールを呼び出せるようにする
import initialState from '../store/initialState'


// ゲーム機ボタンが押下されたときのreducer.
export const changeConsoleButtonReducer = (state = initialState.consoleButton, action)=>{
    switch(action.type){
        case Actions.BUTTON_CONSOLE:
            return {
                ...state,  // ...はスプレッド演算子。中のオブジェクトを展開する
                ...action.payload  //最初に初期値を設定することで設定の抜けもれがないようにできる
            }
        default:
            return state;
    }
};

// 発売年ボタンが押下されたときのreducer.
export const changeReleaseButtonReducer = (state = initialState.releaseButton, action)=>{
    switch(action.type){
        case Actions.BUTTON_RELEASE:
            return {
                ...state,  // ...はスプレッド演算子。中のオブジェクトを展開する
                ...action.payload  //最初に初期値を設定することで設定の抜けもれがないようにできる
            }
        default:
            return state;
    }
};

// シリーズボタンが押下されたときのreducer.
export const changeSeriesButtonReducer = (state = initialState.seriesButton, action)=>{
    switch(action.type){
        case Actions.BUTTON_SERIES:
            return {
                ...state,  // ...はスプレッド演算子。中のオブジェクトを展開する
                ...action.payload  //最初に初期値を設定することで設定の抜けもれがないようにできる
            }
        default:
            return state;
    }
};

// ジャンルボタンが押下されたときのreducer.
export const changeGenreButtonReducer = (state = initialState.genreButton, action)=>{
    switch(action.type){
        case Actions.BUTTON_GENRE:        
            return {
                ...state,  // ...はスプレッド演算子。中のオブジェクトを展開する
                ...action.payload  //最初に初期値を設定することで設定の抜けもれがないようにできる
            }
        default:
            return state;
    }
};

// タイトルボタンが押下されたときのreducer.
export const changeTitleButtonReducer = (state = initialState.titleButton, action)=>{
    switch(action.type){
        case Actions.BUTTON_TITLE:
            return {
                ...state,  // ...はスプレッド演算子。中のオブジェクトを展開する
                ...action.payload  //最初に初期値を設定することで設定の抜けもれがないようにできる
            }
        default:
            return state;
    }
};