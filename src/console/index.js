// 作成するコンポーネントをjsxで記述しexportする処理を実装
import styles from '../../styles/homeMain.module.css'
import React from 'react';
// materialui(Paper)関連
import { makeStyles } from '@mui/styles';
// materialui(card)関連
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardHeader } from '@mui/material';
// ページ遷移
import {useRouter} from 'next/router'

// ここから
const FamiryComputerCard = {
  title:"ファミリーコンピュータ",
  url:"/search",
  type:"famicom"
}
// YouTubeCardの情報
const N64Card = {
  title:"NINTENDO64",
  url:"/search",
  type:"N64"
}




export default function Console(){
    const classes = useStyles();
    return(
        <>
          <main className={styles.container}>
            <div className={styles.columnflex}>
              <div className={styles.rowflex}>
                <div>
                  <GameConsole data={FamiryComputerCard} />
                </div>
                <div className={styles.linkleft}>
                  <GameConsole data={N64Card} />
                </div>
              </div>
              <br/><br/>
              <p className={classes.titleFont}>その他ゲーム機種も追加予定</p>
            </div>
          </main>
        </>
    )
}

// materialuiのクラス設定オブジェクト
const useStyles = makeStyles((theme) => ({
    // 中央ぞろえ
    columnflex: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    // アイコンカードのルートcss
    iconroot: {
      height: "11.5rem",
      width:"19rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    // アイコン写真の外枠
    iconmedia: {
      height: "12rem",
      width:"auto",
      textAlign:"center"
    },
    // アイコン写真
    iconmedia: {
    　　height: "12rem",
        width:"auto",
        textAlign:"center"
    },
    // アイコンテキストの設定
    icontext:{
      textAlign:"center"
    },
    // カード全体のパディング(CSSのオーバーライド)
    rootcardoverride:{
        padding:"0.5rem 0 0 0", // 「上」「右」「下」「左」
        textDecoration: "none"
    },
    titleFont:{
        fontSize:"1.5rem",
        fontFamily:"PixelMplus12 Regular",
        src:'url("/styles/font/PixelMplus12-Regular.ttf")',
        marginBottom:"0.2rem"
    }
  }));

/*ゲーム機ページコンポーネント*/
const GameConsole = (props) => {
    const classes = useStyles();
    const {title, url, explanation, type} = props.data;
    const router = useRouter();

  return (
    // <Card className={classes.iconroot} raised={true} onClick={()=>{router.push(url, `/search?consoletype=${type}`);}}>
    <Card className={classes.iconroot} raised={true} onClick={()=>{router.push(`/search?consoletype=${type}&page=1`)}}>
      <CardActionArea>
        <CardHeader className={classes.columnflex + " " + classes.titleFont} classes={{root:classes.rootcardoverride,title:classes.titleFont}} title={title} />
        <CardMedia className={classes.iconmedia} title="icon">
          {title == "ファミリーコンピュータ" &&
            <FamicomIcon />
          }
          {title == "NINTENDO64" &&
            <N64Icon />
          }
      　</CardMedia>
        <CardContent className={classes.icontext} color="textSecondary">
        <Typography className={styles.aaa} variant="body2" color="textSecondary" component="p">
          {explanation}
        </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

// ファミコンのアイコン
const FamicomIcon = () => {
  return(
      <>
        <img className={styles.niconicoiconlink} src="../images/famicom.png" />
      </>
  )
}

// N64のアイコン
const N64Icon = () => {
  return(
      <>
        <img className={styles.niconicoiconlink} src="../images/N64.png" />
      </>
  )
}