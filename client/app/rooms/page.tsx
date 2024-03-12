import { cookies } from "next/headers";

import { User, Room } from "../utils/interfaces";
import currentUser from "../../services/auth/profile";
import findAllRooms from "../../services/rooms/findAll";

const Rooms = async () => {
  const token = cookies().get('token')?.value;
  const user = (await currentUser()) as User;
  const rooms = (await findAllRooms(token, user?.organization._id)) as Room[];

  return (
    <div className="flex flex-col items-center text-dark gap-6">
      <h1>Rooms</h1>
    </div>
  );
}

export default Rooms;
