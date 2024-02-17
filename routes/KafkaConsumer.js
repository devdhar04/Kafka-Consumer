const kafka = require('kafka-node');
const { MongoClient } = require('mongodb');

// Kafka consumer configuration
const consumerOptions = {
  kafkaHost: 'localhost:9092',
  groupId: 'test-group',
  autoCommit: true,
  autoCommitIntervalMs: 5000,
  sessionTimeout: 15000,
  fetchMaxBytes: 10 * 1024 * 1024, // 10 MB
  protocol: ['roundrobin'],
  fromOffset: 'latest'
};

const consumer = new kafka.ConsumerGroup(consumerOptions, ['cpu-topic']);

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017';

// MongoDB database and collection names
const dbName = 'cpu-monitor';
const collectionName = 'cpu-data';

// Connect to MongoDB and create a connection pool
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Consume messages from Kafka
    consumer.on('message', async function (message) {
        try {
          // Parse JSON message
          const jsonData = JSON.parse(message.value.toString());
  
          // Create MongoDB document
          const document = {
            clientId: jsonData.clientId,
            cpuUsage: jsonData.cpuUsage,
            timestamp: new Date(),
            groupId: jsonData.groupId
          };
  
          // Save the document to MongoDB
          await collection.insertOne(document);
          console.log('Message saved to MongoDB:', document);
        } catch (error) {
          console.error('Error saving message to MongoDB:', error);
        }
      });

    // Handle errors
    consumer.on('error', function (err) {
      console.error('Kafka consumer error:', err);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });