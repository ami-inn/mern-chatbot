import {Router} from 'express'
import { verifyToken } from '../utils/token-manager.js'
import { messageValidator, validate } from '../utils/validators.js'
import { deleteChat, generateChatCompletion, sendChatsToUser } from '../controllers/chat-controller.js'

// protected
const chatRouter = Router()

chatRouter.post('/new',validate(messageValidator),verifyToken,generateChatCompletion)
chatRouter.get('/all-chats',verifyToken,sendChatsToUser)
chatRouter.delete('/delete-chats',verifyToken,deleteChat)


export default chatRouter