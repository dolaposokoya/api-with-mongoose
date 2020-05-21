config = require('../DB');

let createReserve = (criteria, decoded,callback) => {
    config.getDB().query('insert into reservation set ? ',criteria, callback)
}

let getReserveById = (criteria, paramsdata, callback) => {
    let conditions = ''
    paramsdata.request_id ? conditions += ` reserve_id = '${paramsdata.request_id}'`: true
    config.getDB().query(`select * from reservation where ${conditions}`, callback)
}

let updateReserve = (criteria, paramsdata, callback) => {
	let conditions = '';
	let setData = ''
	paramsdata.request_id ? conditions += ` reserve_id = ${paramsdata.request_id}` : true;
    Object.keys(dataToset).forEach(function (k) {
        setData += k + ' = "' + dataToset[k] + '",' 
    });
    setData = setData.substring(0, setData.length - 1);
    config.getDB().query(`update reservation set ${setData} where ${conditions} `, callback)
}

module.exports = {
    getReserveById: getReserveById,
    createReserve : createReserve,
}

// date format DATE_FORMAT(date, "%W %M %e %Y")