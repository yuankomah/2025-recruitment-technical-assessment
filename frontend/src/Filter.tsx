import filter from '../assets/filter.svg'

const Filter = () => {
  return (
    <div className='border-[#ef7021] border-2 rounded-lg px-[17px] py-[6px] text-[#ef7021] flex gap-2 justify-center items-center'>
      <img src={filter} height={20} width={20} alt='Filter icon' />
      <div className='text-sm pr-[9px]'>Filters</div>
    </div>
  )
}

export default Filter