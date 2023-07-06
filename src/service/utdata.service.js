const connection = require('../app/database');


class UtdataService {
  async create(title, content, source_name, source_link, type, uploader, uploader_id, author, rate) {
    const statement = `INSERT INTO utdata (title, content, source_name, source_link, type, uploader, uploader_id, author, rate) VALUES (?, ?,?,?,?,?,?,?,?);`;
    const [result] = await connection.execute(statement, [title, content, source_name, source_link, type, uploader, uploader_id, author, rate]);
    return result;
  }
  async getUtDataList(offset, size, type) {
    let statement = `
              SELECT 
                *
              FROM utdata
            `;

    const params = [];

    if (type) {
      statement += ` WHERE type = ?`;
      params.push(type);
    }

    statement += ` LIMIT ?, ?`;
    params.push(offset, size);
    const [result] = await connection.execute(statement, params);
    return result;
  }
}

module.exports = new UtdataService();

