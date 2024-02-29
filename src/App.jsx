import { useState, useEffect } from 'react'
import axios from 'axios'
import { Skeleton, Typography } from '@mui/material'
import Pokemons from './Components/Pokedex/Pokemons.jsx'
import './App.css'
import SearchBar from './Components/SearchBar/SearchBar.jsx'
import Pokemon from './Components/Pokedex/Pokemon.jsx'


const API_POKEMON = import.meta.env.VITE_API_URL



function App() {

  const [pokemons, setPokemons] = useState([]) // Pokemons state will hold the value from the API call
  const [isLoading, setIsLoading] = useState(true) // isLoading is gonna be the switch for us to check if we received the data from the API
  const [error, setError] = useState('') // the state will hold the value of the error if we catch one
  const [pokemon, setPokemon] = useState()

  const pokemonsApiCall = async () => {
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


  const singlePokekonApiCall = async (search) => {
    try{
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
        setPokemon(response.data)
    }

    catch(err){
      setError(err)
    }
    finally{

    }
 
  }



  useEffect(() => {
    pokemonsApiCall()
  }, [])

 


  if (isLoading) return <Typography variant="h1">{isLoading && <Skeleton />}</Typography>
  if (error) return <p>{error.message}</p>

  return (
    <>
      <SearchBar apiCall={singlePokekonApiCall} />
      <h1>Welcome to our React Pokedex</h1>
      {pokemon ? <Pokemon {...pokemon} /> :  <Pokemons pokemons={pokemons} />}
     
    </>
  )
}

export default App
