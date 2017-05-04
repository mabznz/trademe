var db = require("../connectMysql");
var util = require('util');

exports.index = function(req, res) {
  db.getConnection(function(err, connection) {
    var select =
      'SELECT \
        localities.description AS description, \
        count(*) AS num \
      FROM \
        residential \
        INNER JOIN districts ON residential.district_id = districts.id \
        INNER JOIN localities ON districts.locality_id = localities.id \
      GROUP BY localities.description;';

    connection.query(select, function(error, rows, fields) {
      if (error) {
        console.error(error);
      }
      res.render('index', { title: 'Trademe Residential Property Graphs', items: rows });
    });
    connection.release();;
  });
  //console.log('Res:' + util.inspect(res, { showHidden: true, depth: 2 }));

};

exports.listing_list = function(req, res, next) {
  db.getConnection(function(err, connection) {
    var select =
      'SELECT \
        localities.description AS description, \
        count(*) AS num \
      FROM \
        residential \
        INNER JOIN districts ON residential.district_id = districts.id \
        INNER JOIN localities ON districts.locality_id = localities.id \
      GROUP BY localities.description;';

    connection.query(select, function(error, rows, fields) {
      if (error) {
        console.error(error);
      }
      res.json(rows);
    });
    connection.release();;
  });
  //console.log('Res:' + util.inspect(res, { showHidden: true, depth: 2 }));
};
