import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
import header from "../../Assets/img/header-contrato.jpg"

const VisualizarImpressao = ({form,owner,renterSelect}) => {    
    pdfMake.vfs = pdfFonts.pdfMake.vfs;    

    var imagem = {
        images: {
            building: 'https://img.freepik.com/fotos-gratis/3d-rendem-de-uma-mesa-de-madeira-com-uma-imagem-defocussed-de-um-barco-em-um-lago_1048-3432.jpg?w=2000'
        }
        // content: [
        //     {
        //         image: 'https://img.freepik.com/fotos-gratis/3d-rendem-de-uma-mesa-de-madeira-com-uma-imagem-defocussed-de-um-barco-em-um-lago_1048-3432.jpg?w=2000',
        //         width: 250,
        //         height: 250
        //     },  
        // ]
    }
    
    const headers = [
        {
           imagem
        }
        
        // {
        //     text: 'R.L. GOUVÊA Corretor de Imóveis Creci 40.710-F (Nova Pompéia Imóveis) Compra – Venda – Avaliação - Locações',
        //     fontSize: 20,
        //     bold: true,
        //     margin: [50, 20, 0, 45]
        // }
    ]    

    const details = [ 
        {
            imagem
        },  
        {
            text: 'INSTRUMENTO PARTICULAR DE CONTRATO DE LOCAÇÃO DE IMÓVEL RESIDENCIAL',
            fontSize: 15,
            bold: true,
            margin: [10, 30, 20, 50]
        },
        {
            text: 'CLÁUSULA 1ª - QUALIFICAÇÃO DAS PARTES',
            fontSize: 15,
            bold: true,
            margin: [10, 0, 0, 30]
        },
        {
            text: 'Proprietário',
            fontSize: 10,
            bold: true,
            margin: [10, 0, 0, 0]
        },
        {
            text: `Nome ou Razão Social: ${owner[0][0].name}`,
            fontSize: 10,
            margin: [10, 30, 20, 0]
        },
        {
            text: `Nacionalidade (se pessoa física): ${owner[0][0].nacionality}`,
            fontSize: 10,
            margin: [10, 30, 20, 0]
        },
        {
            text: `Estado Civil (se pessoa física): ${owner[0][0].maritalStatus}`,
            fontSize: 10,
            margin: [10, 30, 20, 0]
        },
        {
            text: `Profissão (se pessoa física): ${owner[0][0].profession}`,
            fontSize: 10,
            margin: [10, 30, 20, 0]
        },
        {
            text: `Identidade: ${owner[0][0].rg}`,
            fontSize: 10,
            margin: [10, 30, 20, 0]
        },
        {
            text: `CPF ou CNPJ: ${owner[0][0].cpf}`,
            fontSize: 10,
            margin: [10, 30, 20, 0]
        },
        {
            text: `Endereço: ${owner[0][0].adress}`,
            fontSize: 10,
            margin: [10, 30, 20, 0]
        },
    ]    

    const rodape = (currentPage, pageCount) => {
        return [
            {
                text: currentPage + ' / ' + pageCount,
                alignment: 'right',
                fontSize: 9,
                margin: [0, 10, 20, 0]
            }
        ]
    }

    const definitions = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],

        header: [headers],
        content: [details],
        footer: rodape
    }

    pdfMake.createPdf(definitions).open({}, window.open('', '_blank'));    
  }

  export default VisualizarImpressao