const Joi=require('joi')
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()

app.use(express.json())

const courses = [
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'}

];
 
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

// app.get('/api/courses', function (req, res) {
//     res.send([1,2,3])
// })


app.get('/api/courses/:id',(req,res) => { 
    const course = courses.find(c =>c.id === parseInt(req.params.id))
    if(!course)
    res.status(404).send('not found')
    res.send(course)
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})


app.post('/api/courses',(req,res)=>{
    const {error} = validateCourse(req.body)
    if(error)
    {
        res.status(400).send(error.details[0].message);
        return;
    }
   // console.log(result)
//    if(result.error)
//    {
//        res.status(400).send(result.error)
//    }
//    return 
    const course = {
        id:courses.length+1,
        name:req.body.name
    }
    courses.push(course)
    res.send(course)
})

app.put('/api/courses/:id',(req,res) =>{
    const course = courses.find(c =>c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('not found')
    const { error } = validateCourse(req.body)
    if(error)
    {
        res.status(400).send(error.details[0].message);
        return;
    }
    //updation
    course.name = req.body.name;
    res.send(course)
      });
    
    
function validateCourse(course){
        const schema={
            name:Joi.string().min(3).required()
           }
           return Joi.validate(course,schema)
    }
    
app.delete('/api/courses/:id',(req,res) =>{
    const course = courses.find(c =>c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('course with given id not found')
    const index= courses.indexOf(course)
    courses.splice(index,1)

    res.send(course)
  })  
// app.get('/api/posts/:year/:month', (req, res)=> {
//     res.send(req.params)
// })

//JWT TOKEN
// app.get('/api',(req, res) =>{
//     res.json({
//        message: 'welcome to api'
//       });
//  }) ;
app.listen(3000,() =>console.log('listening port 3000..'));