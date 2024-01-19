const subscribers = {
  'messages-received': [] as MessagesReceivedSubscriberType[],
  'status-changed': [] as StatusChangedSubscriberType[],
}

let ws: WebSocket | null = null

const closeHandler = () => {
  notifySubscribersAboutStatus('pending')
  createChannel()
  setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
  const newMessage = JSON.parse(e.data)

  subscribers['messages-received'].forEach(s => s(newMessage))
}

const openHandler = () => {
  notifySubscribersAboutStatus('ready')
}
const errorHandler = () => {
  notifySubscribersAboutStatus('error')
}

const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler)
  ws?.removeEventListener('message', messageHandler)
  ws?.removeEventListener('open', openHandler)
  ws?.removeEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: StatusType) => {
  subscribers['status-changed'].forEach(s => s(status))
}

function createChannel() {
  cleanUp()
  ws?.close()
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  notifySubscribersAboutStatus('pending')
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', messageHandler)
  ws.addEventListener('open', openHandler)
  ws.addEventListener('error', errorHandler)
}

export const chatAPI = {
  sendMessage(message: string) {
    ws?.send(message)
  },
  start() {
    createChannel()
  },
  stop() {
    subscribers['messages-received'] = []
    subscribers['status-changed'] = []

    cleanUp()
    ws?.close()
  },
  subscribeOnMessages(
    eventName: EventsNames,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
  ) {
    // @ts-ignore
    subscribers[eventName].push(callback)

    return () => {
      // @ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    }
  },
  unsubscribeFromNewMessages(
    eventName: EventsNames,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
  ) {
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
  },
}

export type ChatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}

type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
export type StatusType = 'error' | 'pending' | 'ready'
type EventsNames = 'messages-received' | 'status-changed'
