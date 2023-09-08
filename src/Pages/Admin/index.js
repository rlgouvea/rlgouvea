import { useEffect, useContext } from "react";
import { useState } from "react";
import AlertDelete from "../../Assets/Components/AlertDelete";
import AlertPopup from "../../Assets/Components/AlertPopup";
import FormEditAdmin from "../../Assets/Components/FormEdit/FormEditAdmin";
import {
  ButtonControl,
  ContainerForm,
  FormGroup,
} from "../../Assets/Components/GlobalStyles";
import {
  changeUser,
  deleteUserFirestore,
  fetchUsers,
  addUser,
} from "../../Services/routes";
import "./renterStyle.scss";
import TableAdmin from "../../Assets/Components/Table/tableAdmin";
import Loader from "../../Assets/Components/Loader";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Private";

const Admin = () => {
  const { userRole } = useContext(Context);
  const auth = getAuth();

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [listUsers, setListUsers] = useState(false);
  const [userControl, setUserControl] = useState();
  const [alertEdit, setAlertEdit] = useState(false);
  const [alert, setAlert] = useState(false);
  const [ownerEdit, setOwnerEdit] = useState();
  const [alertDel, setAlertDel] = useState(false);
  const [title, setTitle] = useState();
  const [registerUser, setRegisterUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const [form, setForm] = useState({
    login: {
      value: "",
      error: false,
    },
    senha: {
      value: "",
      error: false,
    },
    role: {
      value: "",
      error: false,
    },
    name: {
      value: "",
      error: false,
    },
  });

  const initialState = {
    login: {
      value: "",
      error: false,
    },
    senha: {
      value: "",
      error: false,
    },
    role: {
      value: "",
      error: false,
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: {
        value,
        error: false,
      },
    });
  };

  useEffect(() => {
    if (userRole !== "admin") {
      navigate("/");
    }
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    setUsers([]);
    const response = await fetchUsers();
    let newArray = []
     response.docs.forEach((item) => {
     newArray.push([item.data(), { id: item.id }])
    });
    newArray.sort((a, b) => {
      const nameA = a[0].name.toUpperCase();
      const nameB = b[0].name.toUpperCase();
    
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return true;
      }
    });
    setUsers(newArray)
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (
      form.login.value !== "" &&
      form.senha.value !== "" &&
      form.role.value !== "" &&
      form.name.value !== ""
    ) {
      await createUserWithEmailAndPassword(
        auth,
        form.login.value,
        form.senha.value
      )
        .then((value) => {
          handleUser(value.user.uid);
        })
        .catch((error) => {
          console.log("Erro ao cadastrar: " + error);

          if (error.code === "auth/weak-password") {
            setTitle("Senha precisa ter pelo menos 6 caracteres!");
            setAlert(true);
            setLoading(false);
          } else if (error.code === "auth/email-already-in-use") {
            setTitle("Email já existe!");
            setAlert(true);
            setLoading(false);
          } else if (error.code === "auth/invalid-email") {
            setTitle("Email inválido!");
            setAlert(true);
            setLoading(false);
          }
        });
    } else {
      alert("Preencha todos os campos!");
    }
  };

  const handleUser = async (uid) => {
    const response = await addUser(
      form.login.value,
      uid,
      form.role.value,
      form.name.value
    );
    if (response.status === 200) {
      setTitle("Cadastrado com sucesso!");
      setAlert(true);
      setStatus("success");
      setRegisterUser(!registerUser);
      setForm(initialState);
      getUsers();
    } else {
      setTitle("Erro ao cadastrar, verifique os dados e tente novamente.");
      setAlert(true);
    }
    setLoading(false);
  };

  const deleteUserAuthentication = async () => {
    // setLoading(true)

    function deleteOtherUserAuthAccount(otherUserUID) {
      auth()
        .deleteUser(otherUserUID)
        .then(function () {
          console.log("User deleted successfully");
        })
        .catch(function (error) {
          console.error("Error deleting user: ", error);
        });
    }

    // const userAtual = getAuth()

    // userAtual.getUser(userControl.uid)
    // userAtual.getUser('w0o31dAIV2PE1wHvQ4leQB0zCpo1')
    //     .then((userRecord) => {
    //         // See the UserRecord reference doc for the contents of userRecord.
    //         console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
    //         deleteUser(userRecord)
    //     })
    //     .catch((error) => {
    //         console.log('Error fetching user data:', error);
    //     });
  };

  const handleDelete = (item) => {
    setAlertDel(true);
    setTitle("Tem certeza que deseja excluir esse usuário?");
    setUserControl(item);
  };

  const handleListUsers = async () => {
    setLoading(true);
    await getUsers();
    setRegisterUser(false);
    setListUsers(!listUsers);
    setLoading(false);
  };

  const handleListRegister = () => {
    setLoading(true);
    setRegisterUser(!registerUser);
    setListUsers(false);
    setLoading(false);
    //navigate('/register', { replace: true })
  };

  const handleEdit = (item) => {
    // console.log('select ', item)
    setOwnerEdit(item);
    setAlertEdit(true);
  };

  const handleSubmitEdit = async (item) => {
    setLoading(true);
    const data = {
      uid: item.uid,
      login: item.login,
      role: item.role,
      active: item.active,
      id: item.id,
    };
    const response = await changeUser(data);
    if (response.status === 200) {
      setAlertEdit(false);
      setTitle("Atualizado com sucesso!");
      setAlert(true);
      setStatus("success");
      getUsers();
    } else {
      setAlertEdit(false);
      setLoading(false);
      setTitle("Erro ao editar, tente novamente");
      setAlert(true);
      setStatus("error");
    }
  };

  return (
    <div className="containerRenter">
      <h1>Usuários</h1>
      <div className="menuHead">
        <ButtonControl onClick={() => handleListUsers()}>
          Listar Usuários
        </ButtonControl>
        <ButtonControl onClick={() => handleListRegister()}>
          Adicionar Usuários
        </ButtonControl>
      </div>
      {loading && <Loader />}
      {alert && (
        <AlertPopup
          view={alert}
          setView={setAlert}
          title={title}
          status={status}
        />
      )}
      {alertEdit && (
        <FormEditAdmin
          view={alertEdit}
          setView={setAlertEdit}
          item={ownerEdit}
          handle={handleSubmitEdit}
          handleDelete={handleDelete}
          //   handleEditUser={handleEditUser}
        />
      )}
      {alertDel && (
        <AlertDelete
          title={title}
          view={alertDel}
          setView={setAlertDel}
          // handle={deleteUsers}
          handle={deleteUserAuthentication}
          // item={renterControl}
        />
      )}
      {registerUser && (
        <ContainerForm
          style={{
            borderRadius: " 20px",
            boxShadow: "0 0 20px black",
            width: "90%",
          }}
        >
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <label>Nome</label>
              <input
                type="text"
                name="name"
                placeholder="Nome"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Email</label>
              <input
                type="text"
                name="login"
                placeholder="Email"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Senha</label>
              <input
                type="password"
                name="senha"
                placeholder="Senha"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Permissão</label>
              <select
                name="role"
                onChange={handleChange}
                value={form.role.value}
              >
                <option selected value="">
                  Selecione...
                </option>
                <option value="admin">Administrador</option>
                <option value="atendente">Atendente</option>
                <option value="corretor">Corretor</option>
              </select>
            </FormGroup>
            <FormGroup>
              <ButtonControl type="submit" style={{ margin: "10px auto 0" }}>
                Cadastrar
              </ButtonControl>
            </FormGroup>
          </form>
        </ContainerForm>
      )}
      {listUsers && users.length > 0 && (
        <TableAdmin users={users} getUsers={getUsers} handleEdit={handleEdit} />
      )}
    </div>
  );
};

export default Admin;
