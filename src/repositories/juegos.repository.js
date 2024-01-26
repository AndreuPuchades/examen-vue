const server = import.meta.env.VITE_URL_API

export default class JuegosRepository {
  async getAllJuegos() {
    const response = await fetch(server + '/juegos')
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
  }

  async getJuegoById(idUser) {
    const response = await fetch(server + '/juegos/' + idUser)
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
  }

  async getJuegoByCategoria(idCategoria) {
    const response = await fetch(server + '/juegos?categoria=' + idCategoria)
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
  }

  async getJuegoByPlataforma(idPlataforma) {
    const response = await fetch(server + '/juegos?plataforma=' + idPlataforma)
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
  }

  async addJuego(juego) {
    const response = await fetch(server + '/juegos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(juego)
    })
    return response.json()
  }

  async removeJuego(idJuego) {
    const response = await fetch(server + '/juegos/' + idJuego, { method: 'DELETE' })
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
  }

  async changeJuego(juego) {
    const response = await fetch(server + `/juegos/${juego.id}`, {
      method: 'PUT',
      body: JSON.stringify(juego),
      headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
  }
}
