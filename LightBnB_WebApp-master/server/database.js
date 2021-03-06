const db = require('./db');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return db.query(`
    SELECT * 
    FROM users
    WHERE email = $1
    `, [email.toLowerCase()])
  .then(res => (res.rows[0]))
  .catch(e => console.error(e.stack));

}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return db.query(`
  SELECT * 
  FROM users
  WHERE id = $1
  `, [id])
  .then(res => res.rows[0])
  .catch(e => console.error(e.stack))
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const values = [user.name, user.email, user.password];
  return db.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1,$2,$3) RETURNING *
  `, values)
  .then(res => res.rows[0])
  .catch(e => console.error(e.stack))
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const values = [guest_id, limit];
  return db.query(`
  SELECT reservations.*, properties.*, AVG(property_reviews.rating) as average_rating
  FROM reservations 
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON property_reviews.id = reservations.property_id
  WHERE reservations.guest_id = $1 AND end_date > now()::date
  GROUP BY reservations.id, properties.id
  ORDER BY start_date
  LIMIT $2
  `, values)
  .then(res =>res.rows)
  .catch(e => console.error(e.stack));
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function(options, limit = 10) {
  const queryParams = [];

  let queryString = ` SELECT properties.*, AVG(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON (properties.id = property_id)
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(owner_id);
    queryString += `AND owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(options.minimum_price_per_night, options.maximum_price_per_night);
    queryString += ` AND cost_per_night BETWEEN $${queryParams.length-1} AND $${queryParams.length}`
  }
  
  queryString += `GROUP BY properties.id `;

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `HAVING AVG(property_reviews.rating) >= $${queryParams.length} `;
  }
  
  queryParams.push(limit);
  queryString += `ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  
  return db.query(queryString, queryParams)
  .then(res => res.rows)
  .catch(e => console.error(e.stack));
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const keys = Object.keys(property);
  let keyString = keys.join(',');
  let placeholder = [];
  for (let i = 0; i < keys.length; i++) {
    placeholder.push(`$${i+1}`);
  }
  placeholder = placeholder.join(',');
  const values = Object.values(property);

  return db.query(`
  INSERT INTO properties (${keyString}) 
  VALUES(${placeholder})
  RETURNING *;
  `, values
  )
  .then(res => res.rows[0])
  .catch(e => console.error(e.stack));
}
exports.addProperty = addProperty;
