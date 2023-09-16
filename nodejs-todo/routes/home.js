const express = require('express');
const router = express.Router();
const task = require('../models/task');


router.get('/', (req, res) => {
    task.find((err, docs) => {
        res.render('home', {tasks: docs});
    }).catch(err=>{
        // console.log("something wrong with mongo DB)"); //NOTE = mongo db atlas takes time to connect that is why this massge arrives whenever I refresh the page
    });
});



router.post('/add', (req, res, next) => {

    const { title, disc, status } = req.body;

    // console.log(title, disc, status);

    const ucltask = new task({
        title,
        disc,
        status
    });
    ucltask.save((err) => {
        if (err) {
            console.log("something went wrong to save data into data base")
        } else {
            console.log("data is recorded successfully")
            res.redirect('/');
        }
    })

});



// show update element

router.get('/edit/:id', (req, res, next) =>{
    console.log(req.params.id);
    task.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, (err, docs)=>{
        if(err){
            console.log("can't retrieve the data and edit because of some database problem")
            next(err);
        }else{
            res.render('edit', {task: docs});
        }

    })

})


// update element
router.post('/edit/:id', (req, res, next)=>{
    task.findByIdAndUpdate({_id: req.params.id}, req.body, (err, docs)=>{
        if(err){
            console.log("something went wrong to update your data")
            next(err)
        }else{
            console.log("updated successfully");
            res.redirect('/');
        }
    });
})



// delete item
router.get('/delete/:id', (req, res, next)=>{
    task.findByIdAndDelete({_id: req.params.id}, (err, docs)=>{
        if(err){
            console.log("something went wrong to delete data")
            next(err);
        }else{
            console.log("deleted successfully")
            res.redirect('/');
        }
    })
})



module.exports = router;