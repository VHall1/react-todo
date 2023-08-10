import * as React from "react";
import classNames from "classnames";
import { Form } from "./form";
import { BsFillTrashFill } from "react-icons/bs";

export function App() {
  const [items, setItems] = React.useState<
    { text: string; completed: boolean }[]
  >([]);

  const handleSubmit = (item: string) => {
    // This works, but it will cause performance issues if this list gets too long (which is unlikely)
    setItems((oldItems) => [...oldItems, { text: item, completed: false }]);
  };

  const handleCheck = (index: number) => {
    setItems((oldItems) =>
      oldItems.map((item, _index) => {
        if (_index === index) {
          return {
            ...item,
            completed: !item.completed,
          };
        }

        return item;
      })
    );
  };

  const handleDelete = (index: number) => {
    setItems((oldItems) => oldItems.filter((_, _index) => index !== _index));
  };

  return (
    <div className="max-w-lg mx-auto px-2 max-md:px-4 flex flex-col overflow-hidden h-screen">
      <h1 className="my-4 text-white text-2xl">Todo List</h1>

      <Form handleSubmit={handleSubmit} />

      <ul className="flex flex-col gap-2 mt-4 overflow-auto">
        {items.map((item, index) => (
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
    </div>
  );
}
