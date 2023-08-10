import * as React from "react";
import { BsXLg } from "react-icons/bs";

export function Form({
  open,
  onClose,
  handleSubmit,
}: {
  open: boolean;
  onClose: () => void;
  handleSubmit: (item: string) => void;
}) {
  const [newItem, setNewItem] = React.useState("");
  const dialogEl = React.useRef<HTMLDialogElement>(null);

  const handleLocalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(newItem);
    setNewItem("");
    onClose();
  };

  React.useEffect(() => {
    if (!dialogEl.current) return;

    if (open) {
      dialogEl.current.showModal();
    } else {
      dialogEl.current.close();
    }
  }, [open]);

  return (
    <dialog
      className="backdrop:bg-gray-900 backdrop:opacity-50 bg-transparent w-full"
      onClose={onClose}
      ref={dialogEl}
    >
      <form
        onSubmit={handleLocalSubmit}
        method="dialog"
        className="bg-slate-800 max-w-lg mx-auto rounded"
      >
        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Add new task
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
          >
            <BsXLg />
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
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
          </div>
        </div>

        <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add task
          </button>
        </div>
      </form>
    </dialog>
  );
}
