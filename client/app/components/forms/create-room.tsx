'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation';

import { PrimaryButton } from "../ui/button"
import { inputClassName } from "../../utils/classNames"
import createRoom from "../../../services/common/create-room";

interface Props {
  token: string | undefined,
  organizationId: string
}

const CreateRoomForm = ({ token, organizationId }: Props) => {
  const router = useRouter()

  const [name, setName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await createRoom(token, name, organizationId)
      if (!res) {
        throw new Error()
      }
      router.refresh()
    } catch (error) {
      setError('An error ocurred while creating the organization')
    } finally {
      setLoading(false)
      setName('')
      setError(null)
    }
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={onSubmit}>
      <div className="flex gap-2">
      <input
        className={inputClassName}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <PrimaryButton type='submit' loading={loading}>Create room</PrimaryButton>
      </div>
      {error && <div className="text-xs text-red-500 text-left">{error}</div>}
    </form>
  )
}

export default CreateRoomForm