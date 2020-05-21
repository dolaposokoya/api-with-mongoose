var jwt = require('jsonwebtoken');
config = require('../DB');
module.exports = {
  verify: (token) => {
    try{
        let token1 = token.split(' ')[1];
        if(token1 == '')
        {
            return false;
        }
        else
        {
            return jwt.verify(token1, 'shhhhh');
        }
    }catch (err){
      return false;
    }
  }
}