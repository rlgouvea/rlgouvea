import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './styles.scss'

export default function DataTable({renters, handleEdit}) {    
  const [newRow,setNewRow] = React.useState([])    
  const [heaveRow, setHeaveRow] = React.useState(false)  

  React.useEffect(()=>{
    handleListRenters()
  },[])  
  

  const handleListRenters = () => {                
    let rowsConfig = []
    for(let x=0;x<renters.length;x++){        
      const newItem = {   
          id:renters[x][1].id,
          name:renters[x][0].name, 
          phone:renters[x][0].phone, 
          phone2:renters[x][0].phone2, 
          phone3:renters[x][0].phone3, 
          maritalStatus: renters[x][0].maritalStatus,
          profession: renters[x][0].profession,
          nationality: renters[x][0].nationality  ,   
          birth: renters[x][0].birth,
          email:renters[x][0].email, 
          cpf: renters[x][0].cpf,
          rg: renters[x][0].rg,
      }
      rowsConfig = rowsConfig.concat(newItem)
    }
    setNewRow(rowsConfig)
    setHeaveRow(true)
  }

  /*
    Define quais colunas serão exibidas
  */
  const columns = [
    //{ field: 'id', headerName: 'ID', width: 70 },
    { 
      field: 'name', 
      headerName: 'Nome', 
      width: 200 
    },
    { 
      field: 'phone', 
      headerName: 'Telefone', 
      sortable: false,
      width: 130 
    },
    { 
      field: 'phone2', 
      headerName: 'Telefone 2', 
      sortable: false,
      width: 130 
    },
    { 
      field: 'phone3', 
      headerName: 'Telefone 3', 
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
      {/* {heaveRow &&       */}
        <DataGrid
          rows={newRow}
          
          // rows={
          //   renters.map(renter => {
          //       return {
          //           // name
          //       }
          //   })
          // }
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          //checkboxSelection
          // GridRowParams                    
          // onRowClick={(e)=>handleEdit(e.row)}          
        />              
      {/* }       */}
    </div>
  );
}
