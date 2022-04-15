// reselectを使用し特定のstateを取得する関数を作成する
// 要reselectのインストール npm install --save reselect

import {createSelector} from 'reselect';
const textSelector = (state) => state.headerText;

export const getTextValue = createSelector(
    [textSelector],
    state => state.textValue
)