db.users.insert({
  website:"vehicle.co.ke",
  username:"ezekiel@kenbright.co.ke",
  password:"pass",
  domain:{
          insurers:"all",
          brokers:"all"
          },
  isAdmin:"yes",
  isSupervisor:"yes",
  creationDate: ISODate("2011-12-24T05:00:00Z"),
  isActive:1,
  lastloginDate: ISODate("2016-02-01T05:00:00Z")

})

db.users.insert({
  website:"vehicle.co.ke",
  username:"dev@vehicle.co.ke",
  password:"12dev!2d90ppg66Q11WWSP1",
  domain:{
          insurers:"all",
          brokers:"all"
          },
  isAdmin:"no",
  isSupervisor:"yes",
  creationDate: ISODate("2011-12-24T05:00:00Z"),
  isActive:1,
  lastloginDate: ISODate("2016-02-01T05:00:00Z")

})

db.users.insert({
  website:"vehicle.co.ke",
  username:"vehicle@jubileekenya.com",
  password:"p@ssw0rd",
  domain:{
          insurers:"jubileekenya",
          brokers:"none"
          },
  isAdmin:"no",
  isSupervisor:"no",
  creationDate: ISODate("2011-12-24T05:00:00Z"),
  isActive:1,
  lastloginDate: ISODate("2016-02-01T05:00:00Z")

})
