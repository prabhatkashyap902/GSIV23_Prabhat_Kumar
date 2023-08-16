import React from 'react'
import { IMAGE_BASE_URL } from '../../Utils'

const ListCard = (props) => {
	// console.log(props)
	return (
		<div className="ListCardCSS  cursor-pointer  rounded-xl overflow-hidden shadow-2xl m-3 text-xs">
			
			<img alt="poster_image" src={IMAGE_BASE_URL+ props.data?.backdrop_path} className='w-full'/>
			
			<div className='flex justify-between p-3 h-12'>
				<h1 className='font-extrabold '>{props.data?.original_title}</h1>
				<h2>({props.data?.vote_average})</h2>
			</div>
			<span className='p-2'>
			<div className='px-3  line-clamp-2 text-ellipsis'>{props.data?.overview}</div></span>
		</div>
	)
}

export default ListCard