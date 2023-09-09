import * as React from 'react';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import './styles.scss'
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export default function TableSurvey({survey, setImages}) {    
  const [newRow,setNewRow] = React.useState([])    
  const [heaveRow, setHeaveRow] = React.useState(false)  
  
  React.useEffect(()=>{
    handleListSurveys()
  },[])  
  
  // lista os campos do bd na grid de exibição
  const handleListSurveys = () => {                
    let rowsConfig = []
    for(let x=0;x<survey.length;x++){        
      const newItem = {   
        id:survey[x][1].id,
        data:survey[x][0].data, 
        imovel:survey[x][0].imovel,
        inquilino:survey[x][0].inquilino,
        images:survey[x][0].imagens
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
      field: 'inquilino', 
      headerName: 'Inquilino', 
      width: 300 
    },
    { 
      field: 'images', 
      headerName: 'Imagens', 
      width: 100,
      renderCell: (params) =>
      params.row.images.length > 0 ? <CameraAltIcon onClick={()=>setImages(params.row.images)}   sx={{cursor:'pointer'}} /> : '',
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
               
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}   
        />              
      } 
    </div>
  );
}
