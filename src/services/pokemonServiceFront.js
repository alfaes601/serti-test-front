import { pokemonAPI } from "../api/pokemonAPI";

const obtenerNombresYUrls = (chain, nombresUrls) => {
  // se agrega el nombre y la url de la especie actual
  //const img = await buscarImgPokemon(pokemonAPI.get(`/pokemon/`));
  nombresUrls.push({
    nombre: chain.species.name,
    url: chain.species.url,
  });

  //se recorren el array y se agrega al array principal la info
  chain.evolves_to.forEach((evolucion) => {
    obtenerNombresYUrls(evolucion, nombresUrls);
  });
};

export const buscarPokemon = async (idONombre) => {
  const nombresUrlsEspecies = [];
  try {
    const resp = await pokemonAPI.get(`/pokemon-species/${idONombre}`);
    //aqui se obtiene la url de las evoluciones
    if (resp?.data?.evolution_chain.url) {
      const evoluciones = await pokemonAPI.get(resp.data.evolution_chain.url);
      obtenerNombresYUrls(evoluciones.data.chain, nombresUrlsEspecies);
      console.log(nombresUrlsEspecies);
    }
    const fetchImages = async () => {
      for (const e of nombresUrlsEspecies) {
        const segments = e.url.split("/");
        const id = segments[segments.length - 2];
        e.img = await buscarImgPokemon(`/pokemon/${id}/`);
        e.id = id;
      }
      console.log(nombresUrlsEspecies);
    };
    await fetchImages();
    return {
      id: resp.data.id,
      nombre: resp.data.name,
      orden: resp.data.order,
      evoluciones: nombresUrlsEspecies,
    };
  } catch (e) {
    throw new Error(`Error al busar el Pokemon ${idONombre}`, e);
  }
};

const buscarImgPokemon = async (url) => {
  try {
    const resp = await pokemonAPI.get(url);
    return resp.data.sprites.back_default;
  } catch (e) {
    throw new Error(`Error buscando imagen de ${url}`, e);
  }
};
