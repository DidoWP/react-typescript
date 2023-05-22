import { v4 as uuidv4 } from "uuid";

export class User {
  constructor(
    public id = uuidv4(),
    public name: string,
    public username: string,
    public password: string,
    public sex: string,
    public role: string,
    public picture: string,
    public description: string,
    public status: string,
    public registerDate = new Date(),
    public lastModification = new Date()
  ) { }
}

// export class UserCreateDto implements Omit<User, "id" | "registerDate" | "lastModification">{
//   constructor(
//     public name: string,
//     public username: string,
//     public password: string,
//     public sex: string,
//     public role: string,
//     public picture: string,
//     public description: string,
//     public status: string,
//   ) { }
// }
