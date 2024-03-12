'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { PrimaryButton, SecondaryButton } from "../ui/button"
import { Room, User } from "../../utils/interfaces"
import AddUsersToRoomModal from '../modal/add-user-to-room';
import addUserToRoom from '../../../services/users/addUserToRoom';

interface Props {
  token: string | undefined
  user: User
  organizationUsers: User[]
}

const AddUserToRoomForm = ({ token, user, organizationUsers }: Props) => {
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const onClick = (room: Room) => {
    setIsModalOpen(true)
    setSelectedRoom(room)
  }

  const onConfirm = async (roomId: string, userId: string) => {
    setLoading(true)
    try {
      const res = await addUserToRoom(token, userId, user.organization._id, [roomId])
      if (!res) {
        throw new Error()
      }
      router.refresh()
    } catch (error) {
      setErrorMessage('An error ocurred while adding the user to the room')
    } finally {
      setLoading(false)
      setIsModalOpen(false)
      setErrorMessage(null)
      setSelectedRoom(null)
    }

  }

  return (
    <div className='flex flex-col gap-4'>
      <ul className='flex flex-col gap-4 items-center'>
        <h1 className='text-lg font-semibold'>My Rooms:</h1>
        {user.rooms && user.rooms.map((room) => {
          return (
            <li key={room._id} className='grid grid-cols-3 gap-8 items-center py-4 px-10 bg-primary-100 rounded-lg w-full'>
              <h1 className='text-xl text-primary-700'>{room.name}</h1>
              <PrimaryButton 
                type='button' 
                loading={loading} 
                onClick={() => router.push(`/rooms/${room._id}`)}
              >
                Go chat
              </PrimaryButton>
              {user.admin &&
                <SecondaryButton 
                  type='button' 
                  onClick={() => onClick(room)}
                >
                  Add user
                </SecondaryButton>
              }
            </li>
          )
        })}
      </ul>
      {isModalOpen && (
        <AddUsersToRoomModal
          room={selectedRoom as Room}
          users={organizationUsers}
          setIsModalOpen={setIsModalOpen}
          onConfirm={onConfirm}
          loading={loading}
          errorMessage={errorMessage}
        />
      )}
    </div>
  )
}

export default AddUserToRoomForm