const {Router}=require('express');
const router=Router();
const books =require('./books.router');
const authors=require('./authors.router');

router.use('/',books);
router.use('/',authors);

router.get('/',(req,res)=>{
    res.send('Welcome to Books-n-Authors api!');
});

module.exports=router;