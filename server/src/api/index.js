import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import User from '../models/user';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	api.get('/users', async (req, res) => {
		const users = await User.find({})
		res.json(users)
	})

	api.get('/user/new/:email', async (req, res) => {
		User.createUser(req.params.email)
		res.send(`${req.params.email} user created.`)
	})

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
