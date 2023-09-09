import * as React from 'react';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import './styles.scss'
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export default function TableRelatory({relatories, handleEdit}) {    
  const [newRow,setNewRow] = React.useState([])    
  const [heaveRow, setHeaveRow] = React.useState(false)  
  
  React.useEffect(()=>{
    handleListSurveys()
  },[])  
  
  // lista os campos do bd na grid de exibição
  const handleListSurveys = () => {                
    let rowsConfig = []
    for(let x=0;x<relatories.length;x++){        
      const newItem = {   
        id:relatories[x].id,
        data:relatories[x].data, 
        imovel:relatories[x].imovel,
        descricao:relatories[x].descricao,
        pagador:relatories[x].pagador,
        valor:relatories[x].valor
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
      field: 'data', 
      headerName: 'Data', 
      width: 200 
    },
    { 
      field: 'imovel', 
      headerName: 'Imóvel', 
      width: 300 
    },
    { 
      field: 'descricao', 
      headerName: 'Descrição', 
      width: 300 
    },
    { 
      field: 'pagador', 
      headerName: 'Pagador', 
      width: 300 
    },
    { 
      field: 'valor', 
      headerName: 'Valor', 
      width: 200,
      renderCell: (params) =>
      'R$ ' + params.row.valor
    },
  ];  
   
  return (
    <div style={{ height: 400, width: '100%', marginTop:'30px' }}>
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
