import { Component } from '@angular/core';
import { PaginationModel } from 'src/models/PaginationModel';
import { faInfo, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { TodoService } from 'src/services/todo.service';
import { lastValueFrom } from 'rxjs';
import { Todo } from 'src/models/Todos';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  todos: PaginationModel;
  jsonString: string;
  faXmark = faXmark;
  faPlus = faPlus;
  faInfo = faInfo;

  page: number = 1;
  pageSize: number = 2;

  isLoading: boolean = false;
  isCreatingTodo: boolean = false;
  totalCount: number = 0;

  todoDescription: string;

  constructor(private todoService: TodoService) {}

  async ngOnInit() {
    this.getTodos(true);
  }

  async getTodos(loading?: boolean) {
    this.isLoading = loading || false;
    this.todos = await lastValueFrom(
      this.todoService.getTodos(this.page, this.pageSize)
    );
    this.jsonString = JSON.stringify(this.todos, undefined, 2);
    this.totalCount = this.todos.totalCount;
    this.isLoading = false;
  }

  async paginate(event: any) {
    this.isLoading = true;
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    this.page = event.page + 1;
    this.pageSize = event.rows;
    await this.getTodos();
    this.isLoading = false;
  }

  async createTodo() {
    this.isCreatingTodo = true;
  }

  async saveTodo() {
    this.isLoading = true;
    const todo: Todo = new Todo();
    todo.description = this.todoDescription;

    const newTodo = await lastValueFrom(this.todoService.createTodo(todo));
    await this.getTodos();
    this.isCreatingTodo = false;
    this.isLoading = false;
  }

  async markTodoAsDone(todo: Todo) {
    this.isLoading = true;
    todo.isDone = !todo.isDone;
    const updatedTodo = await lastValueFrom(this.todoService.updateTodo(todo));
    // if (updatedTodo) {
    //   this.sharedService.showToast('success', 'Operation is a success');
    // } else {
    //   this.sharedService.showToast('error', 'Error');
    // }
    await this.getTodos();
    this.isLoading = false;
  }

  async removeTodo(todo: Todo) {
    this.isLoading = true;
    const removedTodo = await lastValueFrom(
      this.todoService.deleteTodo(todo._id)
    );
    // if (removedTodo) {
    //   this.sharedService.showToast('success', 'Operation is a success');
    // } else {
    //   this.sharedService.showToast('error', 'Error');
    // }
    await this.getTodos();
    this.isLoading = false;
  }

  closeAddTodo() {
    this.isCreatingTodo = false;
  }
}
