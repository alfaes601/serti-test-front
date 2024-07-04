import { useForm } from "react-hook-form";
import { useState } from "react";
import { buscarPokemon } from "../services/pokemonServiceFront";
import { registrarLog } from "../services/pokemonServiceBack";
import Evoluciones from "./Evoluciones";

export const Formulario = () => {
  const [pokemon, setPokemon] = useState(null);
  const [evoluciones, setEvoluciones] = useState([]);
  const [error, setError] = useState(null);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    setError(null);
    setPokemon(null)
    try {
      const resp = await buscarPokemon(data.nombre);
      setPokemon(resp);
      setEvoluciones(resp.evoluciones);
      reset();
      if (pokemon) {
        registrarLog({ pokemon: resp });
      }
    } catch (err) {
      reset();
      setEvoluciones([]);
      setError(err);
      console.error("ERROR::" + err.message)
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="nombre"></label>
        <input
          type="text"
          name="nombre"
          id=""
          {...register("nombre", {
            required: true,
            maxLength: 15,
          })}
          placeholder="Introduce nombre o ID del Pokemon..."
          style={{ height: 35, width: 350, textAlign: "center" }}
        />
      </div>
      <input type="submit" value="Buscar" />
      {pokemon && (
        <h1>{pokemon.nombre}</h1>
      )}
      {evoluciones.length > 0 && (
        evoluciones.map((e, i) => (
          <Evoluciones key={i} e={e} />
        ))
      )}
      {error && <p>No se encontro al pokemon</p>}
    </form>
  );
};
