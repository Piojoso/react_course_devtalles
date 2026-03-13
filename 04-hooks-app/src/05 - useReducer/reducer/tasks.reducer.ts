interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  todos: Todo[];
  lenght: number;
  completed: number;
  pending: number;
}

export type TaskAction =
  | { type: "ADD_TODO"; payload: { todo_text: string } }
  | { type: "TOGGLE_TODO"; payload: { id: number } }
  | { type: "REMOVE_TODO"; payload: { id: number } };

export const taskReducer = (
  state: TaskState,
  action: TaskAction,
): TaskState => {
  switch (action.type) {
    case "ADD_TODO": {
      const { todo_text } = action.payload;

      const newTodo: Todo = {
        id: Date.now(),
        text: todo_text.trim(),
        completed: false,
      };

      const newTodoList = [...state.todos, newTodo];

      return {
        ...state,
        todos: newTodoList,
        lenght: newTodoList.length,
        pending: state.pending + 1,
      };
    }

    case "TOGGLE_TODO": {
      const { id } = action.payload;

      const newTodoList = state.todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      });

      const completed = newTodoList.filter((t) => t.completed).length;
      const pending = newTodoList.length - completed;

      return { ...state, todos: newTodoList, completed, pending };
    }

    case "REMOVE_TODO": {
      const { id } = action.payload;

      const newTodoList = state.todos.filter((todo) => todo.id !== id);

      const completed = newTodoList.filter((t) => t.completed).length;
      const pending = newTodoList.length - completed;

      return {
        ...state,
        todos: newTodoList,
        lenght: newTodoList.length,
        completed,
        pending,
      };
    }

    default:
      return state;
  }
};
