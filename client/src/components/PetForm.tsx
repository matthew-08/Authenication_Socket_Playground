import React from 'react'
import {useForm, UseFormReturn, UseFormProps } from 'react-hook-form'

enum AppointmentPlan {
    Basic = 'Basic',
    Premium = 'Premium',
}

interface Pet {
    name: string,
    breed: string,
    description?: string,
}

interface ContactInfo {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email?: string,
    callMeBack: boolean,
}

interface Appointment {
    id?: string,
    title: string,
    date: string,
    plan: AppointmentPlan,
    pet: Pet
    contact:  ContactInfo,
}

const defaultValues: Appointment = {
    title: '',
    date: new Date().toString(),
    plan: AppointmentPlan.Basic,
    contact: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        callMeBack: false,
      },
      pet: {
        name: '',
        breed: ''
      },
}

export const PetForm = () => {
  return (
    <div>PetForm</div>
  )
}
