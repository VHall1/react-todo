import * as React from "react";
import classNames from "classnames";
import { Form } from "./form";
import { BsFillTrashFill, BsPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "@/store/hooks";
import { addTask, completeTask, deleteTask } from "@/store/tasksReducer";

export function App() {
  const [newTaskDialoOpen, setNewTaskDialogOpen] = React.useState(false);
  const { tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleSubmit = (item: string) => dispatch(addTask(item));
  const handleCheck = (index: number) => dispatch(completeTask(index));
  const handleDelete = (index: number) => dispatch(deleteTask(index));

  return (
    <div className="max-w-lg mx-auto px-2 max-md:px-4 flex flex-col overflow-hidden h-screen">
      <h1 className="my-4 text-white text-2xl">Todo List</h1>

      <ul className="flex flex-col gap-2 mt-4 overflow-auto">
        {tasks.map((item, index) => (
          <li
            key={`todo-list-item-${index}`}
            className="flex items-center p-4 even:bg-gray-600 odd:bg-gray-700 rounded-lg"
          >
            <input
              type="checkbox"
              id={`todo-item-${index}`}
              checked={item.completed}
              onChange={() => handleCheck(index)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
            />
            <label
              htmlFor={`todo-item-${index}`}
              className={classNames(
                "flex-1 ml-2 font-medium text-gray-900 dark:text-gray-300 cursor-pointer",
                {
                  "line-through": item.completed,
                }
              )}
            >
              {item.text}
            </label>

            <button
              onClick={() => handleDelete(index)}
              className="ml-2 text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500"
            >
              <BsFillTrashFill />
            </button>
          </li>
        ))}
      </ul>

      <Form
        handleSubmit={handleSubmit}
        open={newTaskDialoOpen}
        onClose={() => setNewTaskDialogOpen(false)}
      />
      <button
        onClick={() => setNewTaskDialogOpen(true)}
        className="absolute right-4 bottom-4  text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
      >
        <BsPlus />
      </button>
    </div>
  );
}
