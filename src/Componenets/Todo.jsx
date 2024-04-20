import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  removeTodo,
  editTodo,
  completeTodo,
} from "../Actions/action";

const Todo = () => {
  const [inputData, setInput] = useState("");
  const [lrmode, setMode] = useState("light");
  const [filter, setFilter] = useState("all");
  const list = useSelector((state) => state.todoReducers.list);
  const dispatch = useDispatch();
  const itemsLeft = list.filter((item) => !item.completed).length;
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  const handleFilterChange = (type) => {
    setFilter(type);
  };

  const filteredList = () => {
    switch (filter) {
      case "all":
        return list;
      case "active":
        return list.filter((item) => !item.completed);
      case "completed":
        return list.filter((item) => item.completed);
      default:
        return list;
    }
  };
  return (
    <div
      className={`w-[100%] h-[100%] mx-auto mt-[120px] p-[40px] ${
        lrmode === "light" ? "bg-sky-900 text-black" : "bg-gray-900 text-white"
      }`}
    >
      <div className="mb-[20px] flex justify-between">
        <h1 className="text-[34px] font-semibold">TO DO App</h1>
        <button onClick={toggleMode}>
          <i
            className={`bx ${
              lrmode === "light" ? "bx-moon" : "bxs-moon"
            } text-[42px]`}
          ></i>
        </button>
      </div>
      <div
        className={`border-red-300  ${
          lrmode === "light" ? "bg-white" : "bg-gray-800"
        }`}
      >
        <div className="child-div">
          <div className="addItems">
            <div className="flex justify-between">
              <form
                className="flex justify-between"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (inputData.trim() !== "") {
                    dispatch(addTodo(inputData));
                    setInput("");
                  }
                }}
              >
                <input
                  className={`px-[100%] ${
                    lrmode === "light"
                      ? "bg-white text-black"
                      : "bg-gray-700 text-white"
                  }`}
                  type="text"
                  placeholder=" Add Items..."
                  value={inputData}
                  onChange={(e) => setInput(e.target.value)}
                />
              </form>
            </div>
            <div
              className={`show-item mt-[20px] ${
                lrmode === "light" ? "bg-white" : "bg-gray-700"
              }`}
            >
              {filteredList().map((ele) => {
                return (
                  <div
                    className={`flex justify-between p-[10px] border-gray-600 border-b-2 ${
                      lrmode === "light" ? "text-black" : "text-white"
                    }`}
                    key={ele.id}
                  >
                    <input
                      type="checkbox"
                      checked={ele.completed}
                      onChange={() => dispatch(completeTodo(ele.id))}
                    />
                    <h3
                      style={{
                        textDecoration: ele.completed ? "line-through" : "none",
                      }}
                    >
                      {ele.data}
                    </h3>
                    <div className="flex gap-[12px]">
                      <button
                        className=""
                        onClick={() => {
                          const newData = prompt("Enter new data:");
                          if (newData !== null) {
                            dispatch(editTodo(ele.id, newData));
                          }
                        }}
                      >
                        📝
                      </button>
                      <button
                        className=""
                        onClick={() => dispatch(deleteTodo(ele.id))}
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between m-[10px] py-[10px]">
              <p>{itemsLeft} ITEM LEFT</p>
              <ul className="flex gap-[10px]">
                <li
                  onClick={() => handleFilterChange("all")}
                  className={
                    filter === "all"
                      ? "text-blue-500 cursor-pointer"
                      : "cursor-pointer"
                  }
                >
                  All
                </li>
                <li
                  onClick={() => handleFilterChange("active")}
                  className={
                    filter === "active"
                      ? "text-blue-500 cursor-pointer"
                      : "cursor-pointer"
                  }
                >
                  Active
                </li>
                <li
                  onClick={() => handleFilterChange("completed")}
                  className={
                    filter === "completed"
                      ? "text-blue-500 cursor-pointer"
                      : "cursor-pointer"
                  }
                >
                  Completed
                </li>
              </ul>

              <button
                className="btn"
                data-sm-link-text="remove all"
                onClick={() => dispatch(removeTodo())}
              >
                Clear Completed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
