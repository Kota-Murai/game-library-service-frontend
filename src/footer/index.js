import styles from '../../styles/homeMain.module.css'
import React from 'react'
import { makeStyles } from '@mui/styles';
import Link from 'next/link';


const useStyles = makeStyles({
  footer: {
    backgroundColor: "black",
    // height: "100px",
    width: "100%",
    textAlign: "center",
    color: "white",
    paddingTop: "0.75rem",
    position: "fixed",
    bottom: "0",
    fontSize:"0.75rem",
    height:"4rem"
  },
});

// 作成するコンポーネントをjsxで記述しexportする処理を実装
export default function FooterLayout() {

  const classes = useStyles();

  return (
      <>
        <div className={classes.footer}>
          <a className={styles.footerLayout} href="https://twitter.com/DevelopTopo" target="_blank">twitter</a>
          <p>2022 toposon</p>
        </div>
      </>
  )
}