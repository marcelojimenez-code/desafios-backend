import { Router } from "express";
import messageModel from "../models/message.model.js";

const router = Router();

router.get('/chat', (req,res)=>{
    res.render('chat/chat',{title:"Chat usuario"})
})


export default router;