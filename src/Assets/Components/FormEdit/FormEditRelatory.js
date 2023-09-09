import { useEffect, useState } from "react";
import { changeRenter, deleteProp } from "../../../Services/routes";
import { ButtonControl, FormGroup } from "../GlobalStyles";
import AlertDelete from "../AlertDelete";
import Alert from "../Alert";
import "./styleFormEdit.scss";
import { Typography } from "@mui/material";

const FormEditRelatory = ({
  view,
  setView,
  item,
  handle,
  handleDelete,
  handleEditRelatory,
  properties,
}) => {
  const [renterControl, setRenterControl] = useState();
  const [payerSelect, setPayerSelect] = useState("");
  const [alertDel, setAlertDel] = useState(false);
  const [alert, setAlert] = useState(false);
  const [title, setTitle] = useState();
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

  function formatDate(date) {
    const year = date.getFullYear();
    const verificToDay = date.getDate();
    const day = verificToDay < 10 ? "0" + verificToDay : verificToDay;
    const verificday = date.getMonth() + 1;
    const month = verificday < 10 ? "0" + verificday : verificday;

    return `${year}-${month}-${day}`;
  }
  
  useEffect(() => {
    const data = new Date(item.data);
    setForm({
      value: {
        value: item.valor,
        error: false,
      },
      propertie: {
        value: item.imovel,
        error: false,
      },
      day: {
        value: formatDate(data),
        error: false,
      },
      description: {
        value: item.descricao,
        error: false,
      },
      payer: {
        value: item.pagador,
        error: false,
      },
    });
    if (item.pagador !== "Imobiliária") {
      setPayerSelect("other");
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      description: form.description.value,
      payer: form.payer.value,
      date: new Date(form.day.value).toLocaleDateString("pt-BR", {
        timeZone: "UTC",
      }),
      propertie: form.propertie.value,
      value: form.value.value,
      id: item.id
    };
    handleEditRelatory(data);
  };

  const handleAlertDel = () => {
    setRenterControl(item);
    setTitle("Tem certeza que deseja excluir esse proprietário?");
    setAlertDel(true);
  };

  return (
    <div className="containerEdit">
      <div className="wrapperEdit">
        {alertDel && (
          <AlertDelete
            title={title}
            view={view}
            setView={setView}
            handle={handleDelete}
            item={renterControl}
          />
        )}
        {alert && (
          <Alert title={title} view={view} setView={setView} handle={handle} />
        )}
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
        </form>
        <div className="controls">
          <ButtonControl onClick={handleSubmit}>Salvar</ButtonControl>
          <ButtonControl onClick={() => setView(!view)}>Cancelar</ButtonControl>
          <ButtonControl onClick={() => handleDelete(item)}>
            Deletar
          </ButtonControl>
        </div>
      </div>
    </div>
  );
};

export default FormEditRelatory;
