
const express = require('express');
const router = express.Router();
const CPUData = require('../schema/Schema');

router.post('/cpu-data', async (req, res) => {
  try {
    console.error('Request body:', req.body);
    const { clientId, cpuUsage , groupId} = req.body;
    const cpuData = new CPUData({ clientId, cpuUsage ,groupId});
    await cpuData.save();
    res.status(201).send('CPU data received successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
