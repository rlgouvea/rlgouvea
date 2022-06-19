import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './styles.scss'

export default function DataTable({properties, handleEdit}) {    
  const [newRow,setNewRow] = React.useState([])    
  const [heaveRow, setHeaveRow] = React.useState(false)  

  React.useEffect(()=>{
    handleListProperties()
  },[])  
  
  
  const handleListProperties = () => {                
    let rowsConfig = []
    for(let x=0;x<properties.length;x++){        
      const newItem = {   
        id:properties[x][0].codigo,
        codigo:properties[x][0].codigo,
        city:properties[x][0].city,
        district: properties[x][0].district,
        number: properties[x][0].number,
        owner: properties[x][0].owner,
        renter: properties[x][0].renter,
        state: properties[x][0].state,
        status: properties[x][0].status,
        street: properties[x][0].street,
        zip_code: properties[x][0].zip_code,
      }
      rowsConfig = rowsConfig.concat(newItem)
    }
    setNewRow(rowsConfig)
    setHeaveRow(true)
  }


  const columns = [
    //{ field: 'id', headerName: 'ID', width: 70 },
    { field: 'codigo', headerName: 'Código', width: 200 },
    { 
      field: 'street', 
      headerName: 'Rua', 
      sortable: false,
      width: 130 
    },
    {
      field: 'number',
      headerName: 'Número', 
      sortable: false,   
      width: 190,
    },
    {
      field: 'zip_code',
      headerName: 'CEP',          
      width: 130,    
    },
    {
      field: 'owner',
      headerName: 'Proprietário',          
      width: 130,    
    },
    {
      field: 'status',
      headerName: 'Status',          
      width: 130,    
    },
    {
      field: 'renter',
      headerName: 'Inquilino',          
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
