import { useEffect, useState } from "react";
import { changeUser } from "../../../Services/routes";
import { ButtonControl, FormGroup } from "../GlobalStyles";
import AlertDelete from "../AlertDelete";
import Alert from "../Alert";
import "./styleFormEdit.scss";

import deleteUserAuthentication from "../../../Pages/Admin";
import { Switch } from "@mui/material";

// const FormEditAdmin = ({view, setView, item, handle, handleDelete}) => {
const FormEditAdmin = ({ view, setView, item, handle, handleDelete }) => {
  const [userControl, setUserControl] = useState();
  const [alertDel, setAlertDel] = useState(false);
  const [alert, setAlert] = useState(false);
  const [title, setTitle] = useState();
  const [form, setForm] = useState({
    login: {
      value: "",
      error: false,
    },
    role: {
      value: "",
      error: false,
    },
    active: {
      value: false,
      error: false,
    },
  });

  useEffect(() => {
    setForm({
      login: {
        value: item.login,
        error: false,
      },
      role: {
        value: item.role,
        error: false,
      },
      active: {
        value: item.active,
        error: false,
      },
    });
  }, []);
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      uid: item.uid,
      login: form.login.value,
      role: form.role.value,
      active: form.active.value,
      id: item.id,
    };
    handle(data);
    // const response = await changeUser(data)
    // if(response.status === 200){
    //     setTitle("Atualizado com sucesso!")
    //     setAlert(true)
    // }
  };

  const handleAlertDel = () => {
    setUserControl(item);
    setTitle("Tem certeza que deseja excluir esse proprietário?");
    setAlertDel(true);
  };

  return (
    <div className="containerEdit">
      <div className="wrapperEdit" style={{ justifyContent: "center" }}>
        {alertDel && (
          <AlertDelete
            title={title}
            view={view}
            setView={setView}
            // handle={handleDelete}
            handle={handleDelete}
            item={userControl}
          />
        )}
        {alert && (
          <Alert title={title} view={view} setView={setView} handle={handle} />
        )}
        <form>
          <div className="formFlex">
            <FormGroup>
              <label>Login</label>
              <input
                type="text"
                name="login"
                placeholder="Login"
                value={form.login.value}
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
                <option disabled selected>
                  Selecione...
                </option>
                <option value="admin">Administrador</option>
                <option value="atendente">Atendente</option>
                <option value="corretor">Corretor</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Ativo</label>
              <Switch
                checked={form.active.value}
                onChange={()=>setForm({
                  ...form,
                  active: {
                    value: !form.active.value,
                    error: false,
                  },
                })}
              />
            </FormGroup>
          </div>
        </form>
        <div className="controls">
          <ButtonControl onClick={handleSubmit}>Salvar</ButtonControl>
          <ButtonControl onClick={() => setView(!view)}>Cancelar</ButtonControl>
          <ButtonControl
            onClick={
              () => handleDelete(item)
              // onClick={()=>console.log(item)
              // onClick={()=>deleteUserAuthentication(item)
            }
          >
            Deletar
          </ButtonControl>
        </div>
      </div>
    </div>
  );
};

export default FormEditAdmin;
