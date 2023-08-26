import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { PaginationModel } from 'src/models/PaginationModel';
import { Todo } from 'src/models/Todos';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getTodos(page: number, pageSize: number): Observable<PaginationModel> {
    const url = this.baseUrl + '/todos';

    const params = {
      page: page.toString(),
      pageSize: pageSize.toString(),
    };
    return this.http.get(url, {
      params: params,
    }) as Observable<PaginationModel>;
  }

  createTodo(todo: Todo): Observable<Todo> {
    const url = this.baseUrl + '/todos';
    return this.http.post(url, todo) as Observable<Todo>;
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const url = this.baseUrl + '/todos/' + todo._id;
    return this.http.put(url, todo) as Observable<Todo>;
  }

  deleteTodo(id: string): Observable<Todo> {
    const url = this.baseUrl + '/todos/' + id;
    return this.http.delete(url) as Observable<Todo>;
  }
}
