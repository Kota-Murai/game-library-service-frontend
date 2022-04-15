// actionsの定義を記載する

// ヘッダーメニューのタブ切り替えのアクション
// 引数:tab(タブ名称)
// タブ名称:blob(ブログタブ)、production(プロダクションタブ)、history(履歴タブ)、profile(プロフィールタブ)
export const CHANGE_TEXT = "CHANGE_TEXT";
export const changetext = (text) => {
    return{
        type:"CHANGE_TEXT",
        payload:{
            textValue:text
        }
    }
};