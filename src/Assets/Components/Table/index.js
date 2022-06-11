import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './styles.scss'

export default function DataTable({owners, handleEdit}) {    
  const [newRow,setNewRow] = React.useState([])    
  const [heaveRow, setHeaveRow] = React.useState(false)  

  React.useEffect(()=>{
    handleListOwners()
  },[])  
  

  const handleListOwners = () => {                
    let rowsConfig = []
    for(let x=0;x<owners.length;x++){        
      const newItem = {   
          id:owners[x][1].id,
          name:owners[x][0].name, 
          adress: owners[x][0].adress,
          mobile: owners[x][0].mobile,
          district: owners[x][0].district,
          city: owners[x][0].city,
          zip_code: owners[x][0].zip_code,
          maritalStatus: owners[x][0].maritalStatus,
          profession: owners[x][0].profession,
          birth: owners[x][0].birth,
          phone:owners[x][0].phone, 
          email:owners[x][0].email, 
          cpf: owners[x][0].cpf,
          rg: owners[x][0].rg,
          nacionality: owners[x][0].nacionality,
          sonName: owners[x][0].sonName,
          sonPhone: owners[x][0].sonPhone,
          sonAdress: owners[x][0].sonAdress,
          sonMobile: owners[x][0].sonMobile,
          sonDistrict: owners[x][0].sonDistrict,
          sonCity: owners[x][0].sonCity,
          sonZip_code: owners[x][0].sonZip_code,
          sonMaritalStatus: owners[x][0].sonMaritalStatus,
          sonProfession: owners[x][0].sonProfession,
          sonBirth: owners[x][0].sonBirth,
          sonEmail: owners[x][0].sonEmail,
          sonCpf: owners[x][0].sonCpf,
          sonRg: owners[x][0].sonRg,
          sonNacionality: owners[x][0].sonNacionality,
          bank: owners[x][0].bank,
          ag: owners[x][0].ag,
          count: owners[x][0].count,
          nameCount: owners[x][0].nameCount          
      }
      rowsConfig = rowsConfig.concat(newItem)
    }
    setNewRow(rowsConfig)
    setHeaveRow(true)
  }


  const columns = [
    //{ field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nome', width: 200 },
    { 
      field: 'phone', 
      headerName: 'Telefone', 
      sortable: false,
      width: 130 
    },
    {
      field: 'email',
      headerName: 'Email', 
      sortable: false,   
      width: 190,
    },
    {
      field: 'cpf',
      headerName: 'CPF',          
      width: 130,    
    },
  ];  

      

  
  return (
    <div style={{ height: 400, width: '100%' }}>
      {heaveRow &&      
        <DataGrid
          rows={newRow}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          //checkboxSelection
          GridRowParams                    
          onRowClick={(e)=>handleEdit(e.row)}          
        />              
      }      
    </div>
  );
}
