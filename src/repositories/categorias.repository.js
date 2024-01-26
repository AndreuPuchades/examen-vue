const server = import.meta.env.VITE_URL_API

export default class CategoriasRepository {
  async getAllCategorias() {
    const response = await fetch(server + '/categorias')
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
  }

  async getCategoriaById(idCategoria) {
    const response = await fetch(server + '/categorias/' + idCategoria)
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
  }
}