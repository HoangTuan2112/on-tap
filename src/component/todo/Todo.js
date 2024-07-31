import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Button, Col, Container, Input, Row, Table } from "reactstrap";
import "./todo.css";
import {
  addTodo,
  deleteTodo,
  deleteTodoAll,
  filterTodo,
  toggleComplete,
  toggleCompleteAll,
  updateTodo,
} from "../../redux/todoReducer";

export default function Todo() {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todo);
  const [isEdit, setIsEdit] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [editTitle, setEditTitle] = React.useState(null);
  const [text, setText] = React.useState("");
  const [text1, setText1] = React.useState("");
  const [list, setList] = React.useState(todos);
  const [text2, setText2] = React.useState("");

  const filter = (type) => {
    if (type == "completed") {
      return list.filter((todo) => todo.completed);
    } else if (type == "uncompleted") {
      return list.filter((todo) => !todo.completed);
    } else if (type == "all") {
      return list;
    }
    else{
     return list.filter((todo) => todo.title.includes(type));
    }
  };
  const toggleCompleteAll1 = () => {
    const newlist = list.map((todo) => {
      return { ...todo, completed: !todo.completed };
    });
    setList(newlist);
  };
  const deleteTodoAll1 = () => {
    const newlist = list.filter((todo) => !todo.completed);
    setList(newlist);
  };

  const [dk, setDk] = React.useState("all");
  useEffect(() => {
    setList(todos);
  }, [todos]);
  return (
    <Container>
      <h1>Todo List</h1>
      <Input
        placeholder="Add tittle"
        value={text1}
        onChange={(e) => setText1(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (text1.trim() !== "") {
              dispatch(addTodo(text1));
              setText1("");
            }
          }
        }}
      />
      <div>
        <Col className="col-sm-6 col-md-4 col-lg-12 filter">
          <Button color="primary" onClick={() => setDk("all")}>
            All
          </Button>

          <Button color="primary" onClick={() => setDk("completed")}>
            Completed
          </Button>
          <Button color="primary" onClick={() => setDk("uncompleted")}>
            Uncompleted
          </Button>
          <Button
            color="primary"
            onClick={() => {
              toggleCompleteAll1();
              dispatch(toggleCompleteAll());
            }}
          >
            Toggle Completed All
          </Button>

          
          <Button
            color="primary"
            onClick={() => {
              deleteTodoAll1();
              dispatch(deleteTodoAll());
            }}
          >
            Delete Completed All
          </Button>
        </Col>
        <Input placeholder="loc theo tittle" value={text2} onChange={(e)=>setText2(e.target.value)} onKeyDown={(e)=>{
          if(e.key === "Enter"){
            if(text2.trim() !== ""){
              setDk(text2);
            }
          }
        }}></Input>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Completed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filter(dk).map((todo) => (
            <tr>
              <td>{todo.id}</td>
              <td>
                {editId == todo.id && isEdit ? (
                  <Input
                    value={editTitle}
                    placeholder={todo.tittle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (editTitle.trim() !== "") {
                          dispatch(updateTodo({ ...todo, title: editTitle }));
                          setIsEdit(false);
                        }
                      }
                    }}
                  ></Input>
                ) : (
                  <p
                    onClick={() => {
                      dispatch(toggleComplete(todo.id));
                    }}
                    onDoubleClick={() => {
                      setIsEdit(true);
                      setEditId(todo.id);
                    }}
                    className={todo.completed ? "tittle active" : "tittle"}
                  >
                    {todo.title}
                  </p>
                )}
              </td>
              <td>
                <Input
                  type="checkbox"
                  checked={todo.completed}
                  onClick={() => {
                    dispatch(toggleComplete(todo.id));
                  }}
                />
              </td>
              <td>
                <Button
                  color="danger"
                  onClick={() => dispatch(deleteTodo(todo.id))}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
