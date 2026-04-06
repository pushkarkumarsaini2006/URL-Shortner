// lib/mongodb.js

import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}

let client
let clientPromise

function getClientPromise() {
  if (!uri || !/^mongodb(\+srv)?:\/\//i.test(uri)) {
    throw new Error('Please add a valid Mongo URI to .env.local')
  }

  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect()
    }

    return global._mongoClientPromise
  }

  // In production mode, it's best to not use a global variable.
  if (!clientPromise) {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }

  return clientPromise
}

export default getClientPromise
