import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { Skeleton, Typography } from '@mui/material'
import Pokemons from './Components/Pokedex/Pokemons.jsx'



const API_POKEMON = import.meta.env.VITE_API_URL



function App() {

  const [pokemons, setPokemons] = useState([]) // Pokemons state will hold the value from the API call
  const [isLoading, setIsLoading] = useState(true) // isLoading is gonna be the switch for us to check if we received the data from the API
  const [error, setError] = useState('') // the state will hold the value of the error if we catch one


  const pokemonApiCall = async () => {
    try {
      const response = await axios.get(API_POKEMON)
      setPokemons(response.data.results)
    }

    catch (err) {
      console.log(err)
      setError(err)
    }
    finally {
      setIsLoading(false)
    }

  }

  useEffect(() => {
    pokemonApiCall()
  }, [])



  if (isLoading) return <Typography variant="h1">{isLoading && <Skeleton />}</Typography>
  if (error) return <p>{error.message}</p>

  return (
    <>
      <h1>Welcome to our React Pokedex</h1>
      <Pokemons pokemons={pokemons} />
    </>
  )
}

export default App
