import { useEffect, useRef, useState } from "react";

import classes from "./TodoForm.module.css";

function TodoForm() {
  const [input, setInput] = useState(" ");
  const [task, setTask] = useState([]);
  //() =>JSON.parse(localStorage.getItem("tasks"));
  const [edit, setEdit] = useState(0);
  // const [deleteLast, setDeleteLast] = useState(false);

  // const isFirstRender = useRef(true);
  // console.log(isFirstRender.current);
  useEffect(() => {
    const data = localStorage.getItem("tasks");
    console.log({ data });
    if (data) {
      setTask(JSON.parse(data));
    }
    // isFirstRender.current = false;
  }, []);

  useEffect(() => {
    // if (task.length === 0)
    // console.log(isFirstRender.current);
    console.log({ task });
    //?. property
    localStorage.setItem("tasks", JSON.stringify(task));
    // if (!isFirstRender.current) {
    // }
  }, [task]);

  // function addToLocalStorage(task) {
  //   localStorage.setItem("tasks", JSON.stringify(task));
  // }

  /*************************************** */

  function deleteHandler(taskId) {
    setTask(
      task.filter((singleTask) => {
        return singleTask.id !== taskId;
      })
    );
  }

  /*************************************** */

  function editHandler(taskId) {
    // setInput(singleTask.input);
    // console.log(e.target.parentElement.firstChild.textContent);
    setEdit(taskId);
    const editElement = task.find((singleTask) => {
      return singleTask.id === taskId;
    });
    setInput(editElement.input);
  }

  /*************************************** */

  function submitHandler(event) {
    event.preventDefault();

    if (edit) {
      const task_tobe_edited = task.find(
        (singleTask) => singleTask.id === edit
      );
      const task_name_change = task.map((singleTask) => {
        return singleTask.id === task_tobe_edited.id
          ? { id: task_tobe_edited.id, input: input }
          : { id: singleTask.id, input: singleTask.input };
      });

      setTask(task_name_change);
      setInput(" ");
      setEdit(0);
      console.log(input);
      console.log(task);
      console.log(task_name_change);
      console.log(task_tobe_edited);
      return;
    }

    if (input !== " ") {
      setTask([
        ...task,
        {
          id: `${input}-${Date.now()}`,
          input: input,
        },
      ]);
    }

    setInput(" ");
    // used to reset all values
    // event.target.reset();
    // addToLocalStorage(task);
  }

  /*************************************** */
  return (
    <div className={classes.todo__container}>
      <div className={classes.form__container}>
        <h1 className={classes.title}>Todoooo.....</h1>
        <form className={classes.form} onSubmit={submitHandler}>
          <input
            className={classes.form__input}
            // ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button type="submit" className={classes.btn__submit}>
            {edit ? "Edit" : "Add"}
          </button>
        </form>
        <ul className={classes.tasks__all}>
          {task.map((singleTask) => (
            <li className={classes.task__single} key={singleTask.id}>
              <span className={classes.task__name}>{singleTask.input}</span>

              <button
                type="submit"
                className={classes.btn__edit}
                onClick={() => editHandler(singleTask.id)}
              >
                Edit
              </button>
              <button
                type="submit"
                className={classes.btn__delete}
                onClick={() => deleteHandler(singleTask.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoForm;
