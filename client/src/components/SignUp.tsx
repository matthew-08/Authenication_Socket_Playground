import React from 'react'
import { Button, ButtonGroup, FormControl, FormErrorMessage, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import {AccountContext} from './AccountContext';

interface SignUpForm {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
}

const signUpSchema = Yup.object().shape({
    username: Yup.string()
        .required('This field is required')
        .min(6, 'Username must be at least 6 characters')
        .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string()
        .required('This field is required')
        .email('email is invalid'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must not exceed 20 characters'),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password')], 'Passwords must match')
})

export default function SignUp() {
    const { setUser } = useContext(AccountContext)
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpForm>({
        resolver: yupResolver(signUpSchema)
    })

    const submitData = async (data: SignUpForm) => {
        const sendToSever = await fetch('http://localhost:3000/auth/register', {
            credentials: 'include',
            method: 'POST',
            headers: {
                "Content-Type": 'application/json' 
            },
            body: JSON.stringify(data)
        }).catch(err => {
            return;
        }).then(res => {
            if(res) {
                return res.json()
            }
        }).then(data => setUser({...data}))
    }

    const checkInvalid = (input: keyof SignUpForm) => errors[input] ? true : false

    return (
        <VStack
            as='form'
            spacing={'2'}
            onSubmit={handleSubmit(submitData)}
        >
            <Heading>Sign Up</Heading>
            <FormControl
                mt={'1rem'}
                isInvalid={checkInvalid('username')}
            >
                <FormLabel>Username</FormLabel>
                <Input {...register('username', { required: true })}
                    size={'lg'}
                    type='text'
                    placeholder='Enter Username...'
                />
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
                isInvalid={checkInvalid('email')}
            >
                <FormLabel>E-mail</FormLabel>
                <Input {...register('email', { required: true })}
                    size={'lg'}
                    type='email'
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
                isInvalid={checkInvalid('password')}
            >
                <FormLabel>Password</FormLabel>
                <Input {...register('password', { required: true })}
                    size={'lg'}
                    type='password'
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>

            </FormControl>
            <FormControl
                isInvalid={checkInvalid('confirmPassword')}
            >
                <FormLabel>Confirm Password</FormLabel>
                <Input {...register('confirmPassword', { required: true })}
                    size={'lg'}
                    type='password'
                />
                <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>

            </FormControl>
            <ButtonGroup
                size={'lg'}
                mt='2rem'
            >
                <Button
                    mt={'2rem'}
                    type='submit'
                >Create Account</Button>
            </ButtonGroup>
        </VStack>
    )
}
