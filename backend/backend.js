var koa = require('koa');
const Router = require("koa-router");
const HttpStatus = require("http-status");
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const uuid = require('uuid');
const axios = require('axios');
const serve = require('koa-static');
const mount = require('koa-mount');

var app = new koa();

const PORT = process.env.PORT || 3001;

app.use(bodyParser());
app.use(cors());

const router = new Router();

const instance = axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5/',
});

/** CONSTANTS */
const SUCCESS = {"message": "OK"};


/** Serve react */
// router.get('/app', serve('./build'))
const staticPages = new koa();
staticPages.use(serve('./build'));
app.use(mount("/", staticPages));

/** Weather functions */
const apiKey = "4b6bc0017f2d76c85014d3a5b58d3e59";

// Gets the current weather for a given city. Accepts url param city.
router.get('/get-current-weather', async (ctx, next) => {
    const city = ctx.request.query["city"];
    const data = await instance.get(`/weather?q=${city}&appid=${apiKey}`)
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        console.log(err);
    })
    ctx.body = data;
    ctx.status = HttpStatus.OK;
    await next();
});

// Gets the weather hourly forecast for a given city. Accepts url param city.
router.get('/get-hourly-forecast', async (ctx, next) => {
    const city = ctx.request.query["city"];
    const data = await instance.get(`/forecast?q=${city}&appid=${apiKey}`)
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        console.log(err);
    })
    ctx.body = data;
    ctx.status = HttpStatus.OK;
    await next();
});

/** Users Functions */
const users = [{username: "admin", password: "adminpass", isAdmin: true}];
const logins = [];

// Creates a new non-admin user by provided username and password.
router.post("/create-user", async (ctx, next) => {
    const newUser = ctx.request.body;

    if (newUser.username === ""
    || newUser.password === "") {
        ctx.status = HttpStatus.OK;
        ctx.body = {"message": "Cannot create empty user"};
        await next();
        return
    }

    // validate user
    let duplicatedName = false
    for(let i = 0; i < users.length; i++) {
        if (users[i].username === newUser.username) {
            duplicatedName = true;
        }
    }

    if (duplicatedName) {
        ctx.status = HttpStatus.OK;
        ctx.body = {"message": "Another user with this username exists."};
        await next();
        return;
    }

    users.push(newUser);
    ctx.status = HttpStatus.OK;
    ctx.body = SUCCESS;
    await next();
});

// Returns all given users in the system except the admin.
router.get("/get-users", async (ctx, next) => {
    ctx.status = HttpStatus.OK;
    const returnUsers = [];
    for(let i = 0; i < users.length; i++) {
        if (!users[i].isAdmin) {
            const tempUser = { username: users[i].username};
            returnUsers.push(tempUser);
        }
    }

    ctx.body = returnUsers;
    await next();
});

// Helper function to find existing logged in user.
const findLogin = (username) => {
    let foundLogin = false;
    for(let i = 0; i < logins.length; i++) {
        if (logins[i].username === username) {
            // Found existing login
            foundLogin = true;
        }
    }

    return foundLogin;
}

// Deletes a user by username.
// Not clearly this should be a DELETE HTTP Verb but koajs does not want to parse the body.
// TODO: fix the verb
router.post("/delete-user", async(ctx, next) => {
    // TODO: must be protected with a real jwt token containing claims and verifying that the user making the request is indeed an admin.
    const body = ctx.request.body;
    let index = -1;
    for(let i = 0; i < users.length; i++) {
        if(users[i].username === body.username && !users[i].isAdmin) {
            index = i;
            break;
        } 
    }

    if (index > -1) {
        users.splice(index, 1)
        
        ctx.body = SUCCESS
    } else {
        ctx.body = {"message": "no user found"}
    }

    ctx.status = HttpStatus.OK
    

    await next();
})

// Logins a new user by provided credentials.
router.post("/login", async (ctx, next) => {
    const credentials = ctx.request.body;
    let user = null;
    for(let i = 0; i < users.length; i++) {
        if (users[i].username === credentials.username 
            && users[i].password === credentials.password) {
            user = users[i];
        }
    }

    ctx.status = HttpStatus.OK
    ctx.body = {"message": "no user found"}
    if (user !== null) {    
        // Check if we already have a login
        let foundLogin = findLogin(user.username);
        
        if(foundLogin) {
            ctx.body = {"message": "loggedin"}
            await next();
            return;
        }

        const guid = uuid.v4();

        logins.push({username: user.username, token: guid});

        ctx.body = {
            authenticated: true,
            token: guid,
            user: {
                username: user.username,
                isAdmin: user.isAdmin,
            },
        };
    }

    await next();
});

// Logouts a given user by username
router.get("/logout", async(ctx, next) => {
    const username = ctx.request.query["name"];
    
    let index = -1;
    for(let i = 0; i < logins.length; i++) {
        if (logins[i].username === username) {
            index = i;
        }
    }
    
    if (index > -1) {
        logins.splice(index, 1);
    }

    ctx.status = HttpStatus.OK
    ctx.body = SUCCESS
    await next();
})


app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
    console.log(`==> The administrator username and password is ${users[0].username}:${users[0].password}`);
});