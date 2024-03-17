export class Product {
    id? : string;
    creadon?: Date;
    name?: string;
    price?: number;
    description?: string;
    photoStr?: string;
    photoID? : string;
    genreID? : string;
    genre? : string;
    authorID? : string;
    authorName? : string;
  

    constructor();
    constructor(id?: string);
    constructor(id?: string, createdOn?: Date, price?: number, name?: string, description?: string, photoStr?: string, photoID?: string, genreID?: string, genre?: string, authorID?: string, authorName?: string) {
      this.id =id;
      this.creadon = createdOn;
      this.price = price;
      this.name = name;
      this.description = description;
      this.photoStr = photoID;
      this.photoID = photoID;
      this.genreID = genreID;
      this.genre = genre;
      this.authorID = authorID;
      this.authorName = authorName;
    }
  }
