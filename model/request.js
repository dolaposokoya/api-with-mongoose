config = require('../DB');

let createRequest = (criteria, decoded,callback) => {
    config.getDB().query('insert into requestblood set ? ',criteria, callback)
}

let getRequestById = (criteria, paramsdata, callback) => {
    let conditions = ''
    paramsdata.request_id ? conditions += ` request_id = '${paramsdata.request_id}'`: true
    config.getDB().query(`select * from requestblood where ${conditions}`, callback)
}

let updateRequest = (criteria, paramsdata, callback) => {
	let conditions = '';
	let setData = ''
	paramsdata.request_id ? conditions += ` request_id = ${paramsdata.request_id}` : true;
    Object.keys(dataToset).forEach(function (k) {
        setData += k + ' = "' + dataToset[k] + '",' 
    });
    setData = setData.substring(0, setData.length - 1);
    config.getDB().query(`update requestblood set ${setData} where ${conditions} `, callback)
}

module.exports = {
    getRequestById: getRequestById,
    createRequest : createRequest,
}

// date format DATE_FORMAT(date, "%W %M %e %Y")