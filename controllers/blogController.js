//Requesting body-parser
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

//Connecting to server (mongodb)

var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Mulero:EvjUKpOD6ebJnxzL@cluster0.i8r6o.mongodb.net/?retryWrites=true&w=majority');

//schema
var blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  text: String,
});

//model
var Blog = mongoose.model('Blog',blogSchema);


module.exports = (app)=>{

  app.get('/home',(req,res)=>{
    Blog.find({},(err,data)=>{
      if(err) throw err;
      res.render('home',{blog:data});
    });
  });

  app.get('/read/:id',(req,res)=>{
    var _id = String(req.params.id.replace(/\:/g,""));
    Blog.find({_id: _id}, (err, post)=>{
      if(err) throw err;
      res.render('read',{blog: post});
    });
  });

  app.delete('/read/:id',urlencodedParser,(req,res)=>{
    var id = String(req.params.id.replace(/\:/g,""));
    Blog.findByIdAndDelete(id,(err, del)=>{
      if(err) throw err;
      res.json({redirect: '/home'});
    })
  });

  app.get('/about',(req,res)=>{
    res.render('about');
  });

  //Rendering Create view and Handling Created post requests

  app.get('/create',(req,res)=>{
    res.render('create');
  });

  app.post('/create',urlencodedParser,(req,res)=>{
    // Collecting data from view and saving it onto mongodb
    const blog = new Blog({
      title: req.body.blogTitle,
      author: req.body.blogAuthor,
      text: req.body.blogText
    });

    blog.save()
    .then(
      // window.alert('Your Blog Post has been created!')
      res.redirect('/home'))
    .catch((err) => console.log('There was an error: ', err));
  });
};
