import { cookies } from "next/headers"
import { Message, Room, User } from "../../utils/interfaces"
import CreateMessageForm from "../../components/forms/create-message"
import findOne from "../../../services/rooms/findOne"
import findAllMessages from "../../../services/messages/findAll"
import currentUser from "../../../services/auth/profile"
import { formatDate } from "../../utils/functions"

const Chat = async ({ params }: { params: { id: string } }) => {
  const token = cookies().get('token')?.value
  const user = (await currentUser()) as User
  const room = (await findOne(token, params.id)) as Room
  const messages = (await findAllMessages(token, params.id)) as Message[]

  
  return (
    <div className="flex flex-col text-dark gap-20">
      <div className="flex flex-col gap-6">
      <h1 className="mx-auto font-semibold text-lg">Room {room.name}</h1>
      <ul className="flex flex-col gap-4 max-h-96 overflow-y-scroll">
        {messages.map((message) => {
          return (
            <li key={message._id} className={`${user._id === message.user._id ? "ml-auto " : "mr-auto "} max-w-64`}>
              <h1 className={`${user._id === message.user._id ? "text-right " : "text-left "}
              px-4 font-semibold`}>{message.user.name}</h1>
              <div className={`${user._id === message.user._id ? "bg-primary-500 text-right " : "bg-secondary-500 text-left "}
                flex flex-col gap-2 text-neutral-100 p-2 rounded-full text-sm
              `}>
                <h1>{message.text}</h1>
              </div>
              <h1 className={`${user._id === message.user._id ? "text-right " : "text-left "} 
                px-4 text-xs`}>
                  {formatDate(message.date)}
              </h1>
            </li>
          )
        })}
      </ul>
      </div>
      <CreateMessageForm token={token} roomId={params.id} />
    </div>
  )
}

export default Chat