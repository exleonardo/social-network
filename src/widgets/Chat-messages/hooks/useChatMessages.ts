import React, { useEffect, useRef, useState } from 'react'

import { useAppSelector } from '@/app/store/redux-store'
import { getMessages } from '@/pages/Chat/selectors/chat-selector'

export const useChatMessages = () => {
  const messages = useAppSelector(getMessages)
  const messagesAmchorRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(true)
  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget

    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 350) {
      !isAutoScroll && setIsAutoScroll(true)
    } else {
      isAutoScroll && setIsAutoScroll(false)
    }
  }

  useEffect(() => {
    if (isAutoScroll) {
      messagesAmchorRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return () => {}
  }, [isAutoScroll, messages])

  return { messages, messagesAmchorRef, scrollHandler }
}
