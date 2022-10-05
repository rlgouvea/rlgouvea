import { useEffect, useState } from 'react'
import * as React from 'react'
import { useDropzone } from 'react-dropzone'
import { BiTrash } from "react-icons/bi"
import "./surveyStyle.scss"
import { ButtonControl, ContainerForm, FormGroup } from "../../Assets/Components/GlobalStyles"
import { addSurvey, fetchInquilinos, fetchProperties, imagesSurvey } from '../../Services/routes'
import Loading from '../../Assets/Components/Loader'
import AlertPopup from '../../Assets/Components/AlertPopup'
import { Link } from 'react-router-dom'
import FileSaver from "file-saver"

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { ImageDownloader } from "@samvera/image-downloader"
import { Carousel } from 'react-responsive-carousel'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Survey = () => {
    const [imageUpload, setImageUpload] = useState([])
    const [loading, setLoading] = useState(false)
    const [properties, setProperties] = useState([])
    const [uploadProgress, setUploadProgress] = useState()
    const [renters, setRenters] = useState([])
    const [title, setTitle] = useState()
    const [status, setStatus] = useState()
    const [alert, setAlert] = useState(false)
    const [images, setImages] = useState([])    
    const [option, setOption] = useState("")   

    const [form, setForm] = useState({
        value:{
            value:"",
            error: false
        },
        owner:{
            value:"",
            error: false
        },
        propertie:{
            value:"",
            error: false
        },
        day:{
            value:"",
            error: false
        },
        month:{
            value:"",
            error: false
        },
        year:{
            value:"",
            error: false
        },
        renter:{
            value:"",
            error: false
        },        
    })

    useEffect(()=>{            
        
        const getProperties = async () => {        
            setLoading(true)
            let controlPropertie = ([])
            setProperties([])
            const response = await fetchProperties()
            response.docs.forEach(item =>{                               
                //setProperties(prevState => [...prevState, [item.data(), {id:item.id}]])
                let teste = [item.data()]
                teste[0].id = item.id
                controlPropertie = controlPropertie.concat(teste)                
            })        
            setProperties(controlPropertie)
            setLoading(false)            
        }

        const getRenters = async () => {
            setLoading(true)
            setRenters([])
            const response = await fetchInquilinos()
            response.docs.forEach(item =>{                               
                setRenters(prevState => [...prevState, [item.data(), {id:item.id}]])      
            })   
            setLoading(false)
        }

        getProperties()
        getRenters()
    },[])    

    const { getRootProps, getInputProps } = useDropzone({
        accepted: 'images/*',
        onDrop: (acceptedFile) => {
          const newFiles = acceptedFile.map(file => {
            return Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          })
          setImageUpload([
            ...imageUpload,
            ...newFiles
          ])
        }
    })    

    const handleRemoveFile = fileName => {
        const newFileState = imageUpload.filter(file => file.name !== fileName)
        setImageUpload(newFileState)
    
    }

    const handleEdit = (e) => {
        const {name, value} = e.target
        
        setForm({
            ...form,
            [name]:{
                value,
                error: false
            }
        })    
    }
    
    const handleUpload = async () => {
        setLoading(true)
        const data = {
            images: imageUpload,
            propertie: form.propertie.value,
            renter: form.renter.value
        }
        const response = await addSurvey(data, setUploadProgress, setLoading, setLoading)
        
        if(response.status === 200){
            // setTitle("Cadastrado com sucesso!")
            // setAlert(true)  
            console.log('cadastrado')  
            setLoading(false)                    
        } else {
            console.log('não cadastrado')
            setLoading(false)
        }
        setLoading(false)
    }

    const getImages = async () => {
        setLoading(true)
        const data = {
            propertie: form.propertie.value,
            renter: form.renter.value
        }
        await imagesSurvey(data, setImages)        
        setLoading(false)        
    }                    


    function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
        size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
    }
    
    return(
        <div className='containerSurvey'>
            {
                loading &&
                <Loading/>
            }
            {
                alert &&
                <AlertPopup
                view={alert}
                setView={setAlert}
                title={title} 
                status={status}           
                />  
            }   
            <ContainerForm style={{width:"95%", border:"none"}}>
                <div className='menuHeader'>
                    <ButtonControl onClick={()=>setOption("register")}>Cadastrar</ButtonControl>
                    <ButtonControl onClick={()=>setOption("search")}>Pesquisar</ButtonControl>
                </div>
                {(option === "register" || option === "search") &&
                    <div className='formFlex'>
                        <FormGroup>
                            <label>Selecione o imóvel</label>
                            <select name="propertie" onChange={handleEdit}>
                                <option selected disabled>Selecione o imóvel</option>
                                {
                                    properties.length> 0 &&                
                                    properties.map((propertie, index)=>(
                                        <option key={index} value={propertie.codigo}>
                                            Cód:{propertie.codigo} - {propertie.district} - {propertie.street}, {propertie.number}
                                        </option>
                                    ))
                                }
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <label>Selecione o inquilino</label>
                            <select name="renter" onChange={handleEdit}>
                                <option selected disabled>Selecione o inquilino</option>
                                {
                                    renters.length> 0 &&                
                                    renters.map((renter, index)=>(
                                        <option key={index} value={renter[0].name}>
                                            {renter[0].name}
                                        </option>
                                    ))
                                }
                            </select>
                        </FormGroup>
                    </div>                
                }
                {option === "register" &&
                    <div className='thumbsContainer'>
                        <div className='dropzone' {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>
                            Clique para adicionar ou arraste a imagem aqui.
                        </p>
                        </div>
                        {
                        imageUpload &&
                        imageUpload.map(file => (
                            <div
                            key={file.name}
                            className='thumb'
                            style={{ backgroundImage: `url(${file.preview})` }}
                            >
                            <div className='mask' >
                                <BiTrash className='maskTrash' color='white' size='2em' onClick={() => handleRemoveFile(file.name)} />
                            </div>
                            </div>
                        ))
                        }
                    </div>
                }
            </ContainerForm>        
            {option === "register" &&
                <ButtonControl onClick={()=>handleUpload()}>Enviar</ButtonControl>
            }   
            {option === "search" &&
                <ButtonControl onClick={()=>getImages()}>Buscar</ButtonControl>
            }                                     
            
            {loading && uploadProgress}
            
            {
                images.length > 0 &&
                <>
                <div className='albumContainer'>                 
                    <ImageList
                    sx={{ width: '100%', 
                    backgroundColor: 'whitesmoke', 
                    display:'flex',
                    justifyContent:'center' }}
                    variant="quilted"
                    cols={4}
                    rowHeight={170}
                    gap={5}
                    >
                        {images.map((item) => (
                            <ImageListItem className='card' key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                            <img
                                {...srcset(item.url, 121, item.rows, item.cols)}
                                alt={item.title}
                                loading="lazy"
                            />
                            <div className='link'>
                                <ImageDownloader
                                imageUrl={item.url}
                                imageTitle={item.name}
                                style={{cursor:'pointer', 
                                backgroundColor: 'transparent',
                                border:'none',
                                color:'black',
                                fontSize:'1em'
                                }}
                                >
                                Baixar
                                </ImageDownloader>
                            </div>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>                
                </>
            }            
        </div>
    )
}

export default Survey