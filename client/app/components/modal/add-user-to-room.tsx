import { Room, User } from "../../utils/interfaces"
import { SecondaryButton } from "../ui/button"

interface Props {
  room: Room,
  users: User[]
  setIsModalOpen: (value: boolean) => void,
  onConfirm: (roomId: string, userId: string) => void,
  loading: boolean
  errorMessage: string | null
}

const AddUsersToRoomModal = ({ 
  room, 
  users, 
  setIsModalOpen, 
  onConfirm, 
  loading, 
  errorMessage 
}: Props) => {
  
  return (
    <div 
      className="z-10 fixed inset-0 bg-neutral-700 bg-opacity-90 flex justify-center items-center"
      onClick={() => setIsModalOpen(false)}
    >
      <div 
        className="bg-neutral-100 p-8 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
      <h1 className='text-lg font-semibold'>Add Users To Room: {room.name}</h1>
      <ul className='flex flex-col gap-4'>
        {users.filter(user => user.isApproved).map((user) => {
          return (
            <li key={user._id} className='flex flex-row gap-8 items-center py-4 px-10 bg-secondary-100 rounded-lg justify-between w-full'>
              <h1 className='text-xl text-secondary-700'>{user.name}</h1>
              {!user.rooms.includes(room._id as any) &&
                <SecondaryButton
                  type='button'
                  loading={loading}
                  onClick={() => onConfirm(room._id, user._id)}
                >
                  Add
                </SecondaryButton>
              }
            </li>
          )
        })}
      </ul>
      {errorMessage && <div className="text-xs text-red-500 text-left">{errorMessage}</div>}
      </div>
    </div>
  )
}

export default AddUsersToRoomModal
