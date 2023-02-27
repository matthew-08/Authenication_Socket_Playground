import { Button, ButtonGroup, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

type AddFriendForm = {
  username: string
} 

const formSchema = Yup.object().shape({
  username: Yup.string()
  .min(6, 'Username too short')
  .max(40, 'Username too long'),
})

export const AddFriendModal = ({onOpen, onClose, isOpen}) => {
  const {register, handleSubmit, formState: { errors }, setError, reset} = useForm<AddFriendForm>({
    resolver: yupResolver(formSchema)
  })

  const onSubmit = async (data:AddFriendForm) => {
      try {
        const addUser = await fetch("http://localhost:3000/friends/add", {
          headers: {
            "Content-Type": 'application/json' 
          },
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify(data)
        }).then(res => {
          if(res.status > 200) {
             res.json().then(r => 
              setError('username', {
                type: 'server',
                message: r.errorMsg
              })
            )
          }
          else {
            reset({
              username: '',
            })
            onClose();
          }
        })
      } catch (error) {
        console.log(error);
      }
  }
  


  return (
    <Modal
    isOpen={isOpen}
    onClose={onClose}
    >
      <ModalOverlay/>
      <ModalContent
      as={'form'}
      onSubmit={handleSubmit(onSubmit)}
      >
        <ModalHeader>
          <ModalCloseButton/>
          Hello
        </ModalHeader>
        <ModalBody
        >
            <FormControl
              isInvalid={'username' in errors}
            >
              <FormLabel>
                User
              </FormLabel>
              <Input
              {...register('username')}
              type={'text'}
              />
              <FormErrorMessage>
                {errors.username?.message}
              </FormErrorMessage>
            </FormControl>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button
            variant={'solid'}
            colorScheme='orange'
            type='submit'
            >
              Add
            </Button>
            <Button
            variant={'outline'}
            colorScheme='orange'
            onClick={()=> onClose()}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
      
    </Modal>
  )
}
