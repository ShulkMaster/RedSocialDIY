import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MongoClient, Db, Server } from 'mongodb';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public db: Db;
  private cliente: MongoClient;
  private url: string= 'mongodb://localhost:27017';

  constructor(private http: HttpClient) {
    this.cliente = require('mongodb').MongoClient.connect(this.url);
  }

  someservice() {
    return this.http.get('https://reqres.in/api/users');
  }

  public async connect() {
    this.db = this.cliente.db('red');
    console.log("Connected to db");
    return this.db;
  }

}

