import { cookies } from "next/headers";

import { User, Room } from "../utils/interfaces";
import currentUser from "../../services/auth/profile";
import findAllRooms from "../../services/rooms/findAll";
import { PrimaryButton } from "../components/ui/button";
import CreateRoomForm from "../components/forms/create-room";

const Rooms = async () => {
  const token = cookies().get('token')?.value;
  const user = (await currentUser()) as User;
  const rooms = (await findAllRooms(token, user?.organization._id)) as Room[];

  return (
    <div className="flex flex-col items-center text-dark gap-6">
      <div className="flex flex-col items-center gap-16">
        <h1 className='text-lg font-semibold'>Rooms:</h1>
        <ul className='flex flex-col gap-4'>
          {rooms && rooms.map((room) => {
            return (
              <li key={room._id} className='flex flex-row gap-8 items-center py-4 px-10 bg-primary-100 rounded-lg justify-between'>
                <h1 className='text-xl text-primary-700'>{room.name}</h1>
                <PrimaryButton 
                  type='button' 
                  // loading={loading} 
                  // onClick={() => onClick(organizationUser._id)}
                >
                  Go chat
                </PrimaryButton>
              </li>
            )
          })}
        </ul>
        {user?.admin &&
          <div className='flex flex-col items-center gap-4'>
            <h1 className='text-lg font-semibold'>¿Do you want to create a new room?</h1>
            <CreateRoomForm token={token} organizationId={user?.organization._id} />
          </div>
        }
      </div>
    </div>
  );
}

export default Rooms;
