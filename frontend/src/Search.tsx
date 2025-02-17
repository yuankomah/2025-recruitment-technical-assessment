import search from '../assets/search2.svg'

const Search = () => {
  return (
    <div className='border-[#bab8b1] border-[1.5px] rounded-sm w-[100%] px-[12px] py-[7px] text-[#3d3d3d] flex'>
      <img src={search} height={20} width={20} alt='Search building icon' />
      <div className='text-sm pr-[9px]'>Search for a building...</div>
    </div>
  )
}

export default Search