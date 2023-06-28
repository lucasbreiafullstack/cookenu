import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Textarea
} from '@chakra-ui/react'

export const DescriptionTextarea = ({ isValid, value, onChange}) =>{
    return (
        <FormControl isInvalid={!isValid}>
            <FormLabel>Descrição:</FormLabel>
            <Textarea 
                name='description'
                value={value} 
                onChange={onChange}
                placeholder='Descrição da Receita'    
            />
                        
            {!isValid ? (
                <FormErrorMessage as='p'>
                    Nome deve ter ao menos 2 caracteres
                </FormErrorMessage>
            ) : undefined}
        </FormControl>
    )
}