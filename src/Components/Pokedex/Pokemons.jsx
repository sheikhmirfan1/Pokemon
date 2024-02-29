
import PokemonCard from "./PokemonCard";

const Pokemons = ({pokemons}) => {
    
    return(
        <>
        <div style={{display : 'flex', flexWrap:'wrap'}}>
            {pokemons.map (pokemon => {

                return <PokemonCard key={ pokemon.name} {...pokemon}/>
            })}
            </div>
        
        </>
    )
}



export default Pokemons