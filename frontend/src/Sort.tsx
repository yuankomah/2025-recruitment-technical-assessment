import sort from '../assets/sort.svg'

const Sort = () => {
  return (
    <div className='border-[#ef7021] border-2 rounded-lg px-[20px] py-[6px] text-[#ef7021] flex gap-2 justify-center items-center'>
      <img src={sort} height={20} width={20} alt='Sort icon' />
      <div className='text-sm pr-[18px]'>Sort</div>
    </div>
  )
}

export default Sort