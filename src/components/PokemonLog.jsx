import { useEffect, useState } from "react";
import { buscarLog } from "../services/pokemonServiceBack";

export const PokemonLog = () => {
  const [registros, setRegistros] = useState([]);
  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const res = await buscarLog();
        setRegistros(res.data);
      } catch (error) {
        console.error('Error al buscar registros:', error);
      }
    };
    fetchRegistros();
  }, [])
  return (
    <div>
      {registros?.map((reg) => (
        <li style={{ textAlign: "left" }} key={reg.id}>{reg.nombre}</li>
      ))}
    </div>
  );
};
