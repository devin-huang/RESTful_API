module.exports = {
  /**
   * parmas: {
      "name": "devin",
      "password": "123"
    }
   * */
  getUser: (filter) => {
    return `SELECT * FROM user WHERE name = '${filter.name}' AND password = '${filter.password}'`
  }
}