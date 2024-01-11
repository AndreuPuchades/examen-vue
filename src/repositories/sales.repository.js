const server = import.meta.env.VITE_URL_API

export default class SalesRepository {
  async addSale(sale) {
    const response = await fetch(server + '/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sale)
    })
    return await response.json();
  }

  async removeSaleByIdBook(idBook) {
    const response = await fetch(server + '/sales/' + idBook, { method: 'DELETE' });
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`;
    }
    return await response.json();
  }

  async getSalesByIdUser(idUser) {
    const response = await fetch(server + '/sales?idUser=' + idUser);
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`;
    }
    return await response.json();
  }

  async getSalesByIdBook(idBook) {
    const response = await fetch(server + '/sales?idBook=' + idBook);
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`;
    }
    return await response.json();
  }
}