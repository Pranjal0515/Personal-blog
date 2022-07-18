

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Blog website is a regularly updated website or web page, typically one run by an individual or small group, that is written in an informal or conversational style. A blog (a truncation of weblog) is a discussion or informational website published on the World Wide Web consisting of discrete, often informal diary-style text entries (posts). Posts are typically displayed in chronological order. When you use your niche knowledge for creating informative and engaging posts, it builds trust with your audience. Great blogging makes your business look more credible, which is especially important if your brand is still young and fairly unknown. It ensures presence online and niche authority at the same time.";
const aboutContent = "This is a personal blog website built to update our customers day to day about new technologies. We try our best to come up with detailed blogs on newer technologies. Our blogs are interesting and knowledgable. Every day, new technologies and tools evolve, and new versions of the existing ones get released. Therefore, IT professionals need to keep on updating their skills as per the current trending technology in the market. If you are wondering about the new technologies of the upcoming decade, take a look at our blogs."
const contactContent = "We would love to hear from you how we'r doing. You can reach out to us at: ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Admin-Pranjal:Test12345@cluster0.pt5t2i2.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

let port=process.env.PORT;
if(port == ""||port == null){
  port=3000;
}

app.listen(port, function() {
  console.log("Server started successfully");
});
