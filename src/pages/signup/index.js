import { useForm } from '../../hooks';
import { useState } from 'react';
import { validateEmail, validatePassword, validateName, Signup } from '../../constants';
import {
    CenteredPageContainer as SignupPageContainer,
    FormContainer,
    EmailInput,
    PasswordInput, 
    NameInput
} from '../../components'
import {
    Button
} from '@chakra-ui/react'
import logo from '../../assets/logo.png'
import {
    goToFeedPage,
} from '../../routes'
import { useNavigate } from "react-router-dom"
  
export const SignupPage = () =>{
    const navigate = useNavigate();

    const [form, onChangeInputs, clearInputs] = useForm({
        email: '',
        password: '',
        name: ''
    });

    const [isEmailValid, setIsEmailValid] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const [isNameValid, setIsNameValid] = useState(true)

    const onSubmit = async (e) =>{
        e.preventDefault(); // faz com que a página não atualize ao enviar o formulário.
        setIsEmailValid(validateEmail(form.email)) //validação de email
        setIsPasswordValid(validatePassword(form.password)) //validação de password
        setIsNameValid(validateName(form.name)) //validação de name
        try{
            const { token } = isNameValid && isEmailValid && isPasswordValid && await Signup({
                email: form.email,
                password: form.password,
                name: form.name

            });
            localStorage.setItem('cookenu.token', token);
            goToFeedPage(navigate)
        }catch (e){
            alert(e.response.data.message);
        }
    }

    return(
       <SignupPageContainer>
            <FormContainer>
                <form onSubmit={onSubmit}>
                    <img src={logo} alt='logo do cookenu'/>

                    <NameInput
                        value={form.name} 
                        onChange={onChangeInputs} 
                        isValid={isNameValid}
                    />

                    <EmailInput 
                        value={form.email} 
                        onChange={onChangeInputs} 
                        isValid={isEmailValid}
                    />

                    <PasswordInput
                        value={form.password} 
                        onChange={onChangeInputs}
                        isValid={isPasswordValid}
                    />
                    
                    <Button type='submit' variant='formMain'>Cadastrar</Button>
                    
                </form>
            </FormContainer>
       </SignupPageContainer>
    )
}