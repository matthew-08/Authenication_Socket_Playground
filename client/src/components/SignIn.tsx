import { Button, FormControl, FormErrorMessage, FormLabel, Input, ButtonGroup, Heading} from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { VStack } from '@chakra-ui/react'
import {useForm} from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { json } from 'react-router-dom'


type UserForm = {
    username: string
    password: string
}

const validationSchema = Yup.object().shape({
    username: Yup.string()
    .required('Username is required')
    .min(6, 'Username must be at least 6 characters long')
    .max(20, 'Username must not exceed 20 characters'),
    password: Yup.string()
    .required('Password is required')
})
function SignIn() {
    const {register, handleSubmit, formState:{errors, dirtyFields} } = useForm<UserForm>({
        resolver: yupResolver(validationSchema)
    })
    
    const onSubmit = async (data:UserForm) => {
        const login = await fetch('http://localhost:3000/auth/signIn', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(data),
            headers:  {
                "Content-Type": 'application/json' 
            },
        }).then(res => res.json()).then(res => console.log(res))
        .catch(err => console.log(err));
    }
    console.log(dirtyFields);

    const isError = (input: keyof UserForm) => errors[input] ? true : false 
    
  return (
    <VStack
    as={'form'}
    w={{base: '90%', md: '500px'}}
    m='auto'
    align={'center'}
    spacing='1rem'
    border={'2px'}
    padding='1rem'
    borderRadius={'20px'}
    onSubmit={handleSubmit(onSubmit)}
    >
        <Heading>Log-In</Heading>
        <FormControl
        isInvalid={isError('username')}
        >
            <FormLabel
            fontSize={'2xl'}
            >Username</FormLabel>
            <Input {...register('username', {required: true}) } placeholder='Enter Username' autoComplete='off'
            size={'lg'}
            />
            
            <FormErrorMessage
            color={'red'}
            >{errors.username?.message}</FormErrorMessage>       
        </FormControl>
        <FormControl
        isInvalid={isError('password')}
        >
            <FormLabel
            fontSize={'2xl'}
            >Password</FormLabel>
            <Input {...register('password')} placeholder='Password' autoComplete='off'
            size={'lg'}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>     
        </FormControl>
        
        <ButtonGroup
        size={'lg'}
        padding='1rem'
        >
            <Button
            disabled={Object.keys(dirtyFields).length !== 0}
            backgroundColor={'blue.400'}
            type='submit'
            >Login</Button>
            <Button
            disabled={!dirtyFields ? true : false}
            >
                Create Account
            </Button>
        </ButtonGroup>
    </VStack>
  )
}

export default SignIn