// 🐨 you'll need to import react and createRoot from react-dom up here
import * as React from 'react'
import { createRoot } from 'react-dom/client'

// 🐨 you'll also need to import the Logo component from './components/logo'
import { Logo } from 'components/logo'

import Dialog from '@reach/dialog' // Extra 1
import '@reach/dialog/styles.css' // Extra 1


/* 
// Exercise
// 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
// 🐨 for fun, you can add event handlers for both buttons to alert that the button was clicked
function App() {
  return (
    <>
      <Logo />
      <h1>Bookshelf</h1>
      <button onClick={() => {alert('Login clicked')}}>Login</button>
      <button onClick={() => {alert('Register clicked')}}>Register</button>
    </>
  )
}
 */


/* 
// Extra 1
function App() {
  const [openModal, setOpenModal] = React.useState('none')

  return (
    <>
      <Logo  width="80" height="80" />
      <h1>Bookshelf</h1>
      <Dialog aria-label="Login form" isOpen={openModal === 'login'}>
        <button onClick={() => setOpenModal('none')}>Close</button>
        <p>Login</p>
      </Dialog>
      <div>
        <button onClick={() => setOpenModal('login')}>Login</button>
      </div>
      <Dialog aria-label="Registration form" isOpen={openModal === 'register'}>
        <button onClick={() => setOpenModal('none')}>Close</button>
        <p>Register</p>
      </Dialog>
      <div>
        <button onClick={() => setOpenModal('register')}>Register</button>
      </div>
    </>
  )
}
 */


function LoginForm({ onSubmit, buttonText }) {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleSubmit(e) {
    e.preventDefault()
    
    const description = buttonText.toLowerCase()
    const formData = {
      username,
      password
    }
    
    onSubmit(description, formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
      <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
      </div>
      <div>
        <button type="submit">{buttonText}</button>
      </div>
    </form>
  )
}

// Extra 2
// Go to see the final version too
function App() {
  const [openModal, setOpenModal] = React.useState('none')

  function handleSubmit(description, formData) {
    console.log(description, formData)
  }

  return (
    <>
      <Logo  width="80" height="80" />

      <h1>Bookshelf</h1>

      <Dialog aria-label="Login form" isOpen={openModal === 'login'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Login</h3>
        <LoginForm onSubmit={handleSubmit} buttonText="Login" />
      </Dialog>
      <div>
        <button onClick={() => setOpenModal('login')}>Login</button>
      </div>

      <Dialog aria-label="Registration form" isOpen={openModal === 'register'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Register</h3>
        <LoginForm onSubmit={handleSubmit} buttonText="Register" />
      </Dialog>
      <div>
        <button onClick={() => setOpenModal('register')}>Register</button>
      </div>
    </>
  )
}



// 🐨 use createRoot to render the <App /> to the root element
// 💰 find the root element with: document.getElementById('root')
const root = createRoot(document.getElementById('root'))
root.render(<App />)
