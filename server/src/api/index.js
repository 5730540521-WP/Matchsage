import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import User from '../models/user';
import AuthService from '../services/auth'

import _ from 'lodash'

const filteredUserKeys = [ 'email', 'first_name', 'last_name' ]

export default ({ config, db }) => {
	let api = Router();

	api.post('/signup', async (req, res) => {
		try {
			const body = req.body
			const newUser = await AuthService.signUp(body)
			res.json(_.pick(newUser, filteredUserKeys))

		} catch (error) {
			res.status(error.status).send(error.message)
		}
	})

	api.post('/auth', async (req, res) => {
		try {
			const { email, password } = req.body
			const user = await AuthService.authenticateUser({ email, password })
			res.json(user)
		} catch (error) {
			res.status(error.status).send(error.messague)
		}
	})

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// users
	api.get('/users', async (req, res) => {
		const users = await User.find({})
		res.json(_.map(users, user => _.pick(user, filteredUserKeys)))
	})

	api.post('/user/new', async (req, res) => {
		const body = req.body
		const user = await User.createUser(body)
		res.send(`${user.email} user created.`)
	})

	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
