import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
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
          senha:users[x][0].senha,
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
      field: 'login', 
      headerName: 'Login', 
      width: 200 
    },
    { 
      field: 'senha', 
      headerName: 'Senha', 
      sortable: false,
      width: 130 
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
