/**
 * Boilerplate for a future REST API server
 * @type {(function(*): function(*, *, *): void)|{}}
 */

const cors=require("cors");

app.use(cors({origin: '*'}));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.listen(process.env.PORT || 5000, () => console.log("server starting on port 5000!"));

const corsOptions ={
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(cors({origin: '*'}));


