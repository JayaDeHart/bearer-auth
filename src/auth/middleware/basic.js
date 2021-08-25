'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js')

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return _authError(); }

  let info = req.headers.authorization.split(" ")[1];
  let basic = base64.decode(info);
  let username = basic.split(":")[0];
  let password = basic.split(":")[1];




  try {
    req.user = await users.authenticateBasic(username, password)
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

}

