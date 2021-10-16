import React, { useRef, useState } from 'react'

function IndexPage () {
  const [tasks, setTask] = useState([])
  const inputRef = useRef(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const task = inputRef.current.value.trim()

    if (task !== '') {
      setTask([...tasks, { task, status: 'pending' }])
      inputRef.current.value = ''
    }
  }

  const handleClick = async ({ key, status, taskID }) => {
    let newStatus

    switch (status) {
      case 'pending':
        newStatus = 'done'
        break
      case 'done':
        newStatus = 'delete'
        break
      case 'delete':
        newStatus = 'pending'
        break
    }

    tasks[key].status = newStatus
    setTask([...tasks])
  }

  const handleDelete = async () => {
    const newTasks = tasks.filter(({ status }) => status !== 'delete')
    setTask(newTasks)
  }

  return (
    <>
      <h1>Todo</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' ref={inputRef} />
      </form>

      <ul>
        {
          tasks.map(({ _id, task, status }, key) => {
            const style = { cursor: 'pointer' }

            if (status === 'done' || status === 'delete') {
              style.textDecoration = 'line-through'
            }

            if (status === 'delete') {
              style.color = 'red'
            }

            return (
              <li
                key={key}
                onClick={handleClick.bind(this, { key, taskID: _id, status })}
                style={style}
              >
                {task}
              </li>
            )
          })
        }
      </ul>

      {
        tasks.some(({ status }) => status === 'delete') &&
          <button onClick={handleDelete}>
            Clear deleted tasks
          </button>
      }
    </>
  )
}

export default IndexPage
