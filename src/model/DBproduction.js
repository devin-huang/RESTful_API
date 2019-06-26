module.exports = {
  getData: () => {
    return `SELECT * FROM production`
  },
  /**
   * parmas: [
       {"type": "ping", "description": "test1"},
       {"type": "gun", "description": "test2"}
     ]
   * */
  addData: (parmas) => {
    try {
      let filter = ''
      let keys = Object.keys(parmas[0])
      parmas.forEach( (e, i) => {
        let point = i+1 !== parmas.length ? ',' : ''
        filter += `( '${e.type}', '${e.description}' )${point}`
      })
      return `INSERT INTO production ( ${keys.join(',')} ) VALUES ${filter};`
    } catch (e) {
      console.log(e)
    }
    
  },
  /**
   * parmas: [
     {"type": "ping", "id": "1"},
     {"type": "gun", "id": "2"}
   ]
   * */
  updateData: (parmas) => {
    let filter = ''
    let keys = parmas.map(e => e.id).join(',')
    parmas.forEach(e => {
      filter += `WHEN ${e.id} THEN '${e.type}'\n`
    })
    return `UPDATE production
            SET type = CASE id
                          ${filter}
                          END
            WHERE id IN (${keys});`
  },
  /**
   * parmas: delList: [1, 2, 3]
   * */
  deleteData: (parmas) => {
    let delList = parmas.delList.join(',')
    return `DELETE FROM production WHERE id IN (${delList});`
  }
}


