import React from 'react';
import Layout from '../src/header/index'
import Search from '/src/search/index'
import Result from '/src/result/index'
import FooterLayout from '../src/footer/index'
import {useRouter} from 'next/router'
import { getSortedPostsData } from '../lib/posts'
import styles from '/styles/homeMain.module.css'

export default function Home({allPostsData}) {
  // url取得処理
  const router = useRouter();
  const url = router.asPath.split(/[/?]/);
  const pathName = url[1];

  const query = router.query;

  return (
    <>
      <Layout/>
      <div className={styles.rowflex}>
        <Search/>
        <Result/>
        <FooterLayout/>
      </div>
      
    </>	    
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}