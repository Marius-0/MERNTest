import { Schema, Document, Model, Connection, Mongoose, HookNextFunction } from 'mongoose';
import asyncHandler from 'express-async-handler'
import User from '../models/usersModel.js'

import express from 'express'


export interface IWrite<T> {
  create(item: T): Promise<boolean>;
  update(id: string, item: T): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}

export interface IRead<T> {
  find(item: T): Promise<T[]>;
  findOne(id: string): Promise<T>;
}
//import { IWrite } from '../interfaces/IWrite';
//import { IRead } from '../interfaces/IRead';

import { MongoClient, Db, Collection, InsertOneWriteOpResult, UpdateWriteOpResult, DeleteWriteOpResultObject, 
  ResultCallbackObject, CollectionResultCallbackObject } from 'mongodb';

import mongoose from 'mongoose';

// that class only can be extended
export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  //creating a property to use your code in all instances 
  // that extends your base repository and reuse on methods of class
  public readonly _collection: Collection;

  //we created constructor with arguments to manipulate mongodb operations
  constructor(db: Db, collectionName: string) {
    this._collection = db.collection(collectionName);
  }

  // we add to method, the async keyword to manipulate the insert result
  // of method.
  async create(item: T): Promise<boolean> {
    const result: InsertOneWriteOpResult<any> = await this._collection.insertOne(item);
    // after the insert operations, we returns only ok property (that haves a 1 or 0 results)
    // and we convert to boolean result (0 false, 1 true)
    return !!result.result.ok;
  }

  async update(id: string, item: T): Promise<boolean> {
    const result: UpdateWriteOpResult = await this._collection.updateOne({ _id: id }, item);
    // after the insert operations, we returns only ok property (that haves a 1 or 0 results)
    // and we convert to boolean result (0 false, 1 true)
    return !!result.result.ok;
  }
  async delete(id: string): Promise<boolean> {
    const result: DeleteWriteOpResultObject = await this._collection.deleteOne({ _id: id });
    return !!result.result.ok;
  }

  find = asyncHandler(async(req, res) => {
    const items = await this._collection.find({})
    res.json(items)
  })
/*
  async find(item: T): Promise<T[]> {
    const result: CollectionResultCallback = await this._collection.find({});
    return result;
  }
*/
  
  async findOne(id: string): Promise<T> {
    const result: ResultCallback = await this._collection.findOne({ _id: id });
    return result;
  }
}