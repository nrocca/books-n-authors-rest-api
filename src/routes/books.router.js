const {Router}=require('express');
const router=Router();
const _=require('lodash');

const books =require('../../books.json');
const authors=require('../../authors.json');
const err=require('./response.json');

router.post('/books',(req,res)=>{
    if(_.findIndex(books,(book)=>{return book.id==req.body.id})!=-1){
        res.status(400).json(err.bookExErr);
    } else {
    const {id,name,authorId} = req.body;
    if(id&&name&&authorId){
        const newBook=req.body;
        books.push(newBook);
        res.json(err.bookPosted);
    } else {res.status(400).json(err.formatErr);}
    }
});

router.get('/books',(req,res)=>{
    let bookData=[];
    for(i=0;i<books.length;i++){
        let index=_.findIndex(authors,(author)=>{return author.id==books[i].authorId});
        let tempBook={"id":"","name":"","authorId":"","author":""};
        tempBook.id=books[i].id;
        tempBook.name=books[i].name;
        tempBook.authorId=books[i].authorId;
        tempBook.author= (index!=-1)?authors[index].name+' '+authors[index].lastname:"No author with that Id yet";
        bookData.push(tempBook);
    }
    res.json(bookData);
});

router.put('/books/:id',(req,res)=>{
    const id=req.params.id;
    var index=_.findIndex(books,(book)=>{return book.id==id});
    if (index==-1){
        res.status(400).json(err.bookIdErr);
    } else {
    const name=req.body.name;
    if(name){
        books[index].name=name;
        res.json(err.bookModified);
    } else {res.status(400).json(err.formatErr);}
    }        
});

router.delete('/books/:id',(req,res)=>{
    const id=req.params.id;
    if(_.findIndex(books,(book)=>{return book.id==id})==-1){
        res.status(400).json(err.bookIdErr);
    } else {
    _.remove(books,(book)=>{return book.id==id});
    res.send(err.bookDeleted);
    }
});

module.exports=router;