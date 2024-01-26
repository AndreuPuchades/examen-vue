const server = import.meta.env.VITE_URL_API

export default class ModulesRepository {
  async getAllModules() {
    const response = await fetch(server + '/modules')
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
  }

  async getModuleById(idModule) {
    const response = await fetch(server + '/modules/' + idModule)
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
  }

  async addModule(module) {
    const response = await fetch(server + '/modules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(module)
    })
    return response.json()
  }

  async removeModule(idModule) {
    const response = await fetch(server + '/modules/' + idModule, { method: 'DELETE' })
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
  }

  async changeModule(module) {
    const response = await fetch(server + `/modules/${module.id}`, {
      method: 'PUT',
      body: JSON.stringify(module),
      headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
  }
}
