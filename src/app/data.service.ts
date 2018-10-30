import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private MongoCon = require('mongodb').MongoClient;
  private Database;

  constructor() {
    this.MongoCon.connect("mongodb://localhost:27017/red", function (err, db) {
      if (err) throw err;
      this.Database = db.db("red");
      console.log("Conection successful");
    });
  }

  public ClosemongoData(){
    this.MongoCon.db.close();
  }

  makeQuery(query: string){
    return this.Database.collection('usuarios').findOne({query});
  }

}
