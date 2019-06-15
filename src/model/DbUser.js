module.exports = {
  getUser: () => {
    return `SELECT * FROM runoob_tbl`
  },
  addUser: (parmas) => {
    return `INSERT INTO runoob_tbl ( runoob_title, runoob_author ) VALUES
             ( '${parmas.name}', '${parmas.tasks}' ),
             ( '${parmas.name}', '${parmas.tasks}' )
           `
  },
  updateUser: (parmas) => {
    // let
    return `UPDATE runoob_tbl
            SET runoob_title = CASE runoob_id
                          WHEN 1 THEN 'JSON'
                          WHEN 2 THEN 'NODE'
                          WHEN 3 THEN 'VUE'
                          END
            WHERE runoob_id IN (1,2,3)`
  }
}


