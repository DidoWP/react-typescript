import { User } from "../model/user";

const BASE_API_URL = "http://localhost:8000/users";

interface Api {
  findAll(): Promise<User[]>;
  findById(id: string | null): Promise<User> ;
  findByUsername(username: string): Promise<User[]>;
  create(user: User): Promise<User>;
//   update(user: User): User;
//   deleteById(id: number): void;
}

class ApiClient implements Api {
  findAll(): Promise<User[]> {
    return this.handleRequest<User[]>(BASE_API_URL);
  }

  findById(id: string | null): Promise<User> {
    return this.handleRequest<User>(`${BASE_API_URL}/${id}`);
  }

  findByUsername(username: string): Promise<User[]> {
    return this.handleRequest(`${BASE_API_URL}?username=${username}`);
  }

  create(user: User): Promise<User> {
    return this.handleRequest(BASE_API_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });
  }
  
//   update(user: User): User {
//     throw new Error("Method not implemented.");
//   }

//   deleteById(id: number): void {
//     throw new Error("Method not implemented.");
//   }

  private async handleRequest<D>(url: string, options?: RequestInit) {
    try {
      const resp = await fetch(url, options);
      if (resp.status >= 400) {
        return Promise.reject(resp.body);
      }
      return resp.json() as D;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export const UserServer = new ApiClient();
