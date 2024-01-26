const server = import.meta.env.VITE_URL_API

export default class PlataformasRepository {
  async getAllPlataforma() {
    const response = await fetch(server + '/plataformas')
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
  }

  async getPlataformaById(idPlataforma) {
    const response = await fetch(server + '/plataformas/' + idPlataforma)
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
  }
}
