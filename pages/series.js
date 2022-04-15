import React from 'react';
import Series from '../src/series/index'
import Genre from '../src/genre/index'
import Layout from '../src/header/index'
import {useDispatch, useSelector} from "react-redux";
import {gettabName} from '../src/header/selectors'
import {useRouter} from 'next/router'
import { getSortedPostsData } from '../lib/posts'
import FooterLayout from '../src/footer/index'
import Console from '../src/console/index'

export default function ProfileTab({allPostsData}) {
  // url取得処理
  const router = useRouter();
  const url = router.asPath.split(/[/?]/);
  const pathName = url[1];


  return (
    <>
      <Layout/>
          {((pathName == "console") || (pathName == "")) &&
              <Console allPostsData={allPostsData} />
          }
          {(pathName == "genre") &&
              <Genre/>
          }
          {(pathName == "series") &&
              <Series/>
          }
      <FooterLayout/>
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