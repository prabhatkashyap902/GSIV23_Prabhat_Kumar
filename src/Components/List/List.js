import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link, useSearchParams } from 'react-router-dom';
import { ALL_DATA_FETCH_URL, KEY_AUTH_TMDB, SEARCH_MOVIE } from '../../Utils';
import ListCard from './ListCard';
import Shimmer from '../../assets/image/shimmer_img.gif'

const List = () => {

	const [listMovie,setListMovie]=useState([])
	
	const [suggestionListMovie,setSuggestionListMovie]=useState([])
	const [changePage,setChangePage]=useState('1')
	const [TotalPage,setTotalPage]=useState(0)
	const [searchInput,setSearchInput]=useState("")
	const [focus,setFocus]=useState(false)
	const [showSuggestionDebounce,setShowSuggestionDebounce]=useState('')
	useEffect(()=>{
		const options = {
			method: 'GET',
			url: ALL_DATA_FETCH_URL,
  			params: {language: 'en-US', page: changePage},
			headers: {
				accept: 'application/json',
				Authorization: KEY_AUTH_TMDB
			}
			};
			
			axios
			.request(options)
			.then(function (response) {
				console.log(response.data);
				setListMovie(response?.data?.results)
				setTotalPage(response?.data?.total_pages)


			})
			.catch(function (error) {
				console.error(error);
			});
	},[changePage])

	useEffect(() => {
		const getData = setTimeout(() => {
			setSuggestionListMovie([])
			const options = {
				method: 'GET',
				url: SEARCH_MOVIE,
				params: {query: searchInput, include_adult: 'false', language: 'en-US', page: '1'},
				headers: {
				  accept: 'application/json',
				  Authorization: KEY_AUTH_TMDB
				}
			  };
			  
			  axios
				.request(options)
				.then(function (response) {
				  console.log(response.data.results);
				  setSuggestionListMovie(response.data.results)
				})
				.catch(function (error) {
				  console.error(error);
				});
		  	}, 400)
	
		return () => clearTimeout(getData)
	  }, [searchInput])

	const handlePageChange=()=>{
		setChangePage(+changePage+1)
		console.log(changePage)
		window.scrollTo({
			top: 0, 
			behavior: 'smooth'
		  });
	}

	

	const handleInputChange=(e)=>{
		setSearchInput(e.target.value)
	}

	const handleEnterPress=(e)=>{
		
		if(e.key==="Enter"){
			SearchMovie()
		}
	}

	const SearchMovie=()=>{
			setListMovie([])
			const options = {
				method: 'GET',
				url: SEARCH_MOVIE,
				params: {query: searchInput, include_adult: 'false', language: 'en-US', page: '1'},
				headers: {
				  accept: 'application/json',
				  Authorization: KEY_AUTH_TMDB
				}
			  };
			  
			  axios
				.request(options)
				.then(function (response) {
				  console.log(response.data.results);
				  setListMovie(response.data.results)
				})
				.catch(function (error) {
				  console.error(error);
				});
	}

const handleSuggestionItemClick=(id,title)=>{
	console.log(title)
	setSearchInput(title)
	setFocus(false)
	SearchMovie()
}

  return (
	<div className=' drop-shadow-lg'>
		<div className='bg-gray-50 h-16 flex justify-between py-3 px-10 drop-shadow-lg'>
			<div className='flex flex-wrap '>
				<FontAwesomeIcon icon={faMagnifyingGlass} className='inline-block absolute top-[25px] left-[50px]'/>
				
				<input type='text' placeholder='Search Movie' value={searchInput} className='inputBar bg-[#EAF1FB] h-10 rounded-lg  pl-10' onChange={handleInputChange} onKeyDown={handleEnterPress} onFocus={()=>setFocus(true)} ></input>
				{searchInput && focus &&<div className="SuggestionShowCSS absolute z-2 overflow-y-auto max-h-52 bg-gray-50 mt-12">
					
				{suggestionListMovie.map((item)=><ul className='listItemSuggestionCSS cursor-pointer pl-5 my-2 border-solid border-b-2 border-gray-200' onClick={()=>handleSuggestionItemClick(item.id,item.original_title)}>{item.original_title}</ul>)}
				
				</div>}
				
			</div>
			<Link to="/" className='pt-2 cursor-pointer'>
				
				<FontAwesomeIcon icon={faHouse} size="xl" size="xl" />
				
			</Link>
		</div>
		<div className='flex flex-wrap mx-7'>
			{	listMovie.length===0?
				 Array(20).fill("2").map((item)=><img src={Shimmer} alt="" className='h-[400px] w-52 m-3'/>):
				listMovie?.map((item,index)=><Link to={"/"+item.id} state={{from:item}} className='m-3'><ListCard data={item} key={index}/></Link>)
			}
		</div>
		<div className='flex justify-between m-3'>
			<span className='m-auto'>Page - {changePage}</span>
		</div>
		<div className='flex justify-between m-3'>
			<button className='bg-blue-800 m-auto text-white rounded-lg px-5 py-2 m-3 cursor-pointer' onClick={handlePageChange}>Next</button>
		</div>
	</div>
  )
}

export default List