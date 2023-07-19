import { useEffect, useState } from "react"
import { changeOwner, deleteProp } from "../../../Services/routes"
import { ButtonControl, FormGroup } from "../GlobalStyles"
import AlertDelete from "../AlertDelete"
import Alert from "../Alert"
import "./styleFormEdit.scss"


const FormEdit = ({view, setView, item, handle, handleDelete, handleEditOwner}) => {    
    const [ownerControl, setOwnerControl] = useState()
    const [alertDel, setAlertDel] = useState(false)
    const [alert, setAlert] = useState(false)
    const [title, setTitle] = useState()
    const [form, setForm] = useState({
        name:{
            value:"",
            error: false
        },
        phone:{
            value:"",
            error: false
        },
        adress:{
            value:"",
            error: false
        },
        mobile:{
            value:"",
            error: false
        },
        district:{
            value:"",
            error: false
        },
        city:{
            value:"",
            error: false
        },
        zip_code:{
            value:"",
            error: false
        },
        maritalStatus:{
            value:"",
            error: false
        },
        profession:{
            value:"",
            error: false
        },
        birth:{
            value:"",
            error: false
        },
        email:{
            value:"",
            error: false
        },
        cpf:{
            value:"",
            error: false
        },
        rg:{
            value:"",
            error: false
        },
        nacionality:{
            value:"",
            error: false
        },
        sonName:{
            value:"",
            error: false
        },
        sonPhone:{
            value:"",
            error: false
        },
        sonAdress:{
            value:"",
            error: false
        },
        sonMobile:{
            value:"",
            error: false
        },
        sonDistrict:{
            value:"",
            error: false
        },
        sonCity:{
            value:"",
            error: false
        },
        sonZip_code:{
            value:"",
            error: false
        },
        sonMaritalStatus:{
            value:"",
            error: false
        },
        sonProfession:{
            value:"",
            error: false
        },
        sonBirth:{
            value:"",
            error: false
        },
        sonEmail:{
            value:"",
            error: false
        },
        sonCpf:{
            value:"",
            error: false
        },
        sonRg:{
            value:"",
            error: false
        },
        sonNacionality:{
            value:"",
            error: false
        },
        bank:{
            value:"",
            error: false
        },
        ag:{
            value:"",
            error: false
        },
        count:{
            value:"",
            error: false
        },
        nameCount:{
            value:"",
            error: false
        },
    })
    
    useEffect (()=>{
        setForm({
            name:{
                value:item.name,
                error: false
            },
            phone:{
                value:item.phone,
                error: false
            },
            adress:{
                value:item.adress,
                error: false
            },
            mobile:{
                value:item.mobile,
                error: false
            },
            district:{
                value:item.district,
                error: false
            },
            city:{
                value:item.city,
                error: false
            },
            zip_code:{
                value:item.zip_code,
                error: false
            },
            maritalStatus:{
                value:item.maritalStatus,
                error: false
            },
            profession:{
                value:item.profession,
                error: false
            },
            birth:{
                value:item.birth ,
                error: false
            },
            email:{
                value:item.email,
                error: false
            },
            cpf:{
                value:item.cpf,
                error: false
            },
            rg:{
                value:item.rg,
                error: false
            },
            nacionality:{
                value:item.nacionality,
                error: false
            },
            sonName:{
                value:item.sonName,
                error: false
            },
            sonPhone:{
                value:item.sonPhone,
                error: false
            },
            sonAdress:{
                value:item.sonAdress,
                error: false
            },
            sonMobile:{
                value:item.sonMobile,
                error: false
            },
            sonDistrict:{
                value:item.sonDistrict,
                error: false
            },
            sonCity:{
                value:item.sonCity,
                error: false
            },
            sonZip_code:{
                value:item.sonZip_code,
                error: false
            },
            sonMaritalStatus:{
                value:item.sonMaritalStatus,
                error: false
            },
            sonProfession:{
                value:item.sonProfession,
                error: false
            },
            sonBirth:{
                value:item.sonBirth,
                error: false
            },
            sonEmail:{
                value:item.sonEmail,
                error: false
            },
            sonCpf:{
                value:item.sonCpf,
                error: false
            },
            sonRg:{
                value:item.sonRg,
                error: false
            },
            sonNacionality:{
                value:item.sonNacionality,
                error: false
            },
            bank:{
                value:item.bank,
                error: false
            },
            ag:{
                value:item.ag,
                error: false
            },
            count:{
                value:item.count,
                error: false
            },
            nameCount:{
                value:item.nameCount,
                error: false
            },
        })
    },[])
    
    const handleChange = (e) => {
        const {name, value} = e.target

        setForm({
            ...form,
            [name]:{
                value,
                error: false
            }
        })
    }

     const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = {
            id: item.id,
            name: form.name.value.toUpperCase(),
            phone: form.phone.value,
            adress: form.adress.value.toUpperCase(),
            mobile: form.mobile.value,
            district: form.district.value.toUpperCase(),
            city: form.city.value.toUpperCase(),
            zip_code: form.zip_code.value,
            maritalStatus: form.maritalStatus.value.toUpperCase(),
            profession: form.profession.value.toUpperCase(),
            birth: form.birth.value,
            email: form.email.value.toLowerCase(),
            cpf: form.cpf.value,
            rg: form.rg.value,
            nacionality: form.nacionality.value.toUpperCase(),
            sonName: form.sonName.value.toUpperCase(),
            sonPhone: form.sonPhone.value,
            sonAdress: form.sonAdress.value.toUpperCase(),
            sonMobile: form.sonMobile.value,
            sonDistrict: form.sonDistrict.value.toUpperCase(),
            sonCity: form.sonCity.value.toUpperCase(),
            sonZip_code: form.sonZip_code.value,
            sonMaritalStatus: form.sonMaritalStatus.value.toUpperCase(),
            sonProfession: form.sonProfession.value.toUpperCase(),
            sonBirth: form.sonBirth.value,
            sonEmail: form.sonEmail.value.toLowerCase(),
            sonCpf: form.sonCpf.value,
            sonRg: form.sonRg.value,
            sonNacionality: form.sonNacionality.value.toUpperCase(),
            bank: form.bank.value.toUpperCase(),
            ag: form.ag.value,
            count: form.count.value.toUpperCase(),
            nameCount: form.nameCount.value.toUpperCase(),
        };
    
        handleEditOwner(data);
    };
    

    const handleAlertDel = () => {
        handleDelete(item)
        // setOwnerControl(item)
        // setTitle("Tem certeza que deseja excluir esse proprietário?")
        // setAlertDel(true)
    }

    
    return(
        <div className="containerEdit">
            <div className="wrapperEdit" style={{justifyContent:"flex-start"}}> 
                {
                    alertDel &&
                    <AlertDelete
                    title={title}
                    view={view}
                    setView={setView}
                    handle={handleDelete}
                    item={ownerControl}
                    />
                }                 
                <form>
                    <h3 style={{textAlign:'center',marginTop:'1rem'}}>Proprietário</h3>
                    <div className="formFlex">
                        <FormGroup>
                            <label>Nome</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nome"
                                value={form.name.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Telefone</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Telefone"
                                value={form.phone.value}
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
                                value={form.adress.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Celular</label>
                            <input
                                type="text"
                                name="mobile"
                                placeholder="Celular"
                                value={form.mobile.value}
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
                                value={form.district.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Cidade</label>
                            <input
                                type="text"
                                name="city"
                                placeholder="Cidade"
                                value={form.city.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Cep</label>
                            <input
                                type="text"
                                name="zip_code"
                                placeholder="Cep"
                                value={form.zip_code.value}
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
                                value={form.maritalStatus.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Profissão</label>
                            <input
                                type="text"
                                name="profession"
                                placeholder="Profissão"
                                value={form.profession.value}
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
                                value={form.birth.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={form.email.value}
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
                                value={form.cpf.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>RG</label>
                            <input
                                type="text"
                                name="rg"
                                placeholder="RG"
                                value={form.rg.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Nacionalidade</label>
                            <input
                                type="text"
                                name="nacionality"
                                placeholder="Nacionalidade"
                                value={form.nacionality.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </div>

                    <h3 style={{textAlign:'center',marginTop:'1rem'}}>Representante</h3>
                    <div className="formFlex">
                        <FormGroup>
                            <label>Nome</label>
                            <input
                                type="text"
                                name="sonName"
                                placeholder="Nome"
                                value={form.sonName.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Telefone</label>
                            <input
                                type="text"
                                name="sonPhone"
                                placeholder="Telefone"
                                value={form.sonPhone.value}
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
                                value={form.sonAdress.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Celular</label>
                            <input
                                type="text"
                                name="sonMobile"
                                placeholder="Celular"
                                value={form.sonMobile.value}
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
                                value={form.sonDistrict.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Cidade</label>
                            <input
                                type="text"
                                name="sonCity"
                                placeholder="Cidade"
                                value={form.sonCity.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Cep</label>
                            <input
                                type="text"
                                name="sonZip_code"
                                placeholder="Cep"
                                value={form.sonZip_code.value}
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
                                value={form.sonMaritalStatus.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Profissão</label>
                            <input
                                type="text"
                                name="sonProfession"
                                placeholder="Profissão"
                                value={form.sonProfession.value}
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
                                value={form.sonBirth.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Email</label>
                            <input
                                type="text"
                                name="sonEmail"
                                placeholder="Email"
                                value={form.sonEmail.value}
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
                                value={form.sonCpf.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>RG</label>
                            <input
                                type="text"
                                name="sonRg"
                                placeholder="RG"
                                value={form.sonRg.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Nacionalidade</label>
                            <input
                                type="text"
                                name="sonNacionality"
                                placeholder="Nacionalidade"
                                value={form.sonNacionality.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </div>
                        
                    <h3 style={{textAlign:'center',marginTop:'1rem'}}>Dados Bancários</h3>
                    <div className="formFlex">
                        <FormGroup>
                            <label>Banco</label>
                            <input
                                type="text"
                                name="bank"
                                placeholder="Banco"
                                value={form.bank.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Ag</label>
                            <input
                                type="text"
                                name="ag"
                                placeholder="Ag"
                                value={form.ag.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Conta</label>
                            <input
                                type="text"
                                name="count"
                                placeholder="Conta"
                                value={form.count.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </div> 
                    <div className="formFlex">
                        <FormGroup>
                            <label>Nome</label>
                            <input
                                type="text"
                                name="nameCount"
                                placeholder="Nome"
                                value={form.nameCount.value}
                                onChange={handleChange}
                            />
                        </FormGroup>                            
                    </div>                                                
                </form> 
                <div className="controls">
                    <ButtonControl                        
                    onClick={handleSubmit}                        
                    >
                        Salvar
                    </ButtonControl>
                    <ButtonControl 
                    onClick={()=>setView(!view)
                    }                        
                    >
                        Cancelar
                    </ButtonControl>
                    <ButtonControl 
                    onClick={()=>handleAlertDel()
                    }                        
                    >
                        Deletar
                    </ButtonControl>
                </div>
            </div>
        </div>
    )
}

export default FormEdit