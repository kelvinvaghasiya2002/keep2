import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());

// mongoose.connect("mongodb://127.0.0.1:27017/keepDb").then(()=>{
//     console.log("Database is connected...")
// }).catch((err)=>{
//     console.log(err);
// })

mongoose.connect("mongodb+srv://kelvin123:Kelvin123@cluster0.yntrczs.mongodb.net/keepDb?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Database is connected...")
}).catch((err)=>{
    console.log(err);
})

const keepSchema = new mongoose.Schema({
    id : Number,
    title : String,
    content : String
});

const keepItems = mongoose.model("keepItems",keepSchema);


app.get("/",(req,res)=>{
    // keepItems.find().then((Items)=>{
    //     res.json(Items)
    // }).catch((err)=>{
    //     res.json({
    //         error:"error"
    //     })
    // })
    res.send("<h2>Hello World</h2>");
})


app.post("/post",(req,res)=>{

    keepItems.find().then((items)=>{
        const item = new keepItems({
            id : items.length ,
            title : req.query.title,
            content : req.query.content
        })
        item.save();
    }).catch((err)=>{
        console.log(err);
    })

    keepItems.find().then((Items)=>{
        res.json(Items)
    }).catch((err)=>{
        console.log(err)
    })
})


app.delete("/delete/:id",(req,res)=>{
    const index = req.params.id;
    keepItems.deleteOne({id: index}).then((result)=>{
        // console.log(result);
    }).catch((err)=>{
        console.log(err);
    })

    keepItems.find().then((Items)=>{
        res.json(Items)
    }).catch((err)=>{
        console.log(err)
    })
})



app.listen(4000 , ()=>{
    console.log("server is running on port 4000");
});