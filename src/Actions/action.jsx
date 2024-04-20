export const addTodo = (data) => {
  return {
    type: "AddTODO",
    payload: {
      id: new Date().getTime().toString(),
      data: data,
    },
  };
};
export const deleteTodo = (id) => {
  return {
    type: "deleteTODO",
    id,
  };
};
export const editTodo = (id, newData) => {
  return {
    type: "editTODO",
    payload: {
      id: id,
      newData: newData,
    },
  };
};
export const removeTodo = () => {
  return {
    type: "removeTODO",
  };
};
export const completeTodo = (id) => {
  return {
    type: "completeTODO",
    id,
  };
};
