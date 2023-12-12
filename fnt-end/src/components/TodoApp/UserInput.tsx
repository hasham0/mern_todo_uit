import { responseTodo, todoTs } from "../../types";
import { useEffect, useState } from "react";
import Fields from "./Fields";
import List from "./List";
import toast from "react-hot-toast";

type Props = {};

export default function UserInput({}: Props) {
  //  all todos
  const [list, setList] = useState<todoTs[]>([]);
  // edit id
  const [editID, setEditID] = useState<string>();
  // update
  const [updateBtn, setUpdateBtn] = useState<boolean>(false);

  const [userInputs, setUserInputs] = useState<todoTs>({
    task: "",
    status: false,
  });

  // initial input states
  const initialState = () =>
    setUserInputs({
      task: "",
      status: false,
    });

  //fetching todos form node server / database
  const getAllTodos = async () => {
    const responce = await fetch("http://localhost:8000/allTodos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "default",
    });
    const responceData: responseTodo = await responce.json();
    setList(responceData.data);
  };

  // creating new todo
  const getData = async (data: todoTs) => {
    const responce = await fetch("http://localhost:8000/newTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responceData: responseTodo = await responce.json();
    console.log(responceData.data);
    setList(responceData.data);
    initialState();
    toast.success(responceData.message);
  };

  // clear all in fiels and LS
  const handleClearAll = async () => {
    const responce = await fetch("http://localhost:8000/clear", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responceData: responseTodo = await responce.json();
    setList(responceData.data);
    toast.success(responceData.message);
  };

  // handle Edit
  const handleEdit = (id: string) => {
    let listClone = list.slice();
    const match = listClone.findIndex((item) => item._id === id);
    setUpdateBtn(true);
    setEditID(id);
    setUserInputs({
      task: listClone[match].task,
      status: listClone[match].status,
    });
  };

  //handle Reset
  const handleReset = () => initialState();

  // handle delete
  const handleDelete = async (id: string) => {
    const responce = await fetch(`http://localhost:8000/deleteTodo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responceData: responseTodo = await responce.json();
    setList(responceData.data);
    toast.success(responceData.message);
  };

  // handle update
  const handleUpdate = async () => {
    const responce = await fetch(`http://localhost:8000/updateTodo/${editID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInputs),
    });

    const responceData = await responce.json();
    setList(responceData.data);
    initialState();
    setUpdateBtn(false);
    toast.success(responceData.message);
  };

  // loading all existed todo in database
  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className="m-5 mx-auto w-1/2 border-2 border-black">
      <Fields
        getDatahandle={getData}
        handleClearAll={handleClearAll}
        updateBtn={updateBtn}
        userInputs={userInputs}
        setUserInputs={setUserInputs}
        handleUpdate={handleUpdate}
        handleReset={handleReset}
      />
      <section className="m-6 flex justify-center">
        <table className="w-full">
          <thead>
            <tr className="border-2 border-red-600 bg-gray-200 uppercase ">
              <th>id</th>
              <th>task</th>
              <th>status</th>
              <th>edit</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {list &&
              list.map((item: todoTs, index: number) => {
                return (
                  <List
                    key={index}
                    values={item}
                    myKey={index}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
                );
              })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
