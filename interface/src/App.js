import { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [CNIC, setCNIC] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [stdlist, setStdList] = useState([]);

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newFatherName, setNewFatherName] = useState("");
  const [newCNIC, setNewCNIC] = useState("");
  const [newContact, setNewContact] = useState("");
  const [newGender, setNewGender] = useState("");

  const addStd = () => {
    Axios.post("http://localhost:5000/create", {
      firstName: firstName,
      lastName: lastName,
      fatherName: fatherName,
      CNIC: CNIC,
      contact: contact,
      gender: gender,
    }).then(() => {
      console.log("success fully inserted");
      if(CNIC == )
    });
  };

  const getStd = () => {
    Axios.get("http://localhost:5000/get").then((response) => {
      setStdList(response.data);
    });
  };

  const updateStd = (id) => {
    Axios.put("http://localhost:5000/update", {
      firstName: newFirstName,
      lastName: newLastName,
      fatherName: newFatherName,
      CNIC: newCNIC,
      contact: newContact,
      gender: newGender,
      id: id,
    }).then((response) => {
      setStdList(
        stdlist.map((val) => {
          return val.id === id
            ? {
                id: val.id,
                firstName: val.firstName,
                lastName: val.lastName,
                fatherName: val.fatherName,
                CNIC: val.CNIC,
                contact: val.contact,
                gender: val.gender,
              }
            : val;
        })
      );
    });
  };

  const deleteStd = (id) => {
    Axios.delete(`http://localhost:5000/delete/${id}`).then((response) => {
      setStdList(
        stdlist.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="info">
      <label>First Name</label>
      <input
        type="text"
        onChange={(event) => {
          setFirstName(event.target.value);
        }}
      ></input>
      <label>Last Name</label>
      <input
        type="text"
        onChange={(event) => {
          setLastName(event.target.value);
        }}
      ></input>
      <label>Father Name</label>
      <input
        type="text"
        onChange={(event) => {
          setFatherName(event.target.value);
        }}
      ></input>
      <label>CNIC</label>
      <input
        type="text"
        onChange={(event) => {
          setCNIC(event.target.value);
        }}
      ></input>
      <label>Contact</label>
      <input
        type="text"
        onChange={(event) => {
          setContact(event.target.value);
        }}
      ></input>
      <label>Gender</label>
      <input
        type="text"
        onChange={(event) => {
          setGender(event.target.value);
        }}
      ></input>

      <button onClick={addStd}>Add Student</button>
      <button onClick={getStd}>Show students</button>
      <div className="displa">
        <table
          bgcolor="darkcyan"
          align="center"
          border="1"
          cellPadding="5"
          cellSpacing="5"
        >
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Father Name</th>
              <th>CNIC</th>
              <th>Contact</th>
              <th>Gender</th>
            </tr>
            {stdlist.map((val, key) => {
              return (
                <>
                  <tr>
                    <td>{val.firstName}</td>
                    <td>{val.lastName}</td>
                    <td>{val.fatherName}</td>
                    <td>{val.CNIC}</td>
                    <td>{val.contact}</td>
                    <td>{val.gender}</td>
                    <td>update action</td>
                    <td>Delete action</td>
                  </tr>

                  <tr className="table-width">
                    <td>
                      <input
                        type="text"
                        placeholder="enter new First Name"
                        onChange={(event) => {
                          setNewFirstName(event.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="enter new Last Name"
                        onChange={(event) => {
                          setNewLastName(event.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="enter new Father Name"
                        onChange={(event) => {
                          setNewFatherName(event.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="enter new CNIC"
                        onChange={(event) => {
                          setNewCNIC(event.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="enter new Contact Number"
                        onChange={(event) => {
                          setNewContact(event.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="enter new Gender"
                        onChange={(event) => {
                          setNewGender(event.target.value);
                        }}
                      />
                    </td>
                    <td id="btn">
                      <button
                        id="pop"
                        onClick={() => {
                          updateStd(val.id);
                        }}
                      >
                        {" "}
                        Update
                      </button>
                    </td>
                    <td id="btn">
                      <button
                        id="popdel"
                        onClick={() => {
                          deleteStd(val.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default App;
