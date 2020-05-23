const {Router}=require('express');
const router=Router();
const _=require('lodash');

const authors =require('../../authors.json');
const books=require('../../books.json');
const err=require('./response.json');

router.get('/authors',(req,res)=>{
    res.json(authors);
});

router.post('/authors',(req,res)=>{
    if(_.findIndex(authors,(author)=>{return author.id==req.body.id})!=-1){
        res.status(400).json(err.authorExErr);
    } else {
    const {id,name}=req.body;
    const newAuthor=req.body;
    if(id&&name) {
        authors.push(newAuthor);
        res.json(err.authorPosted);
    } else {res.status(400).json(err.formatErr);}
    }
});

router.put('/authors/:id',(req,res)=>{
    const id=req.params.id;
    var index=_.findIndex(authors,(author)=>{return author.id==id});
    if(index==-1){
        res.status(400).json(err.authorIdErr);
    }else {
    const {name,lastname}=req.body;
    if(name&&lastname){
        authors[index].name=name;
        authors[index].lastname=lastname;
        res.json(err.authorModified);
    } else {res.status(400).json(err.formatErr);}
    }
});

router.delete('/authors/:id',(req,res)=>{
    const id=req.params.id;
    if(_.findIndex(authors,function(author){return author.id==id})==-1){
        res.status(400).json(err.authorIdErr);
    } else {
    _.remove(authors,(author)=>{return author.id==id});
    _.remove(books,(book)=>{return book.authorId==id});
    res.json(err.authorDeleted);
    }
});
module.exports=router;