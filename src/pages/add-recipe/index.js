import { useForm } from '../../hooks';
import { useEffect, useState } from 'react';
import { validateName, AddRecipes } from '../../constants';
import {
    CenteredPageContainer as AddRecipePageContainer,
    FormContainer,
    DescriptionTextarea,
    ImageInput, 
    TitleInput
} from '../../components'
import {
    Button
} from '@chakra-ui/react'
import { PageTitleStyled } from './styled'
  
export const AddRecipePage = () =>{

    const [form, onChangeInputs, clearInputs] = useForm({
        description: '',
        title: '',
        image: ''
    });

    const [isTitleValid, setIsTitleValid] = useState(false)
    const [isUrlValid, setIsUrlValid] = useState(true)

    useEffect(() =>{
        setIsTitleValid(validateName(form.title,4)) //validação de título
        setIsUrlValid(/http[s]?:\/\/[a-zA-Z]+\.com/.test(form.image)) //validação de url
    }, [form])

    const onSubmit = async (e) =>{

        e.preventDefault(); // faz com que a página não atualize ao enviar o formulário.

        try{
            if(isUrlValid && isTitleValid){
                await AddRecipes({
                    title: form.title,
                    description: form.description,
                    image: form.image
                });
            }
            alert('Receita cadastrada com sucesso!')
        }catch (e){
            alert(e.response.data.message);
        }
    }

    return(
       <AddRecipePageContainer>
            <FormContainer>
                <form onSubmit={onSubmit}>
                    <PageTitleStyled>Adicionar nova Receita</PageTitleStyled>

                    <TitleInput
                        value={form.title} 
                        onChange={onChangeInputs} 
                        isValid={isTitleValid}
                    />

                    <DescriptionTextarea
                        value={form.description} 
                        onChange={onChangeInputs} 
                        isValid={true}
                    />

                    <ImageInput
                        value={form.image} 
                        onChange={onChangeInputs} 
                        isValid={isUrlValid}
                    />

                    <Button type='submit' variant='formMain'>Cadastrar</Button>
                    
                </form>
            </FormContainer>
       </AddRecipePageContainer>
    )
}