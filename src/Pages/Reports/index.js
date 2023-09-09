/* eslint-disable no-loop-func */
import { useEffect, useState, useContext } from "react";
import AlertPopup from "../../Assets/Components/AlertPopup";
import {
  ButtonControl,
  ContainerForm,
  FormGroup,
} from "../../Assets/Components/GlobalStyles";
import Loading from "../../Assets/Components/Loader";
import {
  addRelatory,
  changeRelatory,
  deleteRelatory,
  fetchProperties,
  fetchProprietarios,
  fetchRelatories,
  fetchRelatory,
} from "../../Services/routes";
import "./stylesReports.scss";
import { Context } from "../../Private";
import { Typography } from "@mui/material";
import TableRelatory from "../../Assets/Components/Table/tableRelatory";
import FormEditRelatory from "../../Assets/Components/FormEdit/FormEditRelatory";
import AlertDelete from "../../Assets/Components/AlertDelete";

const Reports = () => {
  const { userRole } = useContext(Context);
  const [properties, setProperties] = useState([]);
  const [relatories, setRelatories] = useState();
  const [loading, setLoading] = useState(false);
  const [payerSelect, setPayerSelect] = useState("");
  const [action, setAction] = useState();
  const [alert, setAlert] = useState(false);
  const [title, setTitle] = useState();
  const [status, setStatus] = useState();
  const [alertEdit, setAlertEdit] = useState(false)
  const [relatoryEdit, setRelatoryEdit] = useState('')
  const [alertDel, setAlertDel] = useState(false)
  const [relatoryControl, setRelatoryControl] = useState('')

  const [form, setForm] = useState({
    value: {
      value: "",
      error: false,
    },
    propertie: {
      value: "",
      error: false,
    },
    day: {
      value: "",
      error: false,
    },
    description: {
      value: "",
      error: false,
    },
    payer: {
      value: "",
      error: false,
    },
  });
  const [initialState, setInitialState] = useState({
    value: {
      value: "",
      error: false,
    },
    owner: {
      value: "",
      error: false,
    },
    propertie: {
      value: "",
      error: false,
    },
    day: {
      value: "",
      error: false,
    },
    month: {
      value: "",
      error: false,
    },
    year: {
      value: "",
      error: false,
    },
    description: {
      value: "",
      error: false,
    },
    payer: {
      value: "",
      error: false,
    },
  });

  useEffect(() => {
    const getProperties = async () => {
      setLoading(true);
      let controlPropertie = [];
      setProperties([]);
      const response = await fetchProperties();
      response.docs.forEach((item) => {
        //setProperties(prevState => [...prevState, [item.data(), {id:item.id}]])
        let teste = [item.data()];
        teste[0].id = item.id;
        controlPropertie = controlPropertie.concat(teste);
      });
      setProperties(controlPropertie);
      setLoading(false);
    };
    getProperties();
  }, []);

  const handleEdit = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: {
        value,
        error: false,
      },
    });
  };

  const handleSelectEdit = (item) => {
    setRelatoryEdit(item);
    setAlertEdit(true);
  };

  const handleDelete = (item) => {
    setAlertDel(true);
    setTitle("Tem certeza que deseja excluir esse relatório?");
    setRelatoryControl(item);
  };

  const handleDeleteRelatory = async () => {
    setLoading(true);
    const response = await deleteRelatory(relatoryControl.id);
    if (response.status === 200) {
      setLoading(false);
      setAlertDel(false);
      handleGetRalatoryes();
      setAlertEdit(false);
      setStatus("success");
      setTitle("Excluído com sucesso!");
      setAlert(true);
      // setListRenters(false);
    }
    setLoading(false);
  };

  const handleReload = () => {
    handleGetRalatoryes();
    setAlertEdit(false);
  };

  const handleEditRelatory = async (data) => {
    setLoading(true);
    const response = await changeRelatory(data);
    if (response.status === 200) {
      setStatus("success");
      setAlertEdit(false);
      setTitle("Atualizado com sucesso!");
      setAlert(true);
      handleGetRalatoryes();
    } else {
      console.log(response.err)
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const item = {
      description: form.description.value,
      payer: form.payer.value,
      date: new Date(form.day.value).toLocaleDateString("pt-BR", {
        timeZone: "UTC",
      }),
      propertie: form.propertie.value,
      value: form.value.value,
    };
    try {
      await addRelatory(item);
      setTitle("Relatório cadastrado com sucesso!");
      setStatus("success");
      setAlert(true);
      setForm(initialState);
      setAction();
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleGetRalatoryes = async () => {
    setLoading(true);
    try {
      setRelatories([]);
      const response = await fetchRelatories();
      let controlRelatories = [];
      response.docs.forEach((item) => {
        let teste = [item.data()];
        teste[0].id = item.id;
        controlRelatories = controlRelatories.concat(teste);
      });
      setRelatories(controlRelatories);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <div className="containerReports">
      {loading && <Loading />}
      {alert && (
        <AlertPopup
          view={alert}
          setView={setAlert}
          title={title}
          status={status}
        />
      )}
      {alertDel && (
        <AlertDelete
          title={title}
          view={alertDel}
          setView={setAlertDel}
          handle={handleDeleteRelatory}
          // item={renterControl}
        />
      )}
      {alertEdit && (
        <FormEditRelatory
          view={alertEdit}
          setView={setAlertEdit}
          item={relatoryEdit}
          handle={handleReload}
          handleDelete={handleDelete}
          handleEditRelatory={handleEditRelatory}
          properties={properties}
        />
      )}
      <Typography variant="h3" sx={{ mb: 3 }}>
        Relatórios
      </Typography>
      <div className="formFlex">
        {(userRole === "admin" || userRole === "atendente") && (
          <ButtonControl onClick={() => setAction("register")}>
            Registrar
          </ButtonControl>
        )}
        <ButtonControl
          onClick={() => {
            handleGetRalatoryes();
            setAction("search");
          }}
        >
          Consultar
        </ButtonControl>
      </div>
      {action === "register" && (
        <ContainerForm style={{ width: "95%", marginTop: "2rem" }}>
          <form onSubmit={handleSubmit}>
            <div className="formFlex">
              <FormGroup>
                <label>Selecione o imóvel</label>
                <select name="propertie" onChange={handleEdit}>
                  <option selected disabled>
                    Selecione o imóvel
                  </option>
                  {properties.length > 0 &&
                    properties.map((propertie, index) => (
                      <option key={index} value={propertie.codigo}>
                        Cód:{propertie.codigo} - {propertie.district} -{" "}
                        {propertie.street}, {propertie.number}
                      </option>
                    ))}
                </select>
              </FormGroup>
              <FormGroup>
                <label>Data</label>
                <input
                  type="date"
                  value={form.day.value}
                  name="day"
                  onChange={handleEdit}
                />
              </FormGroup>
            </div>
            <div className="formFlex">
              <FormGroup>
                <label>Descreva a alteração</label>
                <input
                  value={form.description.value}
                  type="text"
                  name="description"
                  placeholder="Alteração"
                  onChange={handleEdit}
                />
              </FormGroup>
              <FormGroup>
                <label>Valor</label>
                <input
                  type="text"
                  name="value"
                  value={form.value.value}
                  placeholder="Valor"
                  onChange={handleEdit}
                />
              </FormGroup>
            </div>
            <div className="formFlex">
                <FormGroup>
                <Typography>Pagador</Typography>
                  <div
                    className="formFlex"
                    style={{ justifyContent: "flex-start" }}
                  >
                    <input
                      type="radio"
                      checked={form.payer.value === "Imobiliária"}
                      onChange={() => {
                        setPayerSelect("Imobiliária");
                        setForm({
                          ...form,
                          payer: {
                            value: "Imobiliária",
                            error: false,
                          },
                        });
                      }}
                      style={{
                        width: "10px",
                        margin: 0,
                        padding: 5,
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                    />
                    <p style={{ width: "50%" }}>Imobiliária</p>
                  </div>
                  <div
                    className="formFlex"
                    style={{ justifyContent: "flex-start" }}
                  >
                    <input
                      type="radio"
                      checked={
                        form.payer.value !== "" &&
                        form.payer.value !== "Imobiliária"
                      }
                      onChange={() => {
                        setPayerSelect("other");
                        setForm({
                          ...form,
                          payer: {
                            value: "",
                            error: false,
                          },
                        });
                      }}
                      style={{
                        width: "10px",
                        margin: 0,
                        marginRight: "10px",
                        padding: 5,
                        cursor: "pointer",
                      }}
                    />
                    <p style={{ width: "50%" }}>Outro pagador</p>
                  </div>
                </FormGroup>

              {payerSelect === "other" && (
                <FormGroup>
                  <label>Outro pagador</label>
                  <input
                    type="text"
                    name="payer"
                    value={form.payer.value}
                    placeholder="Outro pagador"
                    onChange={handleEdit}
                  />
                </FormGroup>
              )}
            </div>

            <div className="formFlex">
              <ButtonControl type="submit">Salvar</ButtonControl>
            </div>
          </form>
        </ContainerForm>
      )}
      {action === "search" && relatories.length > 0 && (
        <TableRelatory relatories={relatories} handleEdit={handleSelectEdit} />
      )}
    </div>
  );
};

export default Reports;
