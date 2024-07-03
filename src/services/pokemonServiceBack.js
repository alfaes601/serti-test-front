import { backPokemonAPI } from "../api/backPokemonAPI";

export const registrarLog = async ({ pokemon }) => {
  try {
    const { nombre, id, orden, evoluciones } = pokemon;
    const evolucionesSet = evoluciones.map((e) => ({
      nombre: e.nombre,
      idApi: e.id,
    }));
    const data = {
      nombre: nombre,
      orden: orden,
      idApi: id,
      evoluciones: [], //evolucionesSet,
    };
    console.log(data);
    const resp = await backPokemonAPI.post("/registrar/pokemon", data);
    if (resp.status == "201") console.log("Guarado correctamente en el log");
    return resp;
  } catch (e) {
    throw new Error("Error al registrar el dato", e);
  }
};

export const buscarLog = async () => {
  try {
    const resp = await backPokemonAPI.get("/buscar/pokemons");
    return resp;
  } catch (e) {
    throw new Error("Error buscando log de pokemon", e.message);
  }
};
