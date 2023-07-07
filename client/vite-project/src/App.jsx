import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [itemText, setItemText] = useState("");

  const [listItems, setListItems] = useState([]);

  const [isUpdating, setIsUpdating] = useState("");

  const [updateItemText, setUpdateItemText ] = useState("");



//post
  const addItem = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5500/api/item", {
        item: itemText,
      });

      setListItems((prev) => [...prev, res.data]);
      setItemText("");
      getItemsList();

    } catch (error) {
      console.log(error);
    }
  };



//get

  const getItemsList = async () => {
    try {
      const res = await axios.get("http://localhost:5500/api/items");
      console.log(res.data);
      setListItems(res.data);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getItemsList();
  }, []);




//delete
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5500/api/item/${id}`);
      const newListItems = listItems.filter((item) => item._id !== id);
      setListItems(newListItems);
      

    } catch (error) {
      console.log(error);
    }
  };




//update


  const updateItem = async (e) => {
  e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5500/api/items/${isUpdating}`, {item: updateItemText  })
      
      console.log(res.data);
      const updatedItemIndex = listItems.findIndex((item) => item._id === isUpdating);
     
      const updatedItem = listItems[updatedItemIndex].item = updateItemText;
      

      setUpdateItemText('');
      setIsUpdating('');


    } catch (error) {
      console.log(error)
      
    }
  }
 






  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e)=>{updateItem(e)}}>
      <input className="update-new-input" type="text" placeholder="New Item" onChange={e=>{setUpdateItemText(e.target.value)}} value={updateItemText}/>
      <button className="update-new-btn" type="submit">
        Update
      </button>
    </form>
  );





  return (
    <>
      <div className="App">
        <h1>TODO </h1>

        <form className="form" onSubmit={(e) => addItem(e)}>
          <input
            type="text"
            placeholder="Add todo Item"
            onChange={(e) => {
              setItemText(e.target.value);
            }}
            value={itemText}
          />
          <button type="submit"> Add </button>
        </form>







        <div className="todo-listItems">

          {listItems.map((curValue) => (

            <div className="todo-item">

              {isUpdating === curValue._id ? (
                renderUpdateForm()
              ) : (

                <>
                  <p className="item-content">{curValue.item}</p>

                  <button
                    className="update-item"
                    onClick={() => setIsUpdating(curValue._id)}
                  >
                    Update
                  </button>

                  <button
                    className="delete-item"
                    onClick={() => deleteItem(curValue._id)}
                  >
                    Delete
                  </button>
                </>
                
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default App;
