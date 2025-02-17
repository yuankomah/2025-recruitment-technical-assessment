import { RoomList } from "./Body"
import circle from '../assets/circle.svg'

const Room = ({ name, rooms_available, building_picture }: RoomList) => {
  return (
    <div
      className="bg-cover bg-center h-20 sm:h-50 md:h-65 lg:h-79 rounded-lg p-2 flex flex-col justify-between"
      style={{ backgroundImage: `url(${building_picture})` }} 
    >
      <div className="flex justify-between px-2 sm:hidden h-[100%] items-center">
        <div className="text-white text-base font-bold">{name}</div>
        <div className="h-6 bg-white text-[10.5px] p-2 rounded-xl gap-1 font-bold flex items-center justify-between tracking-tighter">
          <img src={circle} height={15} width={15} alt="green circle" /> 
          <div>{rooms_available} / {rooms_available}</div>
        </div>
      </div>
      <div className="sm:hidden"></div>
      <div className="hidden sm:inline justify-items-end pt-[1px]">
        <div className="h-8 bg-white pl-2 pr-3 text-[10.5px] rounded-xl font-bold gap-2 flex items-center tracking-tighter">
          <img src={circle} height={15} width={15} alt="green circle" /> 
          <div>{rooms_available} rooms available</div>
        </div>
      </div>
      <div className="hidden sm:flex items-center text-white pl-4 text-sm h-11 bg-[#ef7021] w-[100%] rounded-lg tracking-[-0.02em]">
        {name}
      </div>  
    </div>
  )
}

export default Room