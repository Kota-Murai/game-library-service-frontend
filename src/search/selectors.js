// reselectを使用し特定のstateを取得する関数を作成する
// 要reselectのインストール npm install --save reselect

import {createSelector} from 'reselect';

const consoleButtonSelector = (state) => state.consoleButton;
const releaseButtonSelector = (state) => state.releaseButton;
const seriesButtonSelector = (state) => state.seriesButton;
const genreButtonSelector = (state) => state.genreButton;
const titleButtonSelector = (state) => state.titleButton;

export const getConsoleState = createSelector(
    [consoleButtonSelector],
    state => state.consoleState
)

export const getReleaseState = createSelector(
    [releaseButtonSelector],
    state => state.releaseState
)

export const getSeriesState = createSelector(
    [seriesButtonSelector],
    state => state.seriesState
)

export const getGenreState = createSelector(
    [genreButtonSelector],
    state => state.genreState
)

export const getTitleState = createSelector(
    [titleButtonSelector],
    state => state.titleState
)