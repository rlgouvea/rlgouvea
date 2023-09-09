import { useEffect, useState } from "react";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { BiTrash } from "react-icons/bi";
import "./surveyStyle.scss";
import {
  ButtonControl,
  ContainerForm,
  FormGroup,
} from "../../Assets/Components/GlobalStyles";
import {
  addSurvey,
  fetchEspecificSurvey,
  fetchImagesSurvey,
  fetchInquilinos,
  fetchProperties,
  imagesSurvey,
} from "../../Services/routes";
import Loading from "../../Assets/Components/Loader";
import AlertPopup from "../../Assets/Components/AlertPopup";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CardImage from "./cardImage";
import TableSurvey from "../../Assets/Components/Table/tableSurvey";

const Survey = () => {
  const [imageUpload, setImageUpload] = useState([]);
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [uploadProgress, setUploadProgress] = useState();
  const [renters, setRenters] = useState([]);
  const [title, setTitle] = useState();
  const [status, setStatus] = useState();
  const [alert, setAlert] = useState(false);
  const [images, setImages] = useState([]);
  const [option, setOption] = useState("");
  const [surveys, setSurveys] = useState([]);

  const [form, setForm] = useState({
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
    renter: {
      value: "",
      error: false,
    },
    data: {
      value: "",
      error: false,
    },
  });

  const initialState = {
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
    renter: {
      value: "",
      error: false,
    },
    data: {
        value: "",
        error: false,
      },
  };

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

    const getRenters = async () => {
      setLoading(true);
      setRenters([]);
      const response = await fetchInquilinos();
      //   response.docs.forEach((item) => {
      //     setRenters((prevState) => [
      //       ...prevState,
      //       [item.data(), { id: item.id }],
      //     ]);
      //   });

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
      setLoading(false);
      setRenters(newArray);
    };
    getProperties();
    getRenters();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accepted: "images/*",
    onDrop: (acceptedFile) => {
      const newFiles = acceptedFile.map((file) => {
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
      });
      setImageUpload([...imageUpload, ...newFiles]);
    },
  });

  const handleRemoveFile = (fileName) => {
    const newFileState = imageUpload.filter((file) => file.name !== fileName);
    setImageUpload(newFileState);
  };

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

  const handleUpload = async () => {
    setLoading(true);
    if (form.propertie.value !== "" || form.data.value !== "") {
      try {
        const data = {
          images: imageUpload,
          propertie: form.propertie.value,
          renter: form.renter.value,
          data: new Date(form.data.value).toLocaleDateString()
        };
        const response = await addSurvey(data, setUploadProgress, setLoading);

        setAlert(true);
        setTitle("Cadastrado com sucesso!");
        setStatus("success");
        setForm(initialState);
        setImageUpload([]);
      } catch (e) {
        setAlert(true);
        setTitle("Erro ao cadastrar, tente novamente.");
        setStatus("error");
      }
    } else {
      setAlert(true);
      setTitle("Selecione o imóvel!");
      setStatus("error");
    }
    setLoading(false);
  };

  const getImages = async () => {
    setLoading(true);
    setSurveys([]);
    const response = await fetchImagesSurvey();
    let newArray = [];
    response.docs.forEach((item) => {
      newArray.push([item.data(), { id: item.id }]);
    });
    setSurveys(newArray);
    setOption("search");
    setForm({
      ...form,
      propertie: {
        value: "",
        error: false,
      },
    });
    setImages([]);

    setLoading(false);
  };

  const getEspecificImages = async () => {
    setLoading(true);
    const data = {
      propertie: form.propertie.value,
    };
    try {
      setSurveys([]);
      setImages([]);
      const response = await fetchEspecificSurvey(data);
      let newArray = [];
      response.docs.forEach((item) => {
        newArray.push([item.data(), { id: item.id }]);
      });
      setSurveys(newArray);
      setOption("search");
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  return (
    <div className="containerSurvey">
      {loading && <Loading />}
      {alert && (
        <AlertPopup
          view={alert}
          setView={setAlert}
          title={title}
          status={status}
        />
      )}
      <ContainerForm style={{ width: "95%", border: "none" }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Vistorias
        </Typography>
        <div className="menuHeader">
          <ButtonControl
            onClick={() => {
              setOption("register");
              setForm(initialState);
              setImages([]);
            }}
          >
            Cadastrar
          </ButtonControl>
          <ButtonControl
            onClick={() => {
              getImages();
              //   setOption("search");
              //   setForm(initialState);
              //   setImages([]);
            }}
          >
            Pesquisar/Listar
          </ButtonControl>
        </div>
        {(option === "register" || option === "search") && (
          <div className="formFlex">
            <FormGroup>
              <InputLabel id="demo-simple-select-label">
                {option === "register"
                  ? "Selecione o imóvel"
                  : "Filtar por imóvel"}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={form.propertie.value}
                label="Selecione o imóvel"
                onChange={handleEdit}
                name="propertie"
              >
                {properties.length > 0 &&
                  properties.map((propertie, index) => (
                    <MenuItem key={index} value={propertie.codigo}>
                      Cód:{propertie.codigo} - {propertie.district} -{" "}
                      {propertie.street}, {propertie.number}
                    </MenuItem>
                  ))}
              </Select>
            </FormGroup>
            {option === "register" && (
              <>
                <FormGroup>
                  <InputLabel id="demo-simple-select-label">
                    Selecione o inquilino
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={form.renter.value}
                    label="Selecione o inquilino"
                    onChange={handleEdit}
                    name="renter"
                  >
                    {renters.length > 0 &&
                      renters.map((renter, index) => (
                        <MenuItem key={index} value={renter[0].name}>
                          {renter[0].name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormGroup>
                <FormGroup>
                  <InputLabel id="demo-simple-select-label">
                    Data da vistoria
                  </InputLabel>
                  <TextField
                    value={form.renter.data}
                    onChange={handleEdit}
                    name="data"
                    id="outlined-basic"
                    type="date"
                    variant="outlined"
                  />
                </FormGroup>
              </>
            )}
          </div>
        )}
        {option === "register" && (
          <div className="thumbsContainer">
            <div className="dropzone" {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Clique para adicionar ou arraste a imagem aqui.</p>
            </div>
            {imageUpload &&
              imageUpload.map((file) => (
                <div
                  key={file.name}
                  className="thumb"
                  style={{ backgroundImage: `url(${file.preview})` }}
                >
                  <div className="mask">
                    <BiTrash
                      className="maskTrash"
                      color="white"
                      size="2em"
                      onClick={() => handleRemoveFile(file.name)}
                    />
                  </div>
                </div>
              ))}
          </div>
        )}
      </ContainerForm>
      {option === "register" && (
        <ButtonControl onClick={() => handleUpload()}>Enviar</ButtonControl>
      )}
      {option === "search" && (
        <>
          <ButtonControl onClick={() => getEspecificImages()}>
            Buscar
          </ButtonControl>
          {images.length > 0 && (
            <>
              <div className="albumContainer">
                {images.map((item, i) => (
                  <CardImage key={i} item={item} />
                ))}
              </div>
            </>
          )}
          {surveys.length > 0 && (
            <TableSurvey survey={surveys} setImages={setImages} />
          )}
        </>
      )}

      {loading && uploadProgress}
    </div>
  );
};

export default Survey;
