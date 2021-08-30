const express = require("express");

const mong = require("mongoose");
var cors = require('cors')

require('dotenv').config();
const app = express();
// '/users' pe aa rahi sari request ko userRouter ko bhej dete hai
const userRouter = require('./routes/userRoutes');
const authRouter  = require('./routes/auth')

// yeh research karni hai kya matlab hota hai
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// yeh sab .env se liya jata hai taki secure tarike se values store kar sake
// .env kisi se share nai karte
const port = process.env.PORT || 3000;
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

app.use(cors())
// .use har type ki request (matlab ki GET, POST etc etc) ko leke us URL k anusar
// us object ko bhej deta hai jo URL k side me likha hai
app.use('/users', userRouter );
app.use('/api', authRouter)

// listen us port pe listen karne k liye hota hai
app.listen(port, () => {
    console.log(`server running at ${port}`);
    // mongoose ko object me store karke (yaha pe mong hai naam) 
    // .connect me us database ka url or us url me password and DB ka name bhejte hai
    mong.connect(
        `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.kacjq.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify:false
    }) // .then use hota hai ki connect hone k baad kya kare voh handle karne k liye
    .then(()=> {
        console.log(`conn db success `);
        }) // .catch use hota hai li connection me error aya toh kya kare handle karne k liye
        .catch((e)=>{
            console.log(`no conn`);
        })
})





