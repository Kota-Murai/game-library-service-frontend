// 作成するコンポーネントをjsxで記述しexportする処理を実装

// 共通スタイル
import styles from '../../styles/homeMain.module.css'

// Reactのメソッド
import React, {useState, useEffect} from 'react';

// materialui(Paper)関連
import { makeStyles } from '@mui/styles';

// materialui(card)関連
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// ボタングループ
import ButtonGroup from '@mui/material/ButtonGroup';

// レスポンシブ対応
import {createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// ページ遷移
import {useRouter} from 'next/router'

// ゲームデータ要求処理
import {getSample} from './operations'

// queryの解析
import queryString from 'query-string';



// デザインの定義
const useStyles = makeStyles((theme) => ({
  Root:{
    alignItems:"center"
  },
  cardRoot: {
    display: "flex",
    flexDirection: "row"
  },
  imgTrim:{
    overflow: "hidden",
    position: "relative",
    width: "130px",
    height: "170px"
  },
  cardText:{
    display: "flex",
    flexDirection: "column",
    padding:"0",
    paddingTop:"0.5rem",
    marginLeft:"0.5rem",
  },
  cardTitleArea:{
    margin:"0"
  },
  cardDetailArea:{
    margin:"0",
    fontSize:"0.75rem"
  },
  carActionArea:{
    margin:"0",
    paddingLeft:"0",
    marginLeft:"0.3rem"
  },
  buttonHover: {
    "&:hover": {
      background: "#dcdcdc"
    }
  },
  buttonGroupBox:{
    // paddingTop:"2rem",
    marginTop:"2rem"
  },
  typo:{
    width:"230px"
  },
  famicomimg:{  // 上下中央ぞろえ
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  }
}));



// 検索結果表示部メイン処理
export default function Result(){
  const theme = createTheme({breakpoints: {values: {xs: 0,sm: 800,md: 1050,lg: 1350,xl: 1200}}});

  const router = useRouter();
  const query = queryString.parse(decodeURI((router.asPath.split(/\?/)[1])));

  // 画面表示領域調整
  const lgmatches = useMediaQuery(theme.breakpoints.up('lg'));
  const mdmatches = useMediaQuery(theme.breakpoints.up('md'));

  // 各種プルボタン配下のコンテンツの状態管理
  // ゲーム機
  const [famicomState, setFamicomState] = useState((`${query.consoletype}`.includes("famicom") ? true : false))  // ファミコン
  const [n64State, setN64State] = useState((`${query.consoletype}`.includes("N64") ? true : false))      // N64
  // 発売年
  const [releaseMinState, setReleaseMinState] = useState((undefined !== query.minyear) ? query.minyear: -1)  // 発売年下限
  const [releaseMaxState, setReleaseMaxState] = useState((undefined !== query.maxyear) ? query.maxyear: -1)  // 発売年上限
  // ページ番号
  const [pageNumber, setPageNumber] = useState((undefined !== query.page) ? query.page: 1)  // 発売年上限
  // キーワード
  const [keyWord, setKeyWord] = useState((undefined !== query.keyword) ? query.keyword: "")  // 発売年上限
  // 表示情報
  const [dispItemCount, setDispItemCount] = useState(0)  // 検索結果総数
  const [dispItemList, setDispItemList] = useState(0)  // 検索結果一覧

  // queryが変わった時だけ実行
  useEffect(()=>{
    setFamicomState((`${query.consoletype}`.includes("famicom") ? true : false))
    setN64State((`${query.consoletype}`.includes("N64") ? true : false))
    setReleaseMinState((undefined !== query.minyear) ? query.minyear: -1)
    setReleaseMaxState((undefined !== query.maxyear) ? query.maxyear: -1)
    setPageNumber((undefined !== query.page) ? query.page: 1)
    setKeyWord((undefined !== query.keyword) ? query.keyword: "")
  },[query])

  // stateが変わった時だけ実行
  useEffect(()=>{
    const f = async()=>{
      const result = await getSample(famicomState, n64State, releaseMinState, releaseMaxState, pageNumber, keyWord);
      if ("undefined" != result.count) {
        setDispItemCount(result.count)
        setDispItemList(result.itemList)
      }
    }

    f();
  },[famicomState, n64State, releaseMinState, releaseMaxState, pageNumber, keyWord])

  // コンポーネント(画面の大きさにより表示方法を変更)
  return(
      <>
      <main className={styles.searchResultContainerRoot}>
      <text className={styles.resultcount}>{dispItemCount}件</text>
      {/* デスクトップ(大) */}
        {(true === lgmatches) &&
          <main className={styles.searchResultContainer} sx={{margin:0,padding:0}}>
            <div className={styles.rowflex + " " + styles.bottomProfile}>
              <BasicGridforDefault count={dispItemCount} list={dispItemList} page={pageNumber}/>
            </div>
            <BasicButtonGroup count={dispItemCount}/>
          </main>
        }
        {/* デスクトップ(中) */}
        {((false === lgmatches) && true === mdmatches) &&
          <main className={styles.searchResultContainerforSmall}>
            <div className={styles.rowflex + " " + styles.bottomProfile}>
              <BasicGridforSmall count={dispItemCount} list={dispItemList} page={pageNumber}/>
            </div>
            <BasicButtonGroup count={dispItemCount}/>
          </main>  
        }
        {/* デスクトップ(小) */}
        {((false === lgmatches) && false === mdmatches) &&
          <main className={styles.searchResultContainerforVerySmall}>
            <div className={styles.rowflex + " " + styles.bottomProfile}>
              <BasicGridforVerySmall count={dispItemCount} list={dispItemList} page={pageNumber}/>
            </div>
              <BasicButtonGroup count={dispItemCount}/>
        </main>
        }
        </main>
      </>
  )
}

// 大サイズの時の検索結果表示コンポーネント
function BasicGridforDefault(props) {
  // props.list


  // 表示コンテンツを一旦listへ格納
  let list = [];
  if ((props.count/9 > props.page)) { // 最後のページではない場合、9件分表示
    for (let i = 0; i < 9; i++) {
      list.push(<Grid item xs={4} key={Math.floor(Math.random()*1000000000000)}><MediaCard item={props.list[i]} /></Grid>);
    }
  }
  else {  // 最後のページの場合9件全ては表示出来ないため、それを考慮した処理にする。
    const dispItem = props.count - (9 * (props.page - 1));
    for (let i = 0; i < dispItem ; i++) {
      list.push(<Grid item xs={4} key={Math.floor(Math.random()*1000000000000)}><MediaCard item={props.list[i]} /></Grid>);
    }
  
    for (let i = 0; i < 9 - dispItem; i++) {
      list.push(<Grid item xs={4} key={Math.floor(Math.random()*1000000000000)}><DammyCard /></Grid>);
    } 
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        {list}
      </Grid>
    </Box>
  );
}


// 中サイズの時の検索結果表示コンポーネント
function BasicGridforSmall(props) {

  let list = [];
  if ((props.count/9 > props.page)) {
    for (let i = 0; i < 9; i++) {
      list.push(<Grid item xs={6} key={Math.floor(Math.random()*1000000000000)}><MediaCard item={props.list[i]} /></Grid>);
    }
  }
  else {
    const dispItem = props.count - (9 * (props.page - 1));
    for (let i = 0; i < dispItem ; i++) {
      list.push(<Grid item xs={6} key={Math.floor(Math.random()*1000000000000)}><MediaCard item={props.list[i]} /></Grid>);
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        {list}
      </Grid>
    </Box>
  );
}


// 小サイズの時の検索結果表示コンポーネント
function BasicGridforVerySmall(props) {

  let list = [];
  if ((props.count/9 > props.page)) {
    for (let i = 0; i < 9; i++) {
      list.push(<Grid item xs={12} key={Math.floor(Math.random()*1000000000000)}><MediaCard item={props.list[i]} /></Grid>);
    }
  }
  else {
    const dispItem = props.count - (9 * (props.page - 1));
    for (let i = 0; i < dispItem ; i++) {
      list.push(<Grid item xs={12} key={Math.floor(Math.random()*1000000000000)}><MediaCard item={props.list[i]} /></Grid>);
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        {list}
      </Grid>
    </Box>
  );
}


// 表示コンテンツ本体
function MediaCard(props) {

  // なぜかundefinedで来る時がある
  // ひとまず即returnで応急処置
  // 画面がちらついてしまうのでどうにかしたい
  if (undefined == props.item) {
    return;
  }

  let {consoletype, imgurl, maker, releaseyear, series, softtitle, genre}  = props.item;
  if (undefined == consoletype) {
    consoletype = ""
  }
  if (undefined == imgurl) {
    imgurl=""
  }
  if (undefined == maker) {
    maker = "";
  }
  if (undefined == releaseyear) {
    releaseyear = "1980-01-01";
  }
  if (undefined == series) {
    series = ""
  }
  if (undefined == softtitle) {
    softtitle = ""
  }
  if (undefined == genre) {
    genre = ""
  }

  releaseyear = new Date(releaseyear);
  const classes = useStyles();

  return (
    <Card sx={{maxHeight:170}} raised={true}>
      <div className={classes.Root}>
        <div className={classes.cardRoot}>
          {("N64" === consoletype) &&
            <CardMedia
              component="img"
              height="140"
              src={imgurl}
              alt="noimg"
              className={classes.imgTrim}
            />
          }
          {("ファミリーコンピュータ" === consoletype) &&
            <div className={classes.famicomimg}>
              <CardMedia
                component="img"
                // height="140"
                // width="20px"
                marginTop="30px"
                src={imgurl}
                alt="noimg"
                // className={classes.imgTrim}
              />
            </div>
          }
          <div >
            <CardContent className={classes.cardText}>
              <Typography className={classes.typo} variant="body2" display="block" noWrap={true} gutterBottom={true} sx={{fontWeight:"bold"}}>
                {softtitle}
              </Typography>
              <p className={classes.cardDetailArea}>
                ジャンル:{genre}
              </p>
              <p className={classes.cardDetailArea}>
                シリーズ:{series}
              </p>
              <p className={classes.cardDetailArea}>
                対応機種：{consoletype}
              </p>
              <p className={classes.cardDetailArea}>
                発売元：{maker}
              </p>
              <p className={classes.cardDetailArea}>
                発売日：{`${releaseyear.getFullYear()}年${releaseyear.getMonth()}月${releaseyear.getDate()}日`}
              </p>
            </CardContent>
            <CardActions className={classes.carActionArea}>
              <Button color="secondary" size="small" onClick={()=>{open(`https://www.amazon.co.jp/ドラクエ10/s?k=${softtitle}+${consoletype}`)}}>Amazon</Button>
              <Button color="secondary" size="small" onClick={()=>{open(`https://search.rakuten.co.jp/search/mall/${softtitle}+${consoletype}/101205/`)}}>楽天市場</Button>
            </CardActions>
          </div>
        </div>
      </div>
    </Card>
  );
}


// 画面表示位置調整のためのダミーカード
function DammyCard() {
  const classes = useStyles();

  return (
    <Card sx={{maxHeight:150}} raised={false} sx={{boxShadow: 0}}>
      <div className={classes.Root}>
        <div className={classes.cardRoot}>
          <CardMedia
            height="140"
            alt="img"
            className={classes.imgTrim}
          />
          <div >
          </div>
        </div>
      </div>
    </Card>
  );
}

function MediaCardforSmall() {
  const classes = useStyles();

  return (
    <Card sx={{maxHeight:150}} raised={true}>
      <div className={classes.Root}>
        <div className={classes.cardRoot}>
          <CardMedia
            component="img"
            height="140"
            src="https://tshop.r10s.jp/yamada-denki/cabinet/a07000035/2816595015.jpg"
            alt="profile"
            className={classes.imgTrim}
          />
          <div >
            <CardContent className={classes.cardText}>
              <p className={classes.cardTitleArea}>
                ドラゴンクエスト10
              </p>
              <p className={classes.cardDetailArea}>
                ジャンル:RPG
              </p>
              <p className={classes.cardDetailArea}>
                対応機種：Switch
              </p>
              <p className={classes.cardDetailArea}>
                発売元：スクエアエニックス
              </p>
              <p className={classes.cardDetailArea}>
                発売日：XXXX/XX/XX
              </p>
              <Typography variant="body2" color="text.secondary">
              </Typography>
            </CardContent>
            <CardActions className={classes.carActionArea}>
              <Button color="secondary" size="small" onClick={()=>{open("https://www.amazon.co.jp/ドラクエ10/s?k=ドラゴンクエスト10")}}>Amazon</Button>
              <Button color="secondary" size="small" onClick={()=>{open("https://search.rakuten.co.jp/search/mall/ドラゴンクエスト10")}}>楽天市場</Button>
            </CardActions>
          </div>
        </div>
      </div>
    </Card>
  );
}


// 画面下部のページボタンコンポーネント
function BasicButtonGroup(props) {

  const classes = useStyles();
  const router = useRouter();

  let number = 1;
  if (process.browser) {
    const param = new URLSearchParams(location.search);
    number = param.get("page");
  }

  // ボタン押下時のクエリ操作
  function operatePageQuery(value){
    const param = new URLSearchParams(location.search);

    if ("<" == value) { // 「<」の時
      param.set("page", parseInt(number)-1)
      router.push(`/search`, decodeURIComponent(`/search?${param.toString()}`))      
    }
    else if ("<<" == value){ // 「<<」の時
      param.set("page", parseInt(1))
      router.push(`/search`, decodeURIComponent(`/search?${param.toString()}`))
    }
    else if (">" == value){ // 「>」の時
      param.set("page", parseInt(number) + parseInt(1))
      router.push(`/search`, decodeURIComponent(`/search?${param.toString()}`))
    }
    else if (">>" == value) {  // 「>>」の時
      param.set("page", parseInt(Math.ceil(props.count/9)))
      router.push(`/search`, decodeURIComponent(`/search?${param.toString()}`))
    }
    else {  // それ以外の数値の時
      param.set("page", parseInt(value))
      router.push(`/search`, decodeURIComponent(`/search?${param.toString()}`))
    }
  }

  const list = [];

  if (9 >= props.count) {
    list.push(<Button color="primary" className={classes.buttonHover} disabled sx={{backgroundColor:"#C0C0C0"}} key={Math.floor(Math.random()*1000000000000)}>{"<<"}</Button>)
    list.push(<Button color="primary" className={classes.buttonHover} disabled sx={{backgroundColor:"#C0C0C0"}} key={Math.floor(Math.random()*1000000000000)}>{"<"}</Button>)
    list.push(<Button color="primary" onClick={()=>{operatePageQuery("1")}} className={classes.buttonHover} disabled sx={{backgroundColor:"#C0C0C0"}} key={Math.floor(Math.random()*1000000000000)}>{"1"}</Button>)
    list.push(<Button color="primary" className={classes.buttonHover} disabled sx={{backgroundColor:"#C0C0C0"}} key={Math.floor(Math.random()*1000000000000)}>{">"}</Button>)
    list.push(<Button color="primary" className={classes.buttonHover} disabled sx={{backgroundColor:"#C0C0C0"}} key={Math.floor(Math.random()*1000000000000)}>{">>"}</Button>)
  }
  else {
    if (1 != number) {
      list.push(<Button color="primary" onClick={()=>{operatePageQuery("<<")}} className={classes.buttonHover} sx={{backgroundColor:"white"}} key={Math.floor(Math.random()*1000000000000)}>{"<<"}</Button>)
      list.push(<Button color="primary" onClick={()=>{operatePageQuery("<")}} className={classes.buttonHover} sx={{backgroundColor:"white"}} key={Math.floor(Math.random()*1000000000000)}>{"<"}</Button>)
    }
    else {
      list.push(<Button color="primary" onClick={()=>{operatePageQuery("<<")}} className={classes.buttonHover} disabled sx={{backgroundColor:"#C0C0C0"}} key={Math.floor(Math.random()*1000000000000)}>{"<<"}</Button>)
      list.push(<Button color="primary" onClick={()=>{operatePageQuery("<")}} className={classes.buttonHover} disabled sx={{backgroundColor:"#C0C0C0"}} key={Math.floor(Math.random()*1000000000000)}>{"<"}</Button>)
    }

    // 最後のページ
    const lastPage = Math.ceil(props.count/9);

    let startNumber = null

    // 一番左に表示するぺーじ番号
    if (lastPage == number) { // 最後のページの場合
      startNumber = number -4
    }
    else if ((lastPage -1) == number) { // 最後のページの一つ前の場合
      startNumber = number -3
    }
    else {  // それ以外のページではない場合
      startNumber = number -2
    }
    if (startNumber < 1) {  //最初のページが1未満の場合1にする。
      startNumber = 1
    }
    for (let i=startNumber; i < startNumber + 5; i++) {
      if (number == i) {
        list.push(<Button color="primary" onClick={()=>{operatePageQuery(i)}} className={classes.buttonHover} disabled sx={{backgroundColor:"#C0C0C0"}} key={Math.floor(Math.random()*1000000000000)}>{i}</Button>)
      }
      else {
        list.push(<Button color="primary" onClick={()=>{operatePageQuery(i)}} className={classes.buttonHover} sx={{backgroundColor:"white"}} key={Math.floor(Math.random()*1000000000000)}>{i}</Button>)
      }
      if (i == lastPage) {
        break;
      }
    }

    if (lastPage == number) {
      list.push(<Button color="primary" onClick={()=>{operatePageQuery(">")}} className={classes.buttonHover} disabled sx={{backgroundColor:"#C0C0C0"}} key={Math.floor(Math.random()*1000000000000)}>{">"}</Button>)
      list.push(<Button color="primary" onClick={()=>{operatePageQuery(">>")}} className={classes.buttonHover} disabled sx={{backgroundColor:"#C0C0C0"}} key={Math.floor(Math.random()*1000000000000)}>{">>"}</Button>)
    }
    else {
      list.push(<Button color="primary" onClick={()=>{operatePageQuery(">")}} className={classes.buttonHover} sx={{backgroundColor:"white"}} key={Math.floor(Math.random()*1000000000000)}>{">"}</Button>)
      list.push(<Button color="primary" onClick={()=>{operatePageQuery(">>")}} className={classes.buttonHover} sx={{backgroundColor:"white"}} key={Math.floor(Math.random()*1000000000000)}>{">>"}</Button>)
    }
  }


    return (
      <ButtonGroup className={classes.buttonGroupBox} variant="outlined" aria-label="outlined primary button group">
        {list}
      </ButtonGroup>
    );
}