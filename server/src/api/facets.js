const resource = require('resource-router-middleware')
const facets = require('../models/facets')

module.exports = ({ config, db }) => resource({

  id: 'facet',

  load (req, id, callback) {
    let facet = facets.find(facet => facet.id === id),
      error = facet ? null : 'Not found'
    callback(error, facet)
  },

/** GET / - List all entities */
  index ({ params }, res) {
    res.json(facets)
  },

	/** POST / - Create a new entity */
  create ({ body }, res) {
    body.id = facets.length.toString(36)
    facets.push(body)
    res.json(body)
  },

	/** GET /:id - Return a given entity */
  read ({ facet }, res) {
    res.json(facet)
  },

	/** PUT /:id - Update a given entity */
  update ({ facet, body }, res) {
    for (let key in body) {
      if (key !== 'id') {
        facet[key] = body[key]
      }
    }
    res.sendStatus(204)
  },

	/** DELETE /:id - Delete a given entity */
  delete ({ facet }, res) {
    facets.splice(facets.indexOf(facet), 1)
    res.sendStatus(204)
  }
})
