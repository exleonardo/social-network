let subscribers = [] as SubscriberType[]


let ws: WebSocket | null = null
const closeHandler = () => {
  createChannel ()
  let id = setTimeout ( createChannel , 3000 )
}
const messageHandler = (e: MessageEvent) => {
  const newMessage = JSON.parse ( e.data )
  subscribers.forEach ( s => s ( newMessage ) )
}

function createChannel() {

  ws?.removeEventListener ( 'close' , closeHandler )
  ws?.close ()

  ws = new WebSocket ( 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx' )
  ws.addEventListener ( 'close' , closeHandler )
  ws.addEventListener ( 'message' , messageHandler )

}


export const chatAPI = {

  subscribe(callback: SubscriberType) {

    subscribers.push ( callback )
    return () => {
      subscribers = subscribers.filter ( s => s !== callback )
    }
  } ,
  unsubscribe(callback: SubscriberType) {
    subscribers = subscribers.filter ( s => s !== callback )
  } ,
  sendMessage(message: string) {
    ws?.send ( message )
  } ,
  start() {
    createChannel ()
  } ,
  stop() {
    subscribers = []
    ws?.removeEventListener ( 'close' , closeHandler )
    ws?.removeEventListener ( 'message' , messageHandler )
    ws?.close ()
  }

}


export type ChatMessage = {
  message: string,
  photo: string,
  userId: number,
  userName: string
}
type SubscriberType = (messages: ChatMessage[]) => void
