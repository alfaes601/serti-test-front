import { backPokemonAPI } from "../api/backPokemonAPI";

const getToken = () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("Token no existente: ");
  }
  console.log(token);
  return token;
};
export const login = async ({ user, password }) => {
  try {
    const auth = await backPokemonAPI.post("/auth/login", {
      username: user,
      password: password,
    });
    console.log(auth.data.token);
    if (auth.data.token) {
      sessionStorage.setItem("token", auth.data.token);
      return true;
    }
    return false;
  } catch (e) {
    throw new Error("ERROR en el login: " + e.message);
  }
};

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
    const token = getToken();
    const resp = await backPokemonAPI.post("/api/registrar/pokemon", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (resp.status == "201") console.log("Guarado correctamente en el log");
    return resp;
  } catch (e) {
    throw new Error("Error al registrar el dato", e);
  }
};

export const buscarLog = async () => {
  try {
    const token = getToken();
    const resp = await backPokemonAPI.get("/api/buscar/pokemons", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp;
  } catch (e) {
    throw new Error("Error buscando log de pokemon", e.message);
  }
};
