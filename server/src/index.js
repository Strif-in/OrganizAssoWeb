const cors = require('cors');
const api = require('./api');
const express = require('express');
const app = express();
const {MongoClient} = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

const connect = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

(async () => {
    try {
        await connect();
        
        const db = client.db('mydatabase');
        const collection = db.collection('mycollection');
        
        await collection.insertOne({name: 'test'})
            .then(() => console.log('Document inserted'))
            .catch(err => console.error('Error inserting document:', err));
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
        console.log('MongoDB connection closed');
    }
})();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api', api);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);