'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation';

import { PrimaryButton } from "../ui/button"
import { inputClassName } from "../../utils/classNames"

import createMessage from "../../../services/messages/createMessage"

interface Props {
  token: string | undefined;
  roomId: string;
}

const CreateMessageForm = ({ token, roomId }: Props) => {
  const router = useRouter()

  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await createMessage(token, message, roomId)
      if (!res) {
        throw new Error()
      }
      router.refresh()
    } catch (error) {
      setError('An error ocurred while creating the organization')
    } finally {
      setLoading(false)
      setMessage('')
      setError(null)
    }
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={onSubmit}>
      <div className="flex gap-2">
      <input
        className={inputClassName}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
      />
      <PrimaryButton type='submit' loading={loading}>Send message</PrimaryButton>
      </div>
      {error && <div className="text-xs text-red-500 text-left">{error}</div>}
    </form>
  )
}

export default CreateMessageForm