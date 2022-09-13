
const ShowPloblem = ({ploblem}) => {
  const getColorDiff = (Diff) => {
    if (Diff < 0) return <li className='text-black'>{Diff}</li>
    else if (Diff < 400) return <li className='text-gray-400'>{Diff}</li>
    else if (Diff < 800) return <li className='text-amber-900'>{Diff}</li>
    else if (Diff < 1200) return <li className='text-green-400'>{Diff}</li>
    else if (Diff < 1600) return <li className='text-cyan-400'>{Diff}</li> 
    else if (Diff < 2000) return <li className='text-blue-400'>{Diff}</li>
    else if (Diff < 2400) return <li className='text-yellow-400'>{Diff}</li> 
    else if (Diff < 2800) return <li className='text-orange-400'>{Diff}</li>
    else return <li className='text-red-400'>{Diff}</li>
  }

  const getColorTag = (Tag, Id, Url) => {
    if (Tag === "abc") return <a href={Url} className='w-1/6 text-blue-600 hover:opacity-50'>{Id}</a>
    if (Tag === "arc") return <a href={Url} className='w-1/6 text-orange-600 hover:opacity-50'>{Id}</a>
    if (Tag === "agc") return <a href={Url} className='w-1/6 text-red-600 hover:opacity-50'>{Id}</a>
  }

  const getAc = (Name, Url, Ac) => {
    if (Ac) return  <a href={Url} className='w-1/2 hover:opacity-20 px-10 text-green-600'>{Name}</a>
    else return  <a href={Url} className='w-1/2 hover:opacity-20 px-10'>{Name}</a>
  }

  return (
    <div>
      <ul className='flex flex-row text-xl text-gray-600 py-3 border border-gray-700 bg-gray-200'>
        <li className='w-1/6'>Tag</li>
        <li className='w-1/2 px-10'>Name</li>
        <li className=''>Diff</li>
      </ul>

      <ul className='flex flex-col text-large'>
        {
          ploblem.map((data, idx) => {
            return (
              <ul className='flex flex-row pb-2 border' key={idx}>
                {getColorTag(data.Tag, data.Id, data.Url)}
                {getAc(data.Name, data.Url, data.Ac)}
                {getColorDiff(data.Diff)}
              </ul>
            )
          })
        }        
      </ul>
    </div>
  )
}

export default ShowPloblem
