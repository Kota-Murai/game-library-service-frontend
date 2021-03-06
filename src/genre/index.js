// 作成するコンポーネントをjsxで記述しexportする処理を実装
import styles from '../../styles/homeMain.module.css'
import React from 'react';
import { makeStyles } from '@mui/styles';


// ジャンル検索ページコンテンツ
// ※作成中
export default function Genre(){
  const classes = useStyles()

    return(
        <>
          <main className={styles.container}>
            <KoujiChuIcon />
            <br/>
            <div className={classes.koujiFont}>ジャンル検索機能は作成中です。</div>
            <div className={classes.koujiFont}>完成まで少々お待ちください。</div>
          </main>
        </>
    )
}

// 工事中のアイコン
const KoujiChuIcon = () => {
  return(
      <>
        <img className={styles.niconicoiconlink} src="../images/kouji.png" />
      </>
  )
}

// materialuiのクラス設定オブジェクト
const useStyles = makeStyles((theme) => ({
  koujiFont:{
      fontSize:"1.5rem",
      fontFamily:"PixelMplus12 Regular",
      src:'url("/styles/font/PixelMplus12-Regular.ttf")',
      marginBottom:"0.2rem"
  }
}));