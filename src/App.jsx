import './App.css'

import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import ExpenseForm from './components/ExpenseForm';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <AuthForm></AuthForm>
      <ExpenseForm></ExpenseForm>
    </>
  )
}

export default App
