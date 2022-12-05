import styled from "styled-components"

export const ContainerForm = styled.div`
    width: 80%;
    border: 1px solid rgb(163, 160, 160);
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction: column;
    padding: 1rem;

    form{
        width:80%;
    }

    @media(max-width:767px){
        width:90%;
        flex-wrap: wrap;
    }
`

export const FormGroup = styled.div`
    display:flex;    
    justify-content:center;
    flex-direction: column;
    margin: 1rem;
    width:100%;
    flex-wrap: wrap;

    input, select{
        border:none;
        border-bottom: 1px solid rgb(163, 160, 160);
        height: 2rem;
        padding: 5px;
        width: 100%;

        &:focus{
            outline: none;
            box-shadow: 1px 0px 2px black;
        }
    }

    
`

export const ButtonControl = styled.button`    
    width: 10rem;    
    padding: 10px;
    background-color: blue;
    color: white;
    transition: all .5s ;
    border-radius: 10px;
    margin: 5px;
    cursor: pointer;

    &:hover{
        font-weight: bold;
        border-radius: 0;
    }    
`