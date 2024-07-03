import axios from "axios";

export const backPokemonAPI = axios.create({
  baseURL: "http://localhost:8080/api",
});
