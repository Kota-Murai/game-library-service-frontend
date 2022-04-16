// 作成するコンポーネントをjsxで記述しexportする処理を実装
import styles from '../../styles/homeMain.module.css'
import React from 'react';
import { makeStyles } from '@mui/styles';

export default function Series(){
  const classes = useStyles()

    return(
        <>
          <main className={styles.container}>
            <KoujiChuIcon />
            <br/>
            <text className={classes.koujiFont}>シリーズ検索機能は作成中です。</text>
            <text className={classes.koujiFont}>完成まで少々お待ちください。</text>
          </main>
        </>
    )
}

// ファミコンのアイコン
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