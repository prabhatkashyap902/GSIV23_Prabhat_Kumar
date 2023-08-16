import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, } from '@fortawesome/free-solid-svg-icons'
import { Link,  } from 'react-router-dom'

const DisplayHeader = (props) => {
  return (
    <div>
        <div className='bg-gray-50 h-16 flex justify-between py-3 px-10 drop-shadow-lg'>
    <div className='DisplayPageTitleCss pt-2 text-green-800 font-extrabold text-2xl'>
        {props?.data}
    </div>
    <Link to="/" className='pt-2 left-0 '>
        
        <FontAwesomeIcon icon={faHouse} size="xl" size="xl" />
        
    </Link>
</div></div>
  )
}

export default DisplayHeader