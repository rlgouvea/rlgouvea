import * as React from 'react';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import './styles.scss'

export default function DataTable({users, handleEdit}) {    
  const [newRow,setNewRow] = React.useState([])    
  const [heaveRow, setHeaveRow] = React.useState(false)  
  
  React.useEffect(()=>{
    handleListUsers()
  },[])  
  
  // lista os campos do bd na grid de exibição
  const handleListUsers = () => {                
    let rowsConfig = []
    for(let x=0;x<users.length;x++){        
      const newItem = {   
        id:users[x][1].id,
        login:users[x][0].login, 
        role:users[x][0].role,
        active:users[x][0].active,
        uid:users[x][0].uid,
        name:users[x][0].name,
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
      width: 300 
    },
    { 
      field: 'login', 
      headerName: 'Login', 
      width: 300 
    },
    { 
      field: 'role', 
      headerName: 'Permissão', 
      sortable: false,
      width: 130 
    },
    { 
      field: 'active', 
      headerName: 'Ativo', 
      sortable: false,
      width: 130,
      valueGetter: (params) =>
      params.row.active ? 'Sim' : 'Não',
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
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}   
        />              
      } 
    </div>
  );
}
