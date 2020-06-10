var express = require("express"),
    bodyParser = require("body-parser");  

var app = express();

app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
//initialize admin SDK using serciceAcountKey
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://yogdaan-268ac.firebaseio.com"
});
const db = admin.firestore();

//Home Page Route (Index Route)
app.get("/", function(req, res){
    res.render("home");
});

//Login Page Route
app.get("/login", function(req, res){
    res.render("login");
});

//ForgotPassword Route
app.get("/forgot", function(req, res){
    res.render("forgot");
});

//GET ALL BLOGS FROM DATABASE AND RENDER TO FRONT END
app.get("/blogs", function(req, res){
    db.collection('Blogs').get().then((snapshot) => {
        var blogs = [];
        snapshot.docs.forEach(doc => {
            const selectedBlog = {
                id: doc.id,
                body: doc.data().body,
                image: doc.data().image,
                created: doc.data().created,
                title: doc.data().title
            };
            blogs.push(selectedBlog);
        });
        res.render("blogs", {blogs: blogs});
      });
});

//GET ROUTE TO READ BLOG (READ MORE)
app.get('/blogs/show/:id', (req, res) => {
    (async () =>  {

        try
        {
            const document = db.collection('Blogs').doc(req.params.id);
            let product = await document.get();
            let blog = product.data();

            return res.status(200).render("showBlog", {blog: blog});
        }
        catch (error)
        {
            console.log(error);
            return res.status(500).send(error);
        }

    })();
});


//GET ALL THE REQUEST FROM DATABASE AND RENDER TO FRONT END
app.get('/request', (req, res) => {
    (async () =>  {

        try
        {
            let query = db.collection('User');
            let response = [];

            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;

                for (let doc of docs)
                {
                    const selectedItem = {
                        id: doc.id,
                        State: doc.data().State,
                        City: doc.data().City,
                        Day: doc.data().Day,
                        Request: doc.data().Request
                    };
                    response.push(selectedItem);
                }
                return response;
            })
            return res.status(200).render("request", {response: response});
        }
        catch (error)
        {
            console.log(error);
            return res.status(500).send(error);
        }

    })();
});

//GET INFORAMTION OF A PARTICULAR REQUEST 
app.get('/request/show/:id', (req, res) => {
    (async () =>  {

        try
        {
            const document = db.collection('User').doc(req.params.id);
            let product = await document.get();
            let response = product.data();

            return res.status(200).render("showRequest", {response: response});
        }
        catch (error)
        {
            console.log(error);
            return res.status(500).send(error);
        }

    })();
});
//DELETE ROUTE FOR REQUEST
app.get('/request/delete/:id', (req, res) => {
    (async () =>  {

        try
        {
            const document = db.collection('User').doc(req.params.id);
            await document.delete();
            return res.status(200).redirect("/request");
        }
        catch (error)
        {
            console.log(error);
            return res.status(500).send(error);
        }

    })();
});

//NEW BLOG POST ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});
//Create new instance
app.post('/blogs', (req, res) => {
	(async () => {
		try {
			await db
				.collection('Blogs')
				.doc()
				.create({
                    title: req.body.blog.title,
                    image: req.body.blog.image,
                    body: req.body.blog.body,
                    created: new Date().toISOString().slice(0,10)
				});

			return res.status(200).redirect("/blogs");
		} catch (error) {
			console.error(error);
			return res.status(500).send(error);
		}
	})();
});


//PORT
app.listen(3000, function(){
    console.log("Server Started");
});
