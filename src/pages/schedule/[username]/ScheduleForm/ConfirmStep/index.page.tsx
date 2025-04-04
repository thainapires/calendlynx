// @ts-nocheck
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../../../../lib/axios'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'

const confirmFormSchema = z.object({
    name: z.string().min(3, { message: 'The name must have at least 3 letters' }),
    email: z.string().email({ message: 'Enter a valid email' }),
    observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
    schedulingDate: Date
    onCancelConfirmation: () => void
}

export default function ConfirmStep({schedulingDate,onCancelConfirmation}: ConfirmStepProps) {
    const { register, handleSubmit, formState: { isSubmitting, errors }} = useForm<ConfirmFormData>({
        resolver: zodResolver(confirmFormSchema),
    })

    const router = useRouter()
    const username = String(router.query.username)

    async function handleConfirmScheduling(data: ConfirmFormData) {
        const { name, email, observations } = data

        await api.post(`/users/${username}/schedule`, {
            name,
            email,
            observations,
            date: schedulingDate,
        })

        onCancelConfirmation()
    }

    const describedDate = dayjs(schedulingDate).format('MMMM D, YYYY');
    const describedTime = dayjs(schedulingDate).format('h:mm A');

    return (
        <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
            <FormHeader>
                <Text>
                    <CalendarBlank />
                    {describedDate}
                </Text>
                <Text>
                    <Clock />
                    {describedTime}
                </Text>
            </FormHeader>

            <label>
                <Text size="sm">Full name</Text>
                <TextInput placeholder="Your name" {...register('name')} />
                {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
            </label>

            <label>
                <Text size="sm">Email address</Text>
                <TextInput type="email" placeholder="johndoe@example.com" {...register('email')}/>
                {errors.email && (<FormError size="sm">{errors.email.message}</FormError>)}
            </label>

            <label>
                <Text size="sm">Notes</Text>
                <TextArea {...register('observations')} />
            </label>

            <FormActions>
                <Button type="button" variant="tertiary" onClick={onCancelConfirmation}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    Confirm
                </Button>
            </FormActions>
        </ConfirmForm>
    )
}