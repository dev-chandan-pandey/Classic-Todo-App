import { list } from "postcss";

const initialData = {
  list: [],
};
const todoReducers = (state = initialData, action) => {
  switch (action.type) {
    case "AddTODO":
      const { id, data } = action.payload;
      return {
        ...state,
        list: [
          ...state.list,
          {
            id: id,
            data: data,
          },
        ],
      };

    case "deleteTODO":
      const newList = state.list.filter((ele) => ele.id != action.id);
      return {
        ...state,

        list: newList,
      };
    case "editTODO":
      const editedList = state.list.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            data: action.payload.newData,
          };
        }
        return item;
      });
      return {
        ...state,
        list: editedList,
      };

    case "removeTODO":
      return {
        ...state,
        list: [],
      };
    case "completeTODO":
      const updatedList = state.list.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            completed: true,
          };
        }
        return item;
      });

      return {
        ...state,
        list: state.list.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };

    default:
      return state;
  }
};
export default todoReducers;
