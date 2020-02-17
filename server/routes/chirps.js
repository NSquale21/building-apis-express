const express = require('express');
const chirpStore = require('../../chirpstore');

const router = express.Router();

router.get('/:id?', (req, res) => {
	if (req.params.id) {
		const chirp = chirpStore.GetChirp(req.params.id);
		res.json(chirp);
	} else {
		const data = chirpStore.GetChirps();
		const chirps = Object.keys(data).map(key => {
			return {
				id : key,
				username: data[key].username,
				chirp: data[key].chirp
			}
		});
		chirps.pop();
		res.json(chirps);
	}
});

router.post('/', (req, res) => {
 chirpStore.CreateChirp(req.body);
 res.json('Chirp added!');
});

router.put('/:id', (req, res) => {
	console.log(res.body);
	chirpStore.UpdateChirp(req.params.id, req.body);
	res.json(`Chirp ${req.params.id} edited.`);
});

router.delete('/:id', (req, res) => {
	chirpStore.DeleteChirp(req.params.id);
	res.json(`Chirp ${req.params.id} deleted.`);
});

module.exports = router;