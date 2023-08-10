import * as React from "react";
import classNames from "classnames";

export function App() {
  const [items, setItems] = React.useState<
    { text: string; completed: boolean }[]
  >([]);
  const [newItem, setNewItem] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // This works, but it will cause performance issues if this list gets too long (which is unlikely)
    setItems((oldItems) => [...oldItems, { text: newItem, completed: false }]);
    setNewItem("");
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

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="my-4 text-white text-2xl">Todo List</h1>

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Add new item
        </label>
        <input
          id="input"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        <button
          type="submit"
          className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          submit
        </button>
      </form>

      <ul className="flex flex-col gap-2 mt-4">
        {items.map((item, index) => (
          <li className="flex items-center p-4 even:bg-gray-600 odd:bg-gray-700 rounded-lg">
            <input
              type="checkbox"
              id={`todo-item-${index}`}
              checked={item.completed}
              onChange={() => handleCheck(index)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor={`todo-item-${index}`}
              className={classNames(
                "flex-1 ml-2 font-medium text-gray-900 dark:text-gray-300",
                {
                  "line-through": item.completed,
                }
              )}
            >
              {item.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
