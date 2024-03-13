import React from 'react'
import './App1.css'

function App1() {
  return (
    <div className='Main'> 
    <main>
      <label>Name:</label>
      <input type='text' placeholder='Give the name'/>
      <button>Add the name</button>
    
    <div>
        <input placeholder='search by name' type='text'/>
        <button>Search</button>
    </div>
    </main>

    <table>
        <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Data Added</th>
            <th>Delete</th>
            <th>Edit</th>
        </thead>
        <tbody>

        </tbody>
    </table>
    </div>

  )
}

export default App1
