import { useEffect, useContext } from "react"
import { useState } from "react"
import AlertDelete from "../../Assets/Components/AlertDelete"
import AlertPopup from "../../Assets/Components/AlertPopup"
import FormEdit from "../../Assets/Components/FormEdit"
import { ButtonControl, ContainerForm, FormGroup } from "../../Assets/Components/GlobalStyles"
import { changeOwner, deleteProp, fetchProprietarios } from "../../Services/routes"
import {addProp} from "../../Services/routes"
import "./ownerStyle.scss"
import { MdOutlineDeleteForever } from "react-icons/md"
import { FaEdit } from "react-icons/fa"
import Table from "../../Assets/Components/Table"
import Loader from "../../Assets/Components/Loader"
import {Context} from '../../Private'

const Owners = ({ newRegister, setNewRegister }) => {
  const [owners, setOwners] = useState([]);
  const [listOwners, setListOwners] = useState(false);
  const [ownerControl, setControlOwner] = useState();
  const [alertEdit, setAlertEdit] = useState(false);
  const [alert, setAlert] = useState(false);
  const [ownerEdit, setOwnerEdit] = useState();
  const [alertDel, setAlertDel] = useState(false);
  const [title, setTitle] = useState();
  const [registerOwners, setRegisterOwners] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState();
  let newRow = [];

  const initialState = {
    name: {
      value: "",
      error: false,
    },
    phone: {
      value: "",
      error: false,
    },
    adress: {
      value: "",
      error: false,
    },
    mobile: {
      value: "",
      error: false,
    },
    district: {
      value: "",
      error: false,
    },
    city: {
      value: "",
      error: false,
    },
    zip_code: {
      value: "",
      error: false,
    },
    maritalStatus: {
      value: "",
      error: false,
    },
    profession: {
      value: "",
      error: false,
    },
    birth: {
      value: "",
      error: false,
    },
    email: {
      value: "",
      error: false,
    },
    cpf: {
      value: "",
      error: false,
    },
    rg: {
      value: "",
      error: false,
    },
    nacionality: {
      value: "",
      error: false,
    },
    sonName: {
      value: "",
      error: false,
    },
    sonPhone: {
      value: "",
      error: false,
    },
    sonAdress: {
      value: "",
      error: false,
    },
    sonMobile: {
      value: "",
      error: false,
    },
    sonDistrict: {
      value: "",
      error: false,
    },
    sonCity: {
      value: "",
      error: false,
    },
    sonZip_code: {
      value: "",
      error: false,
    },
    sonMaritalStatus: {
      value: "",
      error: false,
    },
    sonProfession: {
      value: "",
      error: false,
    },
    sonBirth: {
      value: "",
      error: false,
    },
    sonEmail: {
      value: "",
      error: false,
    },
    sonCpf: {
      value: "",
      error: false,
    },
    sonRg: {
      value: "",
      error: false,
    },
    sonNacionality: {
      value: "",
      error: false,
    },
    bank: {
      value: "",
      error: false,
    },
    ag: {
      value: "",
      error: false,
    },
    count: {
      value: "",
      error: false,
    },
    nameCount: {
      value: "",
      error: false,
    },
  };


  const [form, setForm] = useState({
    name: {
      value: "",
      error: false,
    },
    phone: {
      value: "",
      error: false,
    },
    adress: {
      value: "",
      error: false,
    },
    mobile: {
      value: "",
      error: false,
    },
    district: {
      value: "",
      error: false,
    },
    city: {
      value: "",
      error: false,
    },
    zip_code: {
      value: "",
      error: false,
    },
    maritalStatus: {
      value: "",
      error: false,
    },
    profession: {
      value: "",
      error: false,
    },
    birth: {
      value: "",
      error: false,
    },
    email: {
      value: "",
      error: false,
    },
    cpf: {
      value: "",
      error: false,
    },
    rg: {
      value: "",
      error: false,
    },
    nacionality: {
      value: "",
      error: false,
    },
    sonName: {
      value: "",
      error: false,
    },
    sonPhone: {
      value: "",
      error: false,
    },
    sonAdress: {
      value: "",
      error: false,
    },
    sonMobile: {
      value: "",
      error: false,
    },
    sonDistrict: {
      value: "",
      error: false,
    },
    sonCity: {
      value: "",
      error: false,
    },
    sonZip_code: {
      value: "",
      error: false,
    },
    sonMaritalStatus: {
      value: "",
      error: false,
    },
    sonProfession: {
      value: "",
      error: false,
    },
    sonBirth: {
      value: "",
      error: false,
    },
    sonEmail: {
      value: "",
      error: false,
    },
    sonCpf: {
      value: "",
      error: false,
    },
    sonRg: {
      value: "",
      error: false,
    },
    sonNacionality: {
      value: "",
      error: false,
    },
    bank: {
      value: "",
      error: false,
    },
    ag: {
      value: "",
      error: false,
    },
    count: {
      value: "",
      error: false,
    },
    nameCount: {
      value: "",
      error: false,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: {
        value: value.toUpperCase(),
        error: false,
      },
    });
  };

  useEffect(() => {
    getOwners();
  }, []);

  const getOwners = async () => {
    setLoading(true);
    setOwners([]);
    const response = await fetchProprietarios();
    // response.docs.forEach((item) => {
    //   setOwners((prevState) => [...prevState, [item.data(), { id: item.id }]]);
    // });
    let newArray = [];
    response.docs.forEach((item) => {
      newArray.push([item.data(), { id: item.id }]);
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
    setOwners(newArray);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const response = await addProp(form);
    if (response.status === 200) {
      setStatus("success");
      setTitle("Cadastrado com sucesso!");
      setAlert(true);
      setRegisterOwners(!registerOwners);
      setForm(initialState);
      getOwners();
    }
    setLoading(false);
    if (newRegister) {
      setNewRegister(false);
    }
  };

  const handleDelete = (item) => {
    setAlertDel(true);
    setTitle("Tem certeza que deseja excluir esse proprietário?");
    setControlOwner(item.id);
  };

  const deleteOwner = async () => {
    setLoading(true);
    const response = await deleteProp(ownerControl);
    if (response.status === 200) {
      setAlertDel(false);
      getOwners();
      setAlertEdit(false);
      setTitle("Deletado com sucesso!");
      setStatus("success");
      setAlert(true);
      setListOwners(false);


      setOwners([]);
      const response = await fetchProprietarios();
      response.docs.forEach((item) => {
        setOwners((prevState) => [
          ...prevState,
          [item.data(), { id: item.id }],
        ]);
      });
      setListOwners(!listOwners);
    }
    setLoading(false);
  };

  const handleListOwners = async () => {
    setLoading(true);
    await getOwners();
    setRegisterOwners(false);
    setListOwners(!listOwners);
    setLoading(false);
  };

  const handleListRegister = () => {
    setLoading(true);
    setRegisterOwners(!registerOwners);
    setListOwners(false);
    setLoading(false);
  };

  const handleEdit = async (item) => {
    setOwnerEdit(item);
    setAlertEdit(true);
  };

  const handleEditOwner = async (data) => {
    setLoading(true);
    setListOwners(false);
    const response = await changeOwner(data);
    if (response.status === 200) {
      setAlertEdit(false);
      setTitle("Atualizado com sucesso!");
      setStatus("success");
      setAlert(true);
      setOwners([]);
      const response = await fetchProprietarios();
      response.docs.forEach((item) => {
        setOwners((prevState) => [
          ...prevState,
          [item.data(), { id: item.id }],
        ]);
      });
      setLoading(false);
      setListOwners(!listOwners);
    } else {
      setLoading(false);
    }
  };


  const handleReload = () => {
    getOwners();
    setAlertEdit(false);
  };

  return (
    <div className="containerOwner">
      {!newRegister && (
        <>
          <h1>Proprietarios</h1>
          <div className="menuHead">
            <ButtonControl onClick={() => handleListOwners()}>
              Listar Proprietários
            </ButtonControl>
            <ButtonControl onClick={() => handleListRegister()}>
              Adicionar Proprietário
            </ButtonControl>
          </div>
        </>
      )}
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
        <FormEdit
          view={alertEdit}
          setView={setAlertEdit}
          item={ownerEdit}
          handle={handleReload}
          handleDelete={handleDelete}
          handleEditOwner={handleEditOwner}
        />
      )}
      {alertDel && (
        <AlertDelete
          title={title}
          view={alertDel}
          setView={setAlertDel}
          handle={deleteOwner}
          //item={ownerControl}
        />
      )}
      {registerOwners && (
        <ContainerForm
          style={{
            borderRadius: " 20px",
            boxShadow: "0 0 20px black",
            width: "90%",
          }}
        >
          <form onSubmit={handleSubmit}>
            <h3 style={{ textAlign: "center", marginTop: "1rem" }}>Locador</h3>
            <div className="formFlex">
              <FormGroup>
                <label>Nome</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Nome Completo do Proprietário"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Telefone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Telefone"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div className="formFlex">
              <FormGroup>
                <label>Endereço</label>
                <input
                  type="text"
                  name="adress"
                  placeholder="Endereço"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Celular</label>
                <input
                  type="text"
                  name="mobile"
                  placeholder="Celular"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div className="formFlex">
              <FormGroup>
                <label>Bairro</label>
                <input
                  type="text"
                  name="district"
                  placeholder="Bairro"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Cidade</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Cidade"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Cep</label>
                <input
                  type="text"
                  name="zip_code"
                  placeholder="Cep"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div className="formFlex">
              <FormGroup>
                <label>Estado Civil</label>
                <input
                  type="text"
                  name="maritalStatus"
                  placeholder="Estado Civil"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Profissão</label>
                <input
                  type="text"
                  name="profession"
                  placeholder="Profissão"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div className="formFlex">
              <FormGroup>
                <label>Nascimento</label>
                <input
                  type="date"
                  name="birth"
                  placeholder="Nascimento"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div className="formFlex">
              <FormGroup>
                <label>Cpf</label>
                <input
                  type="text"
                  name="cpf"
                  placeholder="Cpf"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>RG</label>
                <input
                  type="text"
                  name="rg"
                  placeholder="RG"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Nacionalidade</label>
                <input
                  type="text"
                  name="nacionality"
                  placeholder="Nacionalidade"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>

            <h3 style={{ textAlign: "center", marginTop: "1rem" }}>
              Representante
            </h3>
            <div className="formFlex">
              <FormGroup>
                <label>Nome</label>
                <input
                  type="text"
                  name="sonName"
                  placeholder="Nome"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Telefone</label>
                <input
                  type="text"
                  name="sonPhone"
                  placeholder="Telefone"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div className="formFlex">
              <FormGroup>
                <label>Endereço</label>
                <input
                  type="text"
                  name="sonAdress"
                  placeholder="Endereço"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Celular</label>
                <input
                  type="text"
                  name="sonMobile"
                  placeholder="Celular"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div className="formFlex">
              <FormGroup>
                <label>Bairro</label>
                <input
                  type="text"
                  name="sonDistrict"
                  placeholder="Bairro"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Cidade</label>
                <input
                  type="text"
                  name="sonCity"
                  placeholder="Cidade"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Cep</label>
                <input
                  type="text"
                  name="sonZip_code"
                  placeholder="Cep"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div className="formFlex">
              <FormGroup>
                <label>Estado Civil</label>
                <input
                  type="text"
                  name="sonMaritalStatus"
                  placeholder="Estado Civil"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Profissão</label>
                <input
                  type="text"
                  name="sonProfession"
                  placeholder="Profissão"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div className="formFlex">
              <FormGroup>
                <label>Nascimento</label>
                <input
                  type="date"
                  name="sonBirth"
                  placeholder="Nascimento"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Email</label>
                <input
                  type="text"
                  name="sonEmail"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div className="formFlex">
              <FormGroup>
                <label>Cpf</label>
                <input
                  type="text"
                  name="sonCpf"
                  placeholder="Cpf"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>RG</label>
                <input
                  type="text"
                  name="sonRg"
                  placeholder="RG"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Nacionalidade</label>
                <input
                  type="text"
                  name="sonNacionality"
                  placeholder="Nacionalidade"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>

            <h3 style={{ textAlign: "center", marginTop: "1rem" }}>
              Dados Bancários
            </h3>
            <div className="formFlex">
              <FormGroup>
                <label>Banco</label>
                <input
                  type="text"
                  name="bank"
                  placeholder="Banco"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Ag</label>
                <input
                  type="text"
                  name="ag"
                  placeholder="Ag"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Conta</label>
                <input
                  type="text"
                  name="count"
                  placeholder="Conta"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup>
                <label>Nome</label>
                <input
                  type="text"
                  name="nameCount"
                  placeholder="Nome"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>

            <FormGroup>
              <ButtonControl type="submit" style={{ margin: "10px auto 0" }}>
                Cadastrar
              </ButtonControl>
            </FormGroup>
          </form>
        </ContainerForm>
      )}
      {listOwners && (
        <Table owners={owners} getOwners={getOwners} handleEdit={handleEdit} />
      )}

      {newRegister && (
        <ContainerForm
          style={{
            borderRadius: " 20px",
            boxShadow: "0 0 20px black",
            width: "90%",
          }}
        >
          <form onSubmit={handleSubmit}>
            <h3 style={{ textAlign: "center", marginTop: "1rem" }}>Locador</h3>
            <div className="formFlex">
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
                <label>Telefone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Telefone"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div className="formFlex">
              <FormGroup>
                <label>Endereço</label>
                <input
                  type="text"
                  name="adress"
                  placeholder="Endereço"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Celular</label>
                <input
                  type="text"
                  name="mobile"
                  placeholder="Celular"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div className="formFlex">
              <FormGroup>
                <label>Bairro</label>
                <input
                  type="text"
                  name="district"
                  placeholder="Bairro"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Cidade</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Cidade"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Cep</label>
                <input
                  type="text"
                  name="zip_code"
                  placeholder="Cep"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div className="formFlex">
              <FormGroup>
                <label>Estado Civil</label>
                <input
                  type="text"
                  name="maritalStatus"
                  placeholder="Estado Civil"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Profissão</label>
                <input
                  type="text"
                  name="profession"
                  placeholder="Profissão"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div className="formFlex">
              <FormGroup>
                <label>Nascimento</label>
                <input
                  type="date"
                  name="birth"
                  placeholder="Nascimento"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div className="formFlex">
              <FormGroup>
                <label>Cpf</label>
                <input
                  type="text"
                  name="cpf"
                  placeholder="Cpf"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>RG</label>
                <input
                  type="text"
                  name="rg"
                  placeholder="RG"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Nacionalidade</label>
                <input
                  type="text"
                  name="nacionality"
                  placeholder="Nacionalidade"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>

            <h3 style={{ textAlign: "center", marginTop: "1rem" }}>
              Representante
            </h3>
            <div className="formFlex">
              <FormGroup>
                <label>Nome</label>
                <input
                  type="text"
                  name="sonName"
                  placeholder="Nome"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Telefone</label>
                <input
                  type="text"
                  name="sonPhone"
                  placeholder="Telefone"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div className="formFlex">
              <FormGroup>
                <label>Endereço</label>
                <input
                  type="text"
                  name="sonAdress"
                  placeholder="Endereço"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Celular</label>
                <input
                  type="text"
                  name="sonMobile"
                  placeholder="Celular"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div className="formFlex">
              <FormGroup>
                <label>Bairro</label>
                <input
                  type="text"
                  name="sonDistrict"
                  placeholder="Bairro"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Cidade</label>
                <input
                  type="text"
                  name="sonCity"
                  placeholder="Cidade"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Cep</label>
                <input
                  type="text"
                  name="sonZip_code"
                  placeholder="Cep"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div className="formFlex">
              <FormGroup>
                <label>Estado Civil</label>
                <input
                  type="text"
                  name="sonMaritalStatus"
                  placeholder="Estado Civil"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Profissão</label>
                <input
                  type="text"
                  name="sonProfession"
                  placeholder="Profissão"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div className="formFlex">
              <FormGroup>
                <label>Nascimento</label>
                <input
                  type="date"
                  name="sonBirth"
                  placeholder="Nascimento"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Email</label>
                <input
                  type="text"
                  name="sonEmail"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div className="formFlex">
              <FormGroup>
                <label>Cpf</label>
                <input
                  type="text"
                  name="sonCpf"
                  placeholder="Cpf"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>RG</label>
                <input
                  type="text"
                  name="sonRg"
                  placeholder="RG"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Nacionalidade</label>
                <input
                  type="text"
                  name="sonNacionality"
                  placeholder="Nacionalidade"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>

            <h3 style={{ textAlign: "center", marginTop: "1rem" }}>
              Dados Bancários
            </h3>
            <div className="formFlex">
              <FormGroup>
                <label>Banco</label>
                <input
                  type="text"
                  name="bank"
                  placeholder="Banco"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Ag</label>
                <input
                  type="text"
                  name="ag"
                  placeholder="Ag"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Conta</label>
                <input
                  type="text"
                  name="count"
                  placeholder="Conta"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup>
                <label>Nome</label>
                <input
                  type="text"
                  name="nameCount"
                  placeholder="Nome"
                  onChange={handleChange}
                />
              </FormGroup>
            </div>

            <FormGroup
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <ButtonControl type="submit" style={{ margin: "10px auto 0" }}>
                Cadastrar
              </ButtonControl>
              <ButtonControl
                type="button"
                onClick={() => setNewRegister(false)}
                style={{ margin: "10px auto 0" }}
              >
                Cancelar
              </ButtonControl>
            </FormGroup>
          </form>
        </ContainerForm>
      )}
    </div>
  );
};

export default Owners;
