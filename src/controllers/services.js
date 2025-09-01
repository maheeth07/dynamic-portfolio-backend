const Service = require('../models/Service');

const getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const addService = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newService = new Service({
            name,
            description
        });
        const service = await newService.save();
        res.status(201).json(service);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getServices,
    addService
};