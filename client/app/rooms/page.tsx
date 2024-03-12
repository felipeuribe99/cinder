import { cookies } from "next/headers";

import { User } from "../utils/interfaces";
import AddUserToRoomForm from "../components/forms/add-user-to-room";
import CreateRoomForm from "../components/forms/create-room";
import currentUser from "../../services/auth/profile";
import findAllUsers from "../../services/users/findAll";

const Rooms = async () => {
  const token = cookies().get('token')?.value;
  const user = (await currentUser()) as User;
  const organizationUsers = await findAllUsers(token, user.organization._id) as User[];

  return (
    <div className="flex flex-col items-center text-dark gap-6">
      <div className="flex flex-col items-center gap-16">
        <AddUserToRoomForm 
          token={token}
          user={user} 
          organizationUsers={organizationUsers} 
        />
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
