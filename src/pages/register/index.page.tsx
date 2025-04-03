// @ts-nocheck
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { AxiosError } from 'axios'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Container, Form, FormError, Header } from './styles'

const registerFormSchema = z.object({
    username: z.string()
        .min(3, { message: 'The username must have at least 3 letters.' })
        .regex(/^([a-z\\-]+)$/i, {
            message: 'The username can only contain letters and hyphens.',
        })
        .transform((username) => username.toLowerCase()),
    name: z.string().min(3, { message: 'The name must have at least 3 letters.' }),
})
  
type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
    const { 
        register, 
        handleSubmit,
        setValue, 
        formState: { errors, isSubmitting }
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema),
    })

    const router = useRouter()

    useEffect(() => { 
        if (router.query.username){
            setValue('username', String(router.query.username))
        }
    }, [router.query?.username, setValue])

    async function handleRegister(data: RegisterFormData) {
        try{
            await api.post('/users', {
                name: data.name,
                username: data.username,
            })
            await router.push('/register/connect-calendar')
        } catch(err){
            if(err instanceof AxiosError && err?.response?.data?.message){
                alert(err.response.data.message)
                return
            }

            console.log(err)
        }
    }

    return (
        <>
            <NextSeo title="Register | Schedulynx" />
            <Container>
                <Header>
                    <Heading as="strong">Welcome back to Schedulynx!</Heading>
                    <Text>
                        We need some information to create your profile! Oh, and you can edit this information later.
                    </Text>

                    {/*TODO: change this component because it only has portuguese version */}
                    <MultiStep size={4} currentStep={1} />
                </Header>

                <Form as="form" onSubmit={handleSubmit(handleRegister)}>
                    <label>
                        <Text size="sm">Username</Text>
                        <TextInput 
                            prefix="schedulynx.com/" 
                            placeholder="your-user" 
                            {...register('username')}
                        />
                        {errors.username && (
                            <FormError size="sm">
                                {errors.username.message}
                            </FormError>
                        )}
                    </label>

                    <label>
                        <Text size="sm">Your full name</Text>
                        <TextInput 
                            placeholder="Your full name" 
                            {...register('name')}
                        />
                        {errors.name && (
                            <FormError size="sm">
                                {errors.name.message}
                            </FormError>
                        )}
                    </label>

                    <Button type="submit" disabled={isSubmitting}>
                        Next step
                        <ArrowRight />
                    </Button>
                </Form>
            </Container>
        </>
    )
}