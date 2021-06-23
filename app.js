const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ptask', {useNewUrlParser: true,useUnifiedTopology: true});
mongoose.connection.once('open',function(){       
    console.log('Connection has been established');
})

const Schema = mongoose.Schema;

const tasksSchema = new Schema({
    Description : String,
    Completed : Boolean
});

const Task = mongoose.model('Task', tasksSchema);
 
var task1 = new Task({
            Description: 'Team meeting on Skype @10',
            Completed: true
        });
task1.save();

var task2 = new Task({
            Description: 'Meeting with client @12',
            Completed: true
        });
task2.save();

var task3 = new Task({
            Description: 'Online Exam @7',
            Completed: false
});
task3.save();

var task4 = new Task({
            Description: 'Project Deadline on 23 June',
            Completed: false
});
task4.save();


Task.find(function(err, tasks){
    if(err){
      console.log(err);
    }
    else{
      tasks.forEach(function(task){
        if (task.completed == false){
          console.log(task.description);
        }
      });
    }
});

Task.updateOne({_id: task3._id}, {completed: true}, function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log('Successfully updated task 3');
    }
});

Task.updateOne({_id: task4._id}, {completed: true}, function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log('Successfully updated task 4');
    }
});

var myquery = {_id: task4._id};

Task.deleteOne(myquery, function(err, obj){
    if (err){
        console.log(err);
    }
    else{
        console.log("1 document deleted");
    }
});