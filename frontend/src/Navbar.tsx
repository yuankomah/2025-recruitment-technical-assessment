import roomOpen from '../assets/freeRoomsLogo.png';
import roomClose from '../assets/freeroomsDoorClosed.png';
import search from '../assets/search.svg';
import grid from '../assets/grid.svg';
import map from '../assets/map.svg';
import dark from '../assets/dark.svg';
import { useState } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const images = [search, grid, map, dark];

  const ImageGrid: React.FC<any> = ({ currImg }) => {
    return <div className={`border-1 border-orange-100 w-9 flex justify-center`}>
      <img src={currImg} height={20} width={20} />
    </div>
  }
  return (
    <div className="h-13 p-2 pt-1 flex justify-between border-b-1 bg-[#fff] border-[#b0afac]">
      <div className='text-2xl text-[#f28746] flex gap-1'>
        <div onClick={() => setOpen(o => !o)} className='cursor-pointer'>
          <img height={40} width={40} src={open ? roomOpen : roomClose} alt='Room status' />
        </div>
        <div className='hidden sm:inline pt-[0.8px]'>Freerooms</div>
      </div>
      <div className='flex gap-1 pt-1'>
          {images.map((i, key) => {
            return <ImageGrid currImg={i} key={key} />
          })}
      </div>
    </div>
  )
}

export default Navbar