// createStoreをreduxCreateStoreという名前で別名import
// combineReducersはreducersをまとめるもの
import {createStore as reduxCreateStore,combineReducers, applyMiddleware} from 'redux';
import {changeTextReducer} from '../header/reducers';
import {changeConsoleButtonReducer, changeReleaseButtonReducer, changeSeriesButtonReducer, changeGenreButtonReducer, changeTitleButtonReducer} from '../search/reducers';

export default function createStore(){
    return reduxCreateStore(
        combineReducers(
            {
                headerText:changeTextReducer,  // UserReducerは指定のstateが入っているので、CombineReducersの中身は
                consoleButton:changeConsoleButtonReducer,
                releaseButton:changeReleaseButtonReducer,
                seriesButton:changeSeriesButtonReducer,
                genreButton:changeGenreButtonReducer,
                titleButton:changeTitleButtonReducer
            }                       // 各Reducers(変更する予定のstate)
        ),
        applyMiddleware(
            // ミドルウェアA,ミドルウェアBといった感じで記述していく。
        )
    );
};