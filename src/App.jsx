import React, { useState, useEffect } from "react";
import Alert from "./Alert";
import List from "./List";


const getLocalStorage = () => {
    let list = localStorage.getItem("list");
    if(list) {
        return JSON.parse(localStorage.getItem("list"));
    }
    else {
        return [];
    }
}

const App = () => {
    const [name, setName] = useState("");
    const [list, setList] = useState(getLocalStorage());
    const [isEditing, setIsEditing] = useState(false);
    const [editID, setEditID] = useState(null);
    const [alert, setAlert] = useState({show: false, msg: "", type: ""});

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name) {
            showAlert(true, "danger", "please enter value");
        }
        else if(name && isEditing) {
            setList(list.map((item)=> {
                if(item.id === editID) {
                    return { ...item, title: name }
                }
                return item
            }))
            setName("");
            setEditID(null);
            setIsEditing(false);
            showAlert(true, "success", "value changed");
        }
        else {
            showAlert(true, "success", "item added");
            const newItem = { id: new Date().getTime().toString(), title: name };
            setList([...list, newItem]);
            setName("");
        }
    }

    //This is done because I need to call it in more than one place
    //Else, I would have kept the setAlert
    const showAlert = (show=false, type="", msg="") => {
        setAlert({ show, type, msg })
    }

    const clearList = () => {
        showAlert(true, "danger", "List cleared");
        setList([]);
    }

    const removeItem = (id) => {
        showAlert(true, "danger", "item removed");
        setList(list.filter((item) => item.id !== id));
    }

    const editItem = (id) => {
        const specificItem = list.find((item) => item.id === id);
        setIsEditing(true);
        setEditID(id)
        setName(specificItem.title)
    }

    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(list))
    }, [list]);

    return (
        <section className="section-center">
            <form className="todo-form" onSubmit={handleSubmit}>
                {alert.show && <Alert {...alert} alertMessage={showAlert} list={list} />}
                <h3>Todo App</h3>
                <div className="form-control">
                    <input type="text" className="todo" placeholder="e.g. cleaning" value={name} onChange={(e)=> setName(e.target.value)} />
                    <button type="submit" className="submit-btn">
                        {isEditing ? "edit" : "submit"}
                    </button>
                </div>
            </form>
            {list.length > 0 && (
            <div className="todo-container">
                <List items={list} removeItem={removeItem} editItem={editItem} />
                <button className="clear-btn" onClick={clearList}>clear items</button>
            </div>
            )}
        </section>
    );
};


export default App;