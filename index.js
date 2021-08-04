const mongoose =require("mongoose");
const {Schema,model}=mongoose;
/*connection to data Base*/
mongoose.connect("mongodb://127.0.0.1:27017/checkpointmongoss",{
    useNewUrlParser: true, 
    useUnifiedTopology: true})
    .then(()=>console.log("Connection to Data Base suceeded"))

    .catch((err)=>console.log("Failed to connect to Data Base"));
/*creating a personSchema*/


const schemaPerson=new Schema({
    name:{type:String,required:true},
    age:{type:Number},
    favouriteFoods:[String]

}) 
/*Create  the model*/
const Person = model('person', schemaPerson);
/*create a model of person*/
const person = new Person({
    name: "Sana Moumni",
    age :18,
    favouriteFoods:["Ma9rouna","Couscous", "Salade"]
});
/*Save a Record in data Base */
person.save((err)=>{
    if(err) throw err;
    console.log("person added succesfully!")
});


/*create and save many records with model.create()*/
arrayOfPeople =[{name:"sirine",age:17,favoriteFoods:["Crepe","soupe"]},
{name:"mohamed",age:23,favoriteFoods:["pizza","lasagne"]},
{name:"nesrine",age:24,favoriteFoods:["chocolat","cfé"]}]
Person.create(arrayOfPeople,(err)=>{
    if (err) throw err;
    console.log("people added")
})
/*Use model.find() to Search Your Database*/
Person.find({},(err,data)=>{
    if (err) throw err;
    console.log(data);
})

/*Use model.findOne() to Return a Single Matching Document from Your Database*/
Person.findOne({favoriteFoods:{$all:["chocolat"]}},(err,data)=>{
    if(err) throw err;
    console.log(data)
})
//Use model.findById() to Search Your Database By _id
Person.findById("610926d968b9cb0c103b954e", (err, data) => {
    if (err) throw err;
    console.log(data);
});
/*Perform Classic Updates by Running Find, Edit, then Save*/
Person.findByIdAndUpdate("610926d968b9cb0c103b954f", { $push: { favoriteFoods: "hamburger" } }, (err, data) => {
    if (err) throw err;
    console.log(data);
});
/*Perform New Updates on a Document Using model.findOneAndUpdate() */
Person.findOneAndUpdate({name:"sirine"},{age:20},(err,data)=>{
    if(err) throw err;
    console.log(data)
});
/*Delete One Document Using model.findByIdAndRemove*/
Person.findByIdAndRemove("610924a425dcef0a58e89630", (err, data) => {
    if (err) throw err;
    console.log(data);
});
/* MongoDB and Mongoose - Delete Many Documents with model.remove()*/ 
Person.deleteMany({ name: "Mary" }, (err, data) => {
    if (err) throw err;
    console.log(data);
});
/* Chain Search Query Helpers to Narrow Search Results*/
Person.find({ favoriteFoods: { $all:["burritos"]  } }) 
    .limit(2) 
    .sort({ name: 1 }) 
    .select("-age") 
    .exec((err, data) => { 
        if (err) throw err;
        console.log(data);
    })
    Person.find({}, (err, data) => {
        if (err) throw err;
        console.log(data);
    });