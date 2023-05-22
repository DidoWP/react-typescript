import { v4 as uuidv4 } from 'uuid';

export class Recipe {
  constructor(
    public id = uuidv4(),
    public userId: string,
    public title: string,
    public briefDescription: string,
    public time: string, 
    public products: string, 
    public picture: string,
    public description: string,
    public tags: string,
    public registerDate = new Date(),
    public lastModification = new Date()
  ) { }
}

// export class Product{
//   constructor(
//     public name: string
//   ) { }
// }