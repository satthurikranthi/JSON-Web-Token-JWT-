const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const jwt = require("jsonwebtoken");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "profilepics")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage: storage })


let app = express();
app.use(cors());
app.use(express.json());//to collect JSON data from req and assigns toreq.body
app.use(express.urlencoded());//to collect URLEncoded data from req and assigns to req.body

app.use('/profilepics', express.static('profilepics'))


app.post("/signup", upload.single("profilepic"), async (req, res) => {

    console.log(req.body);
    console.log(req.files);
    console.log(req.file);



    try {
        let newkranthi = new kranthi({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            email: req.body.email,
            password: req.body.password,
            mobileNo: req.body.mobileNo,
            profilepic: req.file ? req.file.profilepic : "",
        });

        await kranthi.insertMany([newkranthi]);

        res.json({ status: "success", msg: "User created successfully." })


    } catch (err) {
        res.json({ status: "failure", msg: "unable create account." })

    }


});

app.post("/login", upload.none(), async (req, res) => {

    console.log(req.body);


    let userDetailsArr = await kranthi.find().and({ email: req.body.email });

    console.log(userDetailsArr);

    if (userDetailsArr.length > 0) {

        if (userDetailsArr[0].password == req.body.password) {

            let token = jwt.sign({
                email:req.body.email,
                password:req.body.password,
            }," amboombush ");

            let dataToClient = {
                firstName: userDetailsArr[0].firstName, 
                lastName: userDetailsArr[0].lastName,
                age: userDetailsArr[0].age,
                email: userDetailsArr[0].email,
                mobileNo: userDetailsArr[0].mobileNo,
                profilepic: userDetailsArr[0].profilepic,
                token:token,

            }

        } else {
            res.json({ status: "success", msg: "Invalid password" });
        }

    } else {
        res.json({ status: "failure", msg: "Invalid Email" });

    }

});

app.post("/validateToken",upload.none(),async (req,res)=>{

    console.log(req.body.token);


    let decryptedToken = jwt.verify(req.body.token,"amboombush")

    console.log(decryptedToken);

    let userDetailsArr = await kranthi.find().and({ email:decryptedToken.email });

    console.log(userDetailsArr);

    if (userDetailsArr.length > 0) {

        if (userDetailsArr[0].password == decryptedToken.password) {


            let dataToClient = {
                firstName: userDetailsArr[0].firstName, 
                lastName: userDetailsArr[0].lastName,
                age: userDetailsArr[0].age,
                email: userDetailsArr[0].email,
                mobileNo: userDetailsArr[0].mobileNo,
                profilepic: userDetailsArr[0].profilepic,
               

            }

        } else {
            res.json({ status: "success", msg: "Invalid password" });
        }

    } else {
        res.json({ status: "failure", msg: "Invalid Email" });

    }


})



app.listen(4567, () => {
    console.log("Listening to port 1586");
})

let kranthiSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    password: String,
    mobileNo: String,
    profilepic: String,
});

let kranthi = new mongoose.model("kranthi", kranthiSchema, "kranthis");


let insertDataIntoDB = () => {

    try {
        let newkranthi = new kranthi({
            firstName: "kranthi",
            lastName: "satthuri",
            age: 20,
            email: "satthurikranthi@gmail.com",
            password: "anvira",
            mobileNo: "+91-9381622580",

        })
        kranthi.insertMany([newkranthi]);
        console.log("insert data into db successfully")



    } catch (err) {
        console.log("Unable to insert data into db", err);

    }

};
insertDataIntoDB();

let connectToMDB = async () => {
    try {
        mongoose.connect("mongodb+srv://satthurikranthi:anvira@cluster0.q79l2.mongodb.net/data?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Successsfully connect to MDB");

    } catch (err) {
        console.log("Unable to connect to MDB");
        console.log(err);

    }

}

connectToMDB();