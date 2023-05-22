import { Recipe } from "../model/recipe";

const BASE_API_URL = "http://localhost:8000/recipes";

interface Api {
  findAll(): Promise<Recipe[]>;
  findById(id: string): Promise<Recipe>;
  create(recipe: Recipe): Promise<Recipe>;
}

class ApiClient implements Api {
  findAll(): Promise<Recipe[]> {
    return this.handleRequest<Recipe[]>(BASE_API_URL);
  }

  findById(id: string): Promise<Recipe> {
    return this.handleRequest<Recipe>(`${BASE_API_URL}/${id}`);
  }

  create(recipe: Recipe): Promise<Recipe> {
    return this.handleRequest(BASE_API_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(recipe),
    });
  }
  
  // update(user: User): User {
  //   throw new Error("Method not implemented.");
  // }

  // deleteById(id: number): void {
  //   throw new Error("Method not implemented.");
  // }

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

export const RecipeServer = new ApiClient();
