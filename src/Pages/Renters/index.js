import { useEffect } from "react";
import { useState } from "react";
import AlertDelete from "../../Assets/Components/AlertDelete";
import AlertPopup from "../../Assets/Components/AlertPopup";
import FormEditRenter from "../../Assets/Components/FormEdit/FormEditRenter";
import {
  ButtonControl,
  ContainerForm,
  FormGroup,
} from "../../Assets/Components/GlobalStyles";
import {
  changeRenter,
  deleteRenter,
  fetchInquilinos,
} from "../../Services/routes";
import { addRenter } from "../../Services/routes";
import "./renterStyle.scss";
import TableRenters from "../../Assets/Components/Table/tableRenters";
import Loader from "../../Assets/Components/Loader";
import InputMask from "react-input-mask";
import { useFormik } from "formik";

const Renters = () => {
  const [renters, setRenters] = useState([]);
  const [listRenters, setListRenters] = useState(false);
  const [renterControl, setRenterControl] = useState();
  const [alertEdit, setAlertEdit] = useState(false);
  const [alert, setAlert] = useState(false);
  const [ownerEdit, setOwnerEdit] = useState();
  const [alertDel, setAlertDel] = useState(false);
  const [title, setTitle] = useState();
  const [registerRenters, setRegisterRenters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("success");

  // const [form, setForm] = useState({
  //   name: {
  //     value: "",
  //     error: false,
  //   },
  //   phone: {
  //     value: "",
  //     error: false,
  //   },
  //   phone2: {
  //     value: "",
  //     error: false,
  //   },
  //   phone3: {
  //     value: "",
  //     error: false,
  //   },
  //   maritalStatus: {
  //     value: "",
  //     error: false,
  //   },
  //   profession: {
  //     value: "",
  //     error: false,
  //   },
  //   nationality: {
  //     value: "",
  //     error: false,
  //   },
  //   birth: {
  //     value: "",
  //     error: false,
  //   },
  //   email: {
  //     value: "",
  //     error: false,
  //   },
  //   cpf: {
  //     value: "",
  //     error: false,
  //   },
  //   rg: {
  //     value: "",
  //     error: false,
  //   },
  // });

  const form = useFormik({
    initialValues: {
      name: "",
      phone: "",
      phone2: "",
      phone3: "",
      maritalStatus: "",
      profession: "",
      nationality: "Brasileiro(a)",
      birth: "",
      email: "",
      cpf: "",
      rg: "",
    },
    onSubmit: async (values) => {
      values.name = values.name.toUpperCase()
      values.maritalStatus=values.maritalStatus.toUpperCase()
      values.profession=values.profession.toUpperCase()
      values.nationality=values.nationality.toUpperCase()
      values.phone = values.phone.replace("_", "");
      values.phone2 = values.phone2.replace("_", "");
      values.phone3 = values.phone3.replace("_", "");
      setLoading(true);
      try {
        await addRenter(values);
        setTitle("Cadastrado com sucesso!");
        setStatus("success");
        setAlert(true);
        setRegisterRenters(!registerRenters);
        getRenters();
        form.resetForm();
      } catch (e) {
        console.log(e);
      }
      // const response = await addRenter(values);
      // if (response.status === 200) {
      //   setTitle("Cadastrado com sucesso!");
      //   setStatus("success");
      //   setAlert(true);
      //   setRegisterRenters(!registerRenters);
      //   getRenters();
      //   form.resetForm()
      // }
      setLoading(false);
    },
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setForm({
  //     ...form,
  //     [name]
  //       value: value.toUpperCase(),
  //       error: false,
  //     },
  //   });
  // };

  useEffect(() => {
    getRenters();
  }, []);

  const getRenters = async () => {
    setListRenters(false);
    setLoading(true);
    setRenters([]);
    const response = await fetchInquilinos();
    
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
    setRenters(newArray)
    setLoading(false);
    setListRenters(true);
  };

  // const handleSubmit = async (e) => {
  //   setLoading(true);
  //   e.preventDefault();
  //   const response = await addRenter(form);
  //   if (response.status === 200) {
  //     setTitle("Cadastrado com sucesso!");
  //     setStatus("success");
  //     setAlert(true);
  //     setRegisterRenters(!registerRenters);
  //     getRenters();
  //   }
  //   setLoading(false);
  // };

  const handleDelete = (item) => {
    console.log(item);
    setAlertDel(true);
    setTitle("Tem certeza que deseja excluir esse inquilino?");
    setRenterControl(item);
  };

  const deleteRenters = async () => {
    setLoading(true);
    const response = await deleteRenter(renterControl.id);
    if (response.status === 200) {
      setLoading(false);
      setAlertDel(false);
      getRenters();
      setAlertEdit(false);
      setStatus("success");
      setTitle("Excluído com sucesso!");
      setAlert(true);
      setListRenters(false);
    }
    setLoading(false);
  };

  const handleListRenters = async () => {
    setLoading(true);
    await getRenters();
    setRegisterRenters(false);
    setListRenters(!listRenters);
    setLoading(false);
  };

  const handleListRegister = () => {
    setLoading(true);
    setRegisterRenters(!registerRenters);
    setListRenters(false);
    setLoading(false);
  };

  const handleEdit = (item) => {
    setOwnerEdit(item);
    setAlertEdit(true);
  };

  const handleEditRenter = async (data) => {
    setLoading(true);
    const response = await changeRenter(data);
    if (response.status === 200) {
      setStatus("success");
      setAlertEdit(false);
      setTitle("Atualizado com sucesso!");
      setAlert(true);
      getRenters();
    } else {
      setLoading(false);
    }
  };

  const handleReload = () => {
    getRenters();
    setAlertEdit(false);
  };

  return (
    <div className="containerRenter">
      <h1>Inquilinos</h1>
      <div className="menuHead">
        <ButtonControl onClick={() => handleListRenters()}>
          Listar Inquilinos
        </ButtonControl>
        <ButtonControl onClick={() => handleListRegister()}>
          Adicionar Inquilino
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
        <FormEditRenter
          view={alertEdit}
          setView={setAlertEdit}
          item={ownerEdit}
          handle={handleReload}
          handleDelete={handleDelete}
          handleEditRenter={handleEditRenter}
        />
      )}
      {alertDel && (
        <AlertDelete
          title={title}
          view={alertDel}
          setView={setAlertDel}
          handle={deleteRenters}
          // item={renterControl}
        />
      )}
      {registerRenters && (
        <ContainerForm
          style={{
            borderRadius: " 20px",
            boxShadow: "0 0 20px black",
            width: "90%",
          }}
        >
          <form onSubmit={form.handleSubmit}>
            <FormGroup>
              <label>Nome</label>
              <input
                type="text"
                name="name"
                value={form.values.name}
                placeholder="Nome Completo do(a) Inquilino(a)"
                onChange={form.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Telefone</label>
              <InputMask
                mask="(99)999999999"
                value={form.phone}
                type="text"
                name="phone"
                onChange={form.handleChange}
              >
                {() => (
                  <input
                    type="text"
                    name="phone"
                    placeholder="Telefone"
                    value={form.phone}
                  />
                )}
              </InputMask>
            </FormGroup>
            <FormGroup>
              <label>Telefone 2</label>
              <InputMask
                mask="(99)999999999"
                value={form.phone2}
                type="text"
                name="phone2"
                onChange={form.handleChange}
              >
                {() => (
                  <input
                    type="text"
                    name="phone2"
                    placeholder="Telefone 2"
                    value={form.phone2}
                  />
                )}
              </InputMask>
            </FormGroup>
            <FormGroup>
              <label>Telefone 2</label>
              <InputMask
                mask="(99)999999999"
                value={form.phone3}
                type="text"
                name="phone3"
                onChange={form.handleChange}
              >
                {() => (
                  <input
                    type="text"
                    name="phone3"
                    placeholder="Telefone 3"
                    value={form.phone2}
                  />
                )}
              </InputMask>
            </FormGroup>
            <FormGroup>
              <label>Estado Civil</label>
              <input
                type="text"
                name="maritalStatus"
                value={form.maritalStatus}
                placeholder="Estado Civil"
                onChange={form.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Profissão</label>
              <input
                type="text"
                name="profession"
                placeholder="Profissão"
                value={form.profession}
                onChange={form.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Nacionalidade</label>
              <input
                type="text"
                name="nationality"
                placeholder="Nacionalidade"
                value={form.nationality}
                onChange={form.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Nascimento</label>
              <InputMask
                mask="99/99/9999"
                type="text"
                name="birth"
                onChange={form.handleChange}
              >
                {() => (
                  <input
                    type="text"
                    name="birth"
                    placeholder="Nascimento"
                    // onChange={form.handleChange}
                  />
                )}
              </InputMask>
            </FormGroup>
            <FormGroup>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={form.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>CPF</label>
              <InputMask
                mask={"999.999.999-99"}
                type="text"
                name="cpf"
                placeholder="CPF"
                onChange={form.handleChange}
              >
                {() => <input type="text" name="cpf" placeholder="CPF" />}
              </InputMask>
            </FormGroup>
            <FormGroup>
              <label>RG</label>
              <InputMask
                type="text"
                name="rg"
                placeholder="RG"
                onChange={form.handleChange}
                mask={"99.999.999-9"}
              >
                {() => <input type="text" name="rg" placeholder="RG" />}
              </InputMask>
            </FormGroup>
            <FormGroup>
              <ButtonControl type="submit" style={{ margin: "10px auto 0" }}>
                Cadastrar
              </ButtonControl>
            </FormGroup>
          </form>
        </ContainerForm>
      )}
      {listRenters && (
        <TableRenters
          renters={renters}
          getRenters={getRenters}
          handleEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default Renters;
