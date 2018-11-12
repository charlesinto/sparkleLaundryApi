import express from 'express';
let router = express.Router();
router.get('/',(req,res, next)=>{
    res.json({
        message:`welcome to sparkle api`,
        
    })
});

export default router;