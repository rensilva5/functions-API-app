export function getTasks (req, res) {
    res.send('TASK')
}

export function createTask(req, res) {
    const newTask = req.body
    res.status(201).send('Task Added')
}

export function uddateTask(req, res) {
    const taskUpdate = req.body
    const { taskId } =req.params
    res.status(201).send('Task updated')

}

export function deleteTask(req, res) {
    // const taskUpdate = req.body
    const { taskId } =req.params
    res.status(201).send('Task Delete')
}