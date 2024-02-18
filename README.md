
 # Hive Assignment

Client and Server High level Architecture Document .

## Table of Contents

- [Introduction](#introduction)
- [Goals and Requirements](#goals-and-requirements)
- [Architecture Overview](#architecture-overview)
- [Client Component](#client-component)
- [Server Component](#server-component)
- [License](#license)

## Introduction

FilesFromYou is transforming the file sharing business by making it super easy to
share files between your friends and family. You share files by installing a small client
on your home PC. In one of the latest releases it has turned out that some clients
have very high CPU usage, making the FilesFromYou service unusable.
In order to find out what is going wrong, we want you to develop a component to
measure CPU usage at each client and report that in to a server. Also, we don’t want
any data loss—all the measurements should eventually reach the
server. The collected data should be able to be processed and queryable in a way
that it’s easy to identify which client or group of clients are having a problem with
CPU usage.

 

## Goals and Requirements

- All the measurements should eventually reach the server.
- The collected data should be able to be queryable .
- Scalability of implementation .

## Architecture Overview

I have choosen Java for Develping the Client side with Apache Kafka.
### Why I have choose kafka
- **Scalability**: Kafka is designed to scale horizontally, allowing you to handle large volumes of data and high throughput. Producers can write data to Kafka topics distributed across multiple brokers, enabling linear scalability as you add more hardware.
- **High Throughput**: Kafka is optimized for high throughput and low latency, making it suitable for real-time data streaming applications. Producers can efficiently write large volumes of data to Kafka topics, and consumers can process data in parallel to achieve low-latency processing.
- **Fault Tolerance**: Kafka provides built-in fault tolerance through data replication and partitioning. Producers can write data to Kafka topics with confidence, knowing that data is replicated across multiple brokers for durability and availability. In case of broker failures, Kafka can automatically recover and continue processing data without data loss.
- **Reliability**: Kafka guarantees message delivery semantics, ensuring that messages written by producers are reliably delivered to consumers.
- **Binary Protocol**: Apache Kafka uses Binary protocols, that consume less bandwidth, are more efficiently parsed and are less error-prone than the textual protocols used by HTTP/1.1
<img width="680" alt="Screenshot 2024-02-17 at 23 25 41" src="https://github.com/devdhar04/Hive-Assignment-Server/assets/27695782/f8b23394-57f3-4f63-97f8-2bf190b9321b">

I have Developed Client in Java that will collect cpuUsage after every 6 Seconds and send to Nodejs server using apache Kafka .
Nodejs server save this data in MongoDb Database . Apache kafka will make sure there will be no loss of data .

 
## Client Component
### Technologies Used 
- Java
- Apache Kafka
- Gson

  <img width="729" alt="Screenshot 2024-02-17 at 23 24 42" src="https://github.com/devdhar04/Hive-Assignment-Server/assets/27695782/5ceab221-20a5-4bfe-aac2-8b73d90d7f3f">

Run Main ```bash Client.java``` located in ```bash package com.hive.app.controller``` .
**Client** will initiate a Thread that will collect **cpuUsage in every 6 seconds** and send to the **Kafka Consumer** .
Kafka client will ensure there will be no data loss in case and every data will be consumed by Kafaka Consumer in server side .  


## Server Component

### Technologies Used 
- Node.js
- Apache Kafka
- Mongo Db

I have used **NodeJs** for server side design with **MongoDb** that gives 
- **High Performance**
- **High Scalbiiity**
- **High Availability and Fault Tolerance**
- **Rich Query Language**


### Installation
```bash
npm install mongodb
npm install kafkajs
npm install kafka-node
```

### Run Server
```bash
node routes/KafkaConsumer.js  
```
### Database Schema 

```bash
{
  clientId: { type: String, required: true },
  groupId:  {type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  cpuUsage: { type: Number, required: true },
}
```
I have used **clientId** as an Identifier for a particular **client** or System where as **groupId** is to identify Group of clients or an Organization .
we can you find query in mongoDb to filter the resultes on basis of thrashhold e.g

```bash
const cursor = db.collection('cpu-data').find({
  groupId: 'groupId',
  cpuUsage: { $gte: 30 }
});
```

Above query can return all the data in database where clients have groupId as **groupId** and **cpuUsage** is greather than **30** .

## License






