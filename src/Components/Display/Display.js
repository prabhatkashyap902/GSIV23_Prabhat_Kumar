import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { FETCH_MOVIE_WITH_ID, IMAGE_BASE_URL, KEY_AUTH_TMDB } from '../../Utils'
import axios from 'axios';
import DisplayHeader from './DisplayHeader';

const Display = () => {
	const location = useLocation()
	const {movie}=useParams()
  const from = location?.state
  const[data,setData]=useState(from?.from)
  console.log(data)
  useEffect(()=>{
	console.log(from?.from===undefined)
	if(from?.from===undefined){
		const options = {
			method: 'GET',
			url: FETCH_MOVIE_WITH_ID+movie,
			params: {language: 'en-US'},
			headers: {
			  accept: 'application/json',
			  Authorization:KEY_AUTH_TMDB
			}
		  };
		  
		  axios
			.request(options)
			.then(function (response) {
			  console.log(response.data);
			  setData(response.data)
			})
			.catch(function (error) {
			  console.error(error);
			});
	}

  },[])
  if(from?.from===undefined){

  }
  return (
	<div className=' drop-shadow-lg'>
		
		<DisplayHeader data={data?.original_title}/>
		<div className='DisplayContainerCSS  ml-10 mt-5  '>
			<div className=''>
				<img src={IMAGE_BASE_URL+data?.backdrop_path} alt={data?.original_title+"_img"} className='DisplayImageCSS h-[400px]  '/>
			</div>
			<div className='DisplayTextCSS'>
				<h1 className='font-bold text-3xl'>{data?.original_title} <span className='font-light'>({data?.vote_average})</span></h1>
				<h2 className='my-2'>{data?.release_date?.split('-')[0]} | Length | Director</h2>
				<h2 className='my-2'>Cast: Actor1, Actor2, ...</h2>
				<p className='mr-3'>Description: {data?.overview}</p>
			</div>
		</div>
		
	</div>
  )
}

export default Display