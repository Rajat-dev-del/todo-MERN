import Todo from "../model/todo.model.js";

export const createTodo = async(request, response) => {
    const todo = new Todo({
        text:request.body.text,
        completed:request.body.completed,
    })
    try {
        const newTodo = await todo.save();
        response.status(201).json({message: 'Todo Created Successfully', newTodo});
    } catch (error) {
        console.error(error);
        response.status(400).json({message:"Error occored", error});
    }
}

export const getTodos = async(request, response) => {
    
    try {
        const todos = await Todo.find();
        response.status(201).json({message: 'Todo Found Successfully', todos});
    }
    catch (error) {
        console.log('Error occured', error);
        response.status(400).json({message: "Error occurred", error});
    }
}

export const updateTodo = async(request, response) => {
    try {
        const todo = await Todo.findByIdAndUpdate(request.params.id, request.body, {
            new: true,
        })
        response.status(201).json({message: 'Todo updated successfully', todo});
    }catch (error) {
        console.log('Error occured', error);
        response.status(400).json({message: "Error occurred", error});
    }
}

export const deleteTodo = async(request, response) => {
    try{
        await Todo.findByIdAndDelete(request.params.id);
        response.status(201).json({message: 'Todo deleted successfully'});
    }catch (error) {
        console.log('Error occured', error);
        response.status(400).json({message: "Error occurred", error});
    }
}