const server = import.meta.env.VITE_URL_API

export default class BooksRepository {
  async getAllBooks() {
    const response = await fetch(server + '/books')
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
  }

  async getBookFromModuleAndUser(idUser, idModule) {
    const response = await fetch(server + `/books?idUser=${idUser}&idModule=${idModule}`)
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const data = await response.json()
    return data.length
  }

  async getBookById(idBook) {
    const response = await fetch(server + '/books/' + idBook)
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
  }

  async addBook(book) {
    const response = await fetch(server + '/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    })
    return response.json()
  }

  async removeBook(idBook) {
    const response = await fetch(server + '/books/' + idBook, { method: 'DELETE' })
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
  }

  async changeBook(book) {
    const response = await fetch(server + '/books/' + book.id, {
      method: 'PUT',
      body: JSON.stringify(book),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
  }
}
