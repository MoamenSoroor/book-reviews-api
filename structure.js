const { json } = require("body-parser")

class AppStructure {
  constructor(jsonfile) {

    this.struct = jsonfile;
  }




}


function test(params) {
  const strucure = {
    contorllers: {
      con1: "con1",
      con2: { nested: "nestedCon2.js" }
    },
    data: {
      connection: "connect.js",
      database: { dbaccess: "dbaccess.js", dbconfig: "dbconfig.js" }
    }
  }
}