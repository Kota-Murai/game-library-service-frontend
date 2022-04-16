// 作成するコンポーネントをjsxで記述しexportする処理を実装
import styles from '../../styles/homeMain.module.css'
import React, {useEffect, useState} from 'react';
// materialui(Paper)関連
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import {KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material";
// ページ遷移
import {useRouter} from 'next/router'
// チェックボックス
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// プルダウン選択(発売年)
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
// レスポンシブ対応
import useMediaQuery from '@mui/material/useMediaQuery';
import {createTheme } from '@mui/material/styles';
// Redux関連
import {useDispatch, useSelector} from "react-redux"; // Redux関連メソッドインポート
import {getConsoleState, getReleaseState, getSeriesState, getGenreState, getTitleState} from './selectors'          // セレクター

// queryの解析
import queryString from 'query-string';

// ゲーム機種別配列 ゲーム機種別が追加のたびにここに追加
const consoleArray = [{display:"ファミコン", uri:"famicom"}, {display:"N64", uri:"N64"}];

// cssの定義
const useStyles = makeStyles({
  buttonPulldownclick: {
    "&:hover": {
      background: "#dcdcdc"
    }
  },
  buttonOutLineNone:{
    borderWidth:"0"
  },
  dropdownStyle: {
    maxHeight: 300,
  },
  releasePullDown:{
    width:"7rem"
  },
  seriesPullDown:{
    width:"14rem"
  },
  serchTitleInputBoxLabel:{ // ラベル文字調整用クラス
    fontSize:"1rem",
    textAlign: "left",
  },
  rootTextField:{ // ヘッダーのテキストボックスの全体の縮尺微調整用のクラス
    margin:"0px",
    padding:"0px",
    width:"14rem"
  },
  searchTitleInputBox:{  // ヘッダーのテキストボックス調整用のクラス
    width:"15rem",
  },
});

// 検索条件指定領域のコンポーネント
export default function Search(){

  const selector = useSelector(state=>state)

  const router = useRouter();

  const query = queryString.parse(decodeURI((router.asPath.split(/\?/)[1])));

  // トップのプルダウンボタンの状態管理.
  const [consoleState, setConsoleState] = useState(((undefined !== query.consoletype) ? true : false))  // ゲーム機
  const [releaseState, setReleaseState] = useState(((undefined !== query.release) ? true : false))      // 発売年
  const [seriesState, setSeriesState] = useState(((undefined !== query.series) ? true : false))         // シリーズ
  const [genreState, setGenreState] = useState(((undefined !== query.genre) ? true : false))            // ジャンル

  // 各種プルボタン配下のコンテンツの状態管理
  // ゲーム機
  const [famicomState, setFamicomState] = useState((`${query.consoletype}`.includes("famicom") ? true : false))  // ファミコン
  const [n64State, setN64State] = useState((`${query.consoletype}`.includes("N64") ? true : false))      // N64

  // 発売年
  const [releaseMinState, setReleaseMinState] = useState((`${query.minyear}` ? true : false))  // 発売年下限
  const [releaseMaxState, setReleaseMaxState] = useState((`${query.maxyear}` ? true : false))  // 発売年上限

  const selectedConsoleListState = {famicomState:famicomState, n64State:n64State}

  // queryが変わった時だけ実行
  useEffect(()=>{
    setFamicomState((`${query.consoletype}`.includes("famicom") ? true : false))
    setN64State((`${query.consoletype}`.includes("N64") ? true : false))
    setReleaseMinState((undefined !== query.minyear) ? query.minyear: -1)
    setReleaseMaxState((undefined !== query.maxyear) ? query.maxyear: -1)
    if (releaseMaxState < releaseMinState) {
      const param = new URLSearchParams(location.search);
      param.set("maxyear", releaseMinState);
      param.set("page", "1");
      router.push(`/search`, `/search?${param.toString()}`)
    }
  },[query]);

  const theme = createTheme({breakpoints: {values: {xs: 0,sm: 800,md: 1050,lg: 1350,xl: 1200}}});
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const classes = useStyles();
  return(
      <>
        <main className={matches ? styles.containerSearch:styles.containerSearchforSmall}>
          <div className={styles.detailedSearch}>
            詳細検索
            <hr className={`${styles.headHorizen}`}></hr>
            {/* ゲーム機 */}
            <PullDownButton nowstate={getConsoleState(selector)} onClick={()=>{setConsoleState(!consoleState)}} typeValue="ゲーム機　　　　　　　　　　　" />
              {((consoleState === true)) &&
                <div className={styles.searchContents}>
                  <SearchConsole state={selectedConsoleListState} />
                </div>
              }
              <hr className={`${styles.headHorizen}`}></hr>
            {/* 発売年 */}
            <PullDownButton nowstate={getReleaseState(selector)} onClick={()=>{setReleaseState(!releaseState)}} typeValue="発売年　　　　　　　　　　　　" />
              {((releaseState === true)) &&
                <div className={styles.searchContents}>
                  <SearchReleaseMIN state={releaseMinState}/>
                  {"～"}
                  <SearchReleaseMAX state={releaseMaxState}/>
                </div>
              }
              <hr className={`${styles.headHorizen}`}></hr>
            {/* シリーズ */}
            <PullDownButton nowstate={getSeriesState(selector)} onClick={()=>{setSeriesState(!seriesState)}} typeValue="シリーズ　　　　　　　　　　　　" />
              {((seriesState === true)) &&
                <div className={styles.searchContents}>
                  <SearchSeries />
                </div>
              }
              <hr className={`${styles.headHorizen}`}></hr>
            {/* ジャンル */}
            <PullDownButton nowstate={getGenreState(selector)} onClick={()=>{setGenreState(!genreState)}} typeValue="ジャンル　　　　　　　　　　　" />
              {((genreState === true)) &&
                <div className={styles.searchContents}>
                  <SearchGenre />
              </div>
              }
              <hr className={`${styles.headHorizen}`}></hr>
          </div>
        </main>
      </>
  )
}

// プルダウンボタンコンポーネント
function PullDownButton(props) {
  const classes = useStyles();

  return (
    <div>
      {/* 選択されていないとき */}
      {((props.nowstate === false)) &&
        <Button color="kuro" onClick={props.onClick} className={styles.buttonPulldown + " " + classes.buttonPulldownclick} size="large" endIcon={<KeyboardArrowDown />}>
          {props.typeValue}
        </Button>
      }
      {/* 選択されているとき */}
      {((props.nowstate === true)) &&
        <Button color="kuro" onClick={props.onClick} className={styles.buttonPulldown + " " + classes.buttonPulldownclick + " " + classes.buttonOutLineNone} size="large" endIcon={<KeyboardArrowUp />}>
          {props.typeValue}
        </Button>
      }
    </div>
  );
}

// ゲーム機の詳細検索コンポーネント
function SearchConsole(props){
  const classes = useStyles();

  const selector = useSelector(state=>state)

  const router = useRouter();
  
  // 条件変更時のconsoletypeクエリ変更処理
  // クエリ変更に伴いuseEffectの処理が走る
  function operateConsoleQuery(type, checkedState){
    const param = new URLSearchParams(location.search);

    // consoletypeのクエリパラメータが既に存在している場合
    if (false === checkedState) { // 選択されていないチェックボックスを選択状態に変更した場合
      if (true === param.has("consoletype")) {
          const tmp = param.get("consoletype"); // 一旦退避
          param.set("consoletype", `${tmp}+${type}`.replace(" ", "+"))
          param.set("page", "1");
          router.push(`/search`, decodeURIComponent(`/search?${param.toString()}`))
      }
      else {  // まだconsoletypeが付与されていない場合
        param.append("consoletype", type)
        param.set("page", "1");
        router.push(`/search`, `/search?${param.toString()}`)
      }
    }
    else {  // 選択されているチェックボックスを選択されていない状態に変更した場合
      if (true === param.has("consoletype")) {
        let tmp = param.get("consoletype"); // 一旦退避
        if (tmp.includes(" ")) {  // 「+」が存在している場合
          const index = tmp.indexOf(type)
          if (" " ==tmp[index-1]) { // typeの前に「+」がついている場合
            tmp = tmp.replace(tmp.slice(index - 1 , (index) + `${type}`.length + 1), "")
            param.set("consoletype", tmp)
            param.set("page", "1");
            router.push(`/search`, `/search?${param.toString()}`)
          }
          else{ // typeの前に「+」がついていない場合(先頭の要素の場合)
              // 先頭の要素とその後の「+」を削除する
            tmp = tmp.replace(tmp.slice(index , (index) + `${type}`.length + 1), "")
            param.set("consoletype", tmp)
            param.set("page", "1");
            router.push(`/search`, `/search?${param.toString()}`)
          }
        }
        else {  // 「+」が存在していない場合
          param.delete("consoletype");
          param.set("page", "1");
          router.push(`/search`, `/search?${param.toString()}`)
        }
      }
      else {  // consoletypeのクエリパラメータが存在しない場合は何もしない
      }
    }
  }
  
  return (
    <div>
      <FormGroup>
        <FormControlLabel control={<Checkbox checked={props.state.famicomState} onClick={()=>{operateConsoleQuery("famicom", props.state.famicomState);}} />} label={"ファミコン"} />
        <FormControlLabel control={<Checkbox checked={props.state.n64State} onClick={()=>{operateConsoleQuery("N64", props.state.n64State);}}/>} label={"N64"} />
      </FormGroup>
    </div>
  );
}

// 発売年の詳細検索コンポーネント(最小)
function SearchReleaseMIN(props){
  const classes = useStyles();
  const router = useRouter();

  const param = new URLSearchParams(location.search);
  let maxyear = (new Date()).getFullYear();
  let minyear = 1980;

  // minyearの取得
  if (true == param.has("minyear")) {
    minyear = param.get("minyear"); // minyearのパラメータが存在する場合その値を読み取る
  }
  // maxyearの取得
  if (true == param.has("maxyear")) {
    maxyear = param.get("maxyear"); // maxyearのパラメータが存在する場合その値を読み取る
  }

  // 念のためバリデーションチェック
  if (maxyear < minyear) {
    maxyear = minyear;
  }

  // 変更された場合のクエリ変更処理
  // クエリ変更に伴いuseEffectの処理が走る
  function minyearButtonClicked(year) {
    // 念のためバリデーションチェック
    if (maxyear < year) {
      year = maxyear  // minがmaxより大きい場合は、minをmaxと同じ値にする。
    } 
    param.set("minyear", year);
    param.set("page", 1);
    router.push("/search", `/search?${param.toString()}`)
  }

  let list = [];
  for(let i = 1980; i <= maxyear; i++){
    list.push(<MenuItem onClick={()=>{minyearButtonClicked(i)}} value={i} key={Math.floor(Math.random()*1000000000000)}>{i}</MenuItem>);
  }

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">MIN</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.state}
          label="min"
          // onChange={handleChange}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
            classes: {
              paper: classes.dropdownStyle,
            },
          }}
          defaultValue={""}
          className={classes.releasePullDown}
        >
          {list}
        </Select>
      </FormControl>
    </div>
  );
}

// 発売年の詳細検索コンポーネント(最大)
function SearchReleaseMAX(props){
  const classes = useStyles();
  const router = useRouter();

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const param = new URLSearchParams(location.search);
  let maxyear = (new Date()).getFullYear();
  let minyear = 1980;

  // minyearの取得
  if (true == param.has("minyear")) {
    minyear = param.get("minyear"); // minyearのパラメータが存在する場合その値を読み取る
  }
  // maxyearの取得
  if (true == param.has("maxyear")) {
    maxyear = param.get("maxyear"); // maxyearのパラメータが存在する場合その値を読み取る
  }

  // 念のためバリデーションチェック
  if (maxyear < minyear) {
    param.set("maxyear", minyear);
    param.set("page", "1")
    router.push("/search", `/search?${param.toString()}`)
  }

  // 変更された場合のクエリ変更処理
  // クエリ変更に伴いuseEffectの処理が走る
  function maxyearButtonClicked(year) {
    // 念のためバリデーションチェック
    if (year < minyear) {
      year = minyear  // minがmaxより大きい場合は、minをmaxと同じ値にする。
    } 
    param.set("maxyear", year);
    param.set("page", "1");
    router.push("/search", `/search?${param.toString()}`)
  }

  let list = [];
  for(let i = minyear; i < 2022; i++){
    list.push(<MenuItem onClick={()=>{maxyearButtonClicked(i)}} value={i} key={Math.floor(Math.random()*1000000000000)}>{i}</MenuItem>);
  }

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">MAX</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.state}   // ここをクエリパラメータの値に変更する
          label="max"
          onChange={handleChange}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
            classes: {
              paper: classes.dropdownStyle,
            }
          }}
          defaultValue={""}
          className={classes.releasePullDown}
        >
          {list}
        </Select>
      </FormControl>
    </div>
  );
}

// シリーズの詳細検索コンポーネント(最大)
function SearchSeries(){
  const classes = useStyles();

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  let list = [];

  // for(let i = 1980; i < 2022; i++){
  //   list.push(<MenuItem value={i} key={Math.floor(Math.random()*1000000000000)}>{i}</MenuItem>);
  // }
  list.push(<MenuItem value={""} key={Math.floor(Math.random()*1000000000000)}>{""}</MenuItem>);

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
            classes: {
              paper: classes.dropdownStyle,
            }
          }}
          className={classes.seriesPullDown}
        >
          {list}
        </Select>
      </FormControl>
    </div>
  );
}

// ジャンルの詳細検索コンポーネント(最大)
function SearchGenre(){
  const classes = useStyles();

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  let list = [];

  // for(let i = 1980; i < 2022; i++){
  //   list.push(<MenuItem value={i} key={Math.floor(Math.random()*1000000000000)}>{i}</MenuItem>);
  // }
  list.push(<MenuItem value={""} key={Math.floor(Math.random()*1000000000000)}>{""}</MenuItem>);

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
            classes: {
              paper: classes.dropdownStyle,
            }
          }}
          className={classes.seriesPullDown}
        >
          {list}
        </Select>
      </FormControl>
    </div>
  );
}