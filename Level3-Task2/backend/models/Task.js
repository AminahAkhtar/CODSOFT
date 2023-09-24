const mongoose = require('mongoose')

const {Schema} = mongoose
const TaskSchema = new Schema ({
    name: {
         type: String, 
         required: true 
        },
    description: {
        type: String, 
        required: true 
       },
    deadline: {
        type: Date, 
        required: true 
       },
    completed: {
         type: Boolean, 
         default: false 
        },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Reference to users assigned to this task
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }, // Reference to the parent project
    createdAt: { type: Date, default: Date.now },


})

const Task = mongoose.model('task', TaskSchema );
module.exports =  Task;