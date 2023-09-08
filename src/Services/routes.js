import { db } from "../Configs/FirebaseConfig";
import {
  addDoc,
  doc,
  query,
  getDocs,
  collection,
  setDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
} from "firebase/storage";
import { getAuth } from "firebase/auth";

/******Função que faz o Get dos proprietários******/
export const fetchProprietarios = async () => {
  const data = db.collection("proprietarios");
  const response = await data.get();
  return response;
};

/******Função que faz o Get dos inquilinos******/
export const fetchInquilinos = async () => {
  const data = db.collection("inquilinos");
  const response = await data.get();
  return response;
};

/******Função que faz o Get dos usuários******/
export const fetchUsers = async () => {
  const data = db.collection("users");
  const response = await data.get();
  return response;
};

/******Função que faz o Get dos imóveis******/
export const fetchProperties = async () => {
  const data = db.collection("imoveis");
  const response = await data.get();
  return response;
};

/******Função que faz o Get geral dos relatorios******/
export const fetchRelatories = async () => {
  const data = db.collection("relatorios");
  const response = await data.get();
  return response;
};

/******Função que faz o Get especifico dos relatorios******/
export const fetchRelatory = async (period) => {
  const data = db.collection(`relatorios/${period}`);
  const response = await data
    .get()
    .then((doc) => {
      return { status: 200, data: doc };
    })
    .catch((err) => {
      return { status: 400 };
    });
  return response;
};

/******Função que faz o Get das imagens de relatorio******/
export const imagesSurvey = (item, setImages) => {
  setImages([]);
  const storage = getStorage();
  const listRef = ref(storage, `survey/${item.propertie}-${item.renter}`);
  listAll(listRef)
    //storage.ref().child(storage, `survey/${item.propertie}-${item.renter}`).listAll()
    .then((res) => {
      res.items.map((prefix) => {
        const listRefix = ref(
          storage,
          `survey/${item.propertie}-${item.renter}/${prefix.name}`
        );
        getDownloadURL(listRefix).then((url) => {
          setImages((prevState) => [
            ...prevState,
            { name: prefix.name, url: url },
          ]);
        });
      });
      return { status: 200 };
    })
    .catch((err) => {
      return { status: 400, data: err };
    });
};

/******Função que adiciona inquilino******/
export const addRenter = async (form) => {


  const response = await db.collection("inquilinos").add(
    {
      name: form.name,
      phone: form.phone,
      phone2: form.phone2,
      phone3: form.phone3,
      maritalStatus: form.maritalStatus,
      profession: form.profession,
      nationality: form.nationality,
      birth: form.birth,
      email: form.email,
      cpf: form.cpf,
      rg: form.rg,
    }
  )
    .then((doc) => {
      return { data: doc, status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });

  return response;
};

/******Função que adiciona usuário******/
export const addUser = async (email, uid, role, name) => {

  const response = await db
    .collection("users")
    .add({
      login: email,
      uid: uid,
      role: role,
      name: name,
      active: true
    })
    .then((doc) => {
      return { data: doc, status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });

  return response;
};

/******Função que adiciona proprietário******/
export const addProp = async (form) => {
  const response = await db
    .collection("proprietarios")
    .add({
      name: form.name.value,
      phone: form.phone.value,
      adress: form.adress.value,
      mobile: form.mobile.value,
      district: form.district.value,
      city: form.city.value,
      zip_code: form.zip_code.value,
      maritalStatus: form.maritalStatus.value,
      profession: form.profession.value,
      birth: form.birth.value,
      email: form.email.value,
      cpf: form.cpf.value,
      rg: form.rg.value,
      nacionality: form.nacionality.value,
      sonName: form.sonName.value,
      sonPhone: form.sonPhone.value,
      sonAdress: form.sonAdress.value,
      sonMobile: form.sonMobile.value,
      sonDistrict: form.sonDistrict.value,
      sonCity: form.sonCity.value,
      sonZip_code: form.sonZip_code.value,
      sonMaritalStatus: form.sonMaritalStatus.value,
      sonProfession: form.sonProfession.value,
      sonBirth: form.sonBirth.value,
      sonEmail: form.sonEmail.value,
      sonCpf: form.sonCpf.value,
      sonRg: form.sonRg.value,
      sonNacionality: form.sonNacionality.value,
      bank: form.bank.value,
      ag: form.ag.value,
      count: form.count.value,
      nameCount: form.nameCount.value,
    })
    .then((doc) => {
      return { data: doc, status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });

  return response;
};

/******Função que adiciona imovel******/
export const addPropertie = async (form, ownerRegister) => {
  const response = await db
    .collection(`imoveis`)
    .doc(form.codigo.value)
    .set({
      codigo: form.codigo.value,
      city: form.city.value,
      state: form.state.value,
      district: form.district.value,
      street: form.street.value,
      number: form.number.value,
      zip_code: form.zip_code.value,
      owner: ownerRegister,
      renter: form.renter.value,
      status: form.status.value,
      description: form.description.value,
    })
    .then((doc) => {
      return { status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });

  return response;
};

/******Função que cria novo documento de relatorio, se não existir ainda será criado pra depois salvar os dados completos******/
export const createDocRelatory = async (item, data) => {
  //const response = await db.collection(`relatorios/${item.owner}/${item.reference}`).doc(item.date).set(data)
  //const response = await db.collection(`relatorios`).doc(item.owner).collection(item.reference).doc(item.date).set(data)

  const response = await db
    .collection(`relatorios`)
    .doc(item.propertie)
    .set({ status: "criando" })

    .then((doc) => {
      return { status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });

  return response;
};

/******Função que cria nova coleção de relatorio******/
export const createColection = async (item, data) => {
  //const response = await db.collection(`relatorios/${item.owner}/${item.reference}`).doc(item.date).set(data)
  //const response = await db.collection(`relatorios`).doc(item.owner).collection(item.reference).doc(item.date).set(data)

  const response = await db
    .collection(`relatorios`)
    .doc(item.propertie)
    .collection(item.reference)
    .doc(item.date)
    .set(data)

    .then((doc) => {
      return { status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });

  return response;
};

/*****Função que adiciona imagens de vistoria *****/
export const addSurvey = async (data, setUploadProgress, setLoading) => {
  const storage = getStorage();
  await data.images.forEach((file) => {
    setLoading(true);
    const storageRef = ref(
      storage,
      `survey/${data.propertie}-${data.renter}/` + file.name
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");

            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            console.log("unauthorized");
            break;
          case "storage/canceled":
            console.log("canceled");
            return { status: 400 };
            break;
          case "storage/unknown":
            console.log("unknown");
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref);
        setLoading(false);
      }
    );
  });
  // .then(() => {
  //   return(
  //     {status: 200}
  //   )
  // })
  // .catch((err) => {
  //   return(
  //     {status: 400}
  //   )
  // })
  console.log("finalizou, ");
  //return response
};

/******Função que faz o delete do inquilino******/
export const deleteRenter = async (id) => {
  const response = await db
    .collection("inquilinos")
    .doc(id)
    .delete()
    .then(() => {
      return { status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });
  return response;
};

/******Função que faz o delete do usuário******/
export const deleteUserFirestore = async (id) => {
  const response = await db
    .collection("users")
    .doc(id)
    .delete()
    .then(() => {
      return { status: 200 };
    })
    .catch((err) => {
      console.log(err);
      return { status: 400 };
    });
  return response;
};

/******Função que faz o delete dos proprietários******/
export const deleteProp = async (id) => {
  const response = await db
    .collection("proprietarios")
    .doc(id)
    .delete()
    .then(() => {
      return { status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });
  return response;
};

/******Função que faz o delete dos imoveis******/
export const deletePropertie = async (id) => {
  const response = await db
    .collection("imoveis")
    .doc(id)
    .delete()
    .then(() => {
      return { status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });
  return response;
};

/******Função que edição do inquilino******/
export const changeRenter = async (item) => {
  const response = await db
    .collection(`inquilinos`)
    .doc(item.id)
    .update({
      name: item.name,
      phone: item.phone,
      phone2: item.phone2,
      phone3: item.phone3,
      maritalStatus: item.maritalStatus,
      profession: item.profession,
      nationality: item.nationality,
      birth: item.birth,
      email: item.email,
      cpf: item.cpf,
      rg: item.rg,
    })
    .then(() => {
      return { status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });
  return response;
};

/******Função que edição do usuário******/
export const changeUser = async (item) => {
  const response = await db
    .collection(`users`)
    .doc(item.id)
    .update({
      uid: item.uid,
      login: item.login,
      role: item.role,
      active: item.active,
    })
    .then(() => {
      return { status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });
  return response;
};

/******Função que edição dos proprietarios******/
export const changeOwner = async (item) => {
  const response = await db
    .collection(`proprietarios`)
    .doc(item.id)
    .update({
      name: item.name,
      phone: item.phone,
      adress: item.adress,
      mobile: item.mobile,
      district: item.district,
      city: item.city,
      zip_code: item.zip_code,
      maritalStatus: item.maritalStatus,
      profession: item.profession,
      birth: item.birth,
      email: item.email,
      cpf: item.cpf,
      rg: item.rg,
      nacionality: item.nacionality,
      sonName: item.sonName,
      sonPhone: item.sonPhone,
      sonAdress: item.sonAdress,
      sonMobile: item.sonMobile,
      sonDistrict: item.sonDistrict,
      sonCity: item.sonCity,
      sonZip_code: item.sonZip_code,
      sonMaritalStatus: item.sonMaritalStatus,
      sonProfession: item.sonProfession,
      sonBirth: item.sonBirth,
      sonEmail: item.sonEmail,
      sonCpf: item.sonCpf,
      sonRg: item.sonRg,
      sonNacionality: item.sonNacionality,
      bank: item.bank,
      ag: item.ag,
      count: item.count,
      nameCount: item.nameCount,
    })
    .then(() => {
      return { status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });
  return response;
};

/******Função que edição dos imoveis******/
export const changePropertie = async (item, ownerEditRegister) => {
  const response = await db
    .collection(`imoveis`)
    .doc(item.id.value)
    .update({
      codigo: item.codigo.value,
      city: item.city.value,
      state: item.state.value,
      district: item.district.value,
      street: item.street.value,
      number: item.number.value,
      zip_code: item.zip_code.value,
      owner: ownerEditRegister,
      renter: item.renter.value,
      status: item.status.value,
    })
    .then(() => {
      return { status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });
  return response;
};
