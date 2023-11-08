import {Router} from 'express'
import { verifyToken } from '../utils/token-manager.js'
import { messageValidator, validate } from '../utils/validators.js'
import { generateChatCompletion } from '../controllers/chat-controller.js'

// protected
const chatRouter = Router()

chatRouter.post('/new',validate(messageValidator),verifyToken,generateChatCompletion)


export default chatRouter