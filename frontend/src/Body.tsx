import { useEffect, useState } from "react"
import Filter from "./Filter"
import Search from "./Search"
import Sort from "./Sort"
import Room from "./Room";

export interface RoomList {
  name: string;
  rooms_available: string;
  building_picture: string;
}

const Body = () => {
  const [room, setRoom] = useState<RoomList[] | null>(null);
  useEffect(() => {
    fetch('../data.json')
      .then(response => response.json())
      .then(data => setRoom(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <div className="sm:hidden px-4 pt-3 py-2">
        <Search />
      </div>
      <div className='flex justify-between px-4 sm:pt-3'>
        <Filter />
        <div className="hidden sm:flex sm:w-[50%]">
          <Search />
        </div>
        <Sort />
      </div>
      {room && (<div className="px-4 pt-3 flex gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {room.map((roomValue: RoomList, key) => {
            return <Room name={roomValue.name} rooms_available={roomValue.rooms_available} building_picture={roomValue.building_picture} key={`room-${key}`} />
          })}
        </div>)}
    </>
  )
}

export default Body