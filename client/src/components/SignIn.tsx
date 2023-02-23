import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'

type Form = {
    email: string
    password: string
}
function SignIn() {
    const [formInput, setFormInput] = useState<Form>({
        email: '',
        password: ''
    })


    
    const isError = formInput.email === '' && formInput.password === ''
  return (
    <FormControl
    isRequired
    border={'1px'}
    padding='1rem'
    >
        <FormLabel>
            Email
        </FormLabel>
        <Input
        type='email'
        onChange=''
        />
        <FormLabel>
            Password
        </FormLabel>
        <Input
        type='password'
        />
        <Button
        type='submit'
        mt={'1rem'}
        >
            Log-In
        </Button>
    </FormControl>
  )
}

export default SignIn