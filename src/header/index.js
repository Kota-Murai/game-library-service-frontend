// header上部で必要なモジュール
import Head from 'next/head'
import styles from '../../styles/homeHeader.module.css'
import Link from 'next/link'
// materialuiで必要なモジュール
import * as React from 'react';
import { makeStyles } from '@mui/styles';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import IconButton from "@mui/material/IconButton";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
// state更新処理ファイル読み込み
import {changetext} from './actions'
import {useDispatch, useSelector} from "react-redux";
// ルーティングライブラリ
import Router, {useRouter} from 'next/router'
// セレクター
import {getTextValue} from './selectors'

// アイコン
import SearchIcon from "@mui/icons-material/Search";


const name = 'レトロゲーム図書館'
export const siteTitle = 'レトロゲーム図書館'

// ヘッダーのメインレイアウト
export default function Layout() {
  const selector = useSelector(state=>state)

  const classes = useStyles();

  const router = useRouter();
  const url = router.asPath.split(/[/?]/);
  const pathName = url[1];

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/gemeblog.ico" />
        <meta name="author" content="toposon"></meta>
        <meta name="description" content="レトロゲームを検索できるサイトです。昔のゲームを探すことが出来ます。欲しいゲームはAmazon、楽天のリンクからどうぞ" />
        <meta name="keywords" content="レトロ,ゲーム,検索,年代別,図書館,N64,ファミコン"></meta>
        <title>{siteTitle}</title>
      </Head>
      <header>
          <>
            <div className={styles.headerTop}>
              <Link href="/">
                <img
                  src="/images/blog.png"
                  className={`${styles.headerHomeImage}`}
                  alt={name}
              />
              </Link>
              <Link href="/">
                <h1 className={`${styles.headerHomeTitle}`}>{name}</h1>
              </Link>
                <HeaderTextBox>
                </HeaderTextBox>
            </div>
            <hr className={`${styles.headHorizen}`}></hr>
            {((pathName !== "search") &&
              <BasicTabs></BasicTabs>
            )}
          </>
      </header>
    </div>
  )
}

// スタイル設定
const useStyles = makeStyles(() => ({
  headertab: {
    flexGrow: 1,
    fontSize:"1.5rem",
    height:"3.5rem",
    //fontFamily:"GN-キルゴUかなO",
    fontFamily:"PixelMplus12 Regular",
    // src:'url("/styles/font/GN-KillGothic-U-KanaO.ttf")'
    src:'url("/styles/font/PixelMplus12-Regular.ttf")'
  },
  headerInputBox:{  // ヘッダーのテキストボックス調整用のクラス
    width:"35rem",
    textAlign: "left",
    fontSize: "1.5rem",
    height:"4rem",
    transform:"scale(1, 1)"
  },
  headerInputBoxLabel:{ // ラベル文字調整用クラス
    fontSize:"1.5rem",
    textAlign: "left",
  },
  rootTextField:{ // ヘッダーのテキストボックスの全体の縮尺微調整用のクラス
    margin:"0px",
    padding:"0px",
    width:"14rem",
    transform:"scale(0.6, 0.6)"
  },
  header: {
    position: "fixed",
    top: "0"
  },
}));

// ヘッダーのタイトル検索ボックスコンポーネント
function HeaderTextBox() {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const selector = useSelector(state=>state)

  let defaultValue = "";
  let param = "";
  if (process.browser) {
    param = new URLSearchParams(location.search);
    if (param.has("keyword")) {
      defaultValue = param.get("keyword");
    }
  }

  function transitionToSearchContents() {
    const params = new URLSearchParams(location.search);
    params.set("keyword", getTextValue(selector))
    params.set("page", "1")
    router.push("/search", `/search?${params.toString()}`)
  }

  return (
    <FormControl className={classes.rootTextField} sx={{ m: "1rem", width: '30rem' }} variant="outlined">
          <InputLabel className={classes.headerInputBoxLabel}>タイトルから検索</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="search" size="large" onClick={()=>{transitionToSearchContents()}} >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            label="aaaaaaaaaaaaaaa"
            className={classes.headerInputBox}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // エンターキー押下時の処理
                transitionToSearchContents();
              }
            }}
            onChange={(e)=>{dispatch(changetext(e.target.value))}}
            defaultValue={defaultValue}
          />
        </FormControl>
  );
}

// ホームヘッダーのタブ
function BasicTabs() {
  // インスタンス生成
  const classes = useStyles();
  const router = useRouter();
  // ブラウザに表示されているurl(aspath)を取得
  const url = router.asPath.split(/[/?]/);
  let pathName = url[1];

  if ("" == pathName) {
    pathName = "console";
  }

  return (
    <div className={classes.headertab}>
      <Paper className={classes.headertab}>
        <Tabs className={classes.headertab}
          value={pathName}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {/* 第一引数に共通のパスを指定することでページ遷移時のちらつきが発生しないようにしている。  */}
          {/* 第二引数で指定したサブディレクトリの指定により、表示するURLとコンテンツを操作する。 */}
          <Tab value="console" onClick={()=>{router.push(router.pathname, "/console", { shallow: true })}} className={classes.headertab} label="ゲーム機種" />
          <Tab value="series" onClick={()=>{router.push(router.pathname, "/series", { shallow: true })}} className={classes.headertab} label="シリーズ" />
          <Tab value="genre" onClick={()=>{router.push(router.pathname, "/genre", { shallow: true })}} className={classes.headertab} label="ジャンル" />
        </Tabs>
      </Paper>
    </div>
  );
}