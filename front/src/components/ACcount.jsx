import React from 'react'

const ACcount = ( {ploblem} ) => {
  return (
    <div className='flex flex-row py-2'>
      <div className='px-2'>ALL</div>
      <div className='px-2 text-gray-500'>{ploblem.length}</div>
      <div className='px-2'>AC</div>
      <div className='px-2 text-green-600'>{ploblem.filter(function(x){return x.Ac===true}).length}</div>
    </div>
  )
}

export default ACcount
