// actionsの定義を記載する

// ヘッダーメニューのタブ切り替えのアクション
// 引数:tab(タブ名称)
// タブ名称:blob(ブログタブ)、production(プロダクションタブ)、history(履歴タブ)、profile(プロフィールタブ)
export const BUTTON_CONSOLE = "BUTTON_CONSOLE";
export const BUTTON_RELEASE = "BUTTON_RELEASE";
export const BUTTON_SERIES = "BUTTON_SERIES";
export const BUTTON_GENRE = "BUTTON_GENRE";
export const BUTTON_TITLE = "BUTTON_TITLE";

// ゲーム機ボタンの開閉状態を変更.
export const changeConsoleState = (flag) => {
    return{
        type:"BUTTON_CONSOLE",
        payload:{
            consoleState:flag
        }
    }
};

// 発売年の開閉状態を変更
export const changeReleaseState = (flag) => {
    return{
        type:"BUTTON_RELEASE",
        payload:{
            releaseState:flag
        }
    }
};

// シリーズの開閉状態を変更
export const changeSeriesState = (flag) => {
    return{
        type:"BUTTON_SERIES",
        payload:{
            seriesState:flag
        }
    }
};

// ジャンルの開閉状態を変更
export const changeGenreState = (flag) => {
    return{
        type:"BUTTON_GENRE",
        payload:{
            genreState:flag
        }
    }
};

// タイトルの開閉状態を変更
export const changeTitleState = (flag) => {
    return{
        type:"BUTTON_TITLE",
        payload:{
            titleState:flag
        }
    }
};