import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContextProvider';
import ProtCard from '../../protCard/ProtCard';
import Loading from '../../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import IsError from '../../Components/isError/IsError';

export default function PostData() {

  let {postId} =  useParams()

   let {token}  = useContext(AuthContext)


 
  console.log(postId);
  
  async function GetSingelPost(){

    return axios.get(`${import.meta.env.VITE_API_URL}/posts/${postId}` , {
      headers:{
        token : token
      }
    })

  }

  async function getPostComments() {

    return axios.get(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments?page=1&limit=10`, {
      headers:{
        token:token
      }
    })
  }

 let {data , isLoading , isError ,refetch} = useQuery({
     queryFn: GetSingelPost,
     queryKey: ["SengilPost" , postId]
  })
  

  let {data : commentsData , isLoading : commentsLoading , isError : commentError , refetch:refetchComments} = useQuery({
    queryFn: getPostComments,
    queryKey: ["Comments" , postId]
  })


  if(isLoading){
    return <Loading count={1}/>
  }

  if(isError){
    return <IsError refetch={refetch}/>
  }

  return (

  <>

  

  <ProtCard post={data?.data?.data?.post} isHome={false} comments={commentsData?.data?.data?.comments}/>
  
  </>
    
  )
}
