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
  const {register, handleSubmit, formState: { errors }} = useForm<AddFriendForm>({
    resolver: yupResolver(formSchema)
  })

  const onSubmit = (data:AddFriendForm) => {
    console.log(data)
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
