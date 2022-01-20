
const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 5000;

//server starting
app.get("/", (req, res) => {

    res.status(200).send("Engine Started, Ready to take off!");

})

//creating file
app.post("/api/application", function (request, response){
    
    
    const content = `${request.body.content}`;
    
    fs.writeFile("./storage/test.docx", content, (err) => {
      if (err) {
        console.log(err);
        response.json({
            message: "message not sent: an error occured; check the server's console log"
        });
    } else {
        response.json({
            message: `Application created successfully!`
            });
            }
        });
    });



//express....
app.listen(port, () => {

    console.log(`Here we go, Engines started at ${port}.`);

})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // render the error page
  res.status(err.status || 500);
  res.json({
     message: err.message,
     error: req.app.get('env') === 'development' ? err : {} 

  });
});

module.exports = app;
