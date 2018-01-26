const express = require('express');
const logger = require('morgan');

const app = express();

const users = require('./routes/users');

//Middleware
app.use(logger('dev'));

// Routes
app.use('/users', users);

//Catch 404 errors
app.use((req,res,next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

//Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err: {};
    const status = err.status || 500;
    
    //respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });

    //respond to ourselves
    console.error(err);
})

//Start server
const port = app.get('port') || 3000;
app.listen(port, () => console.log(`server is running on ${port}`));