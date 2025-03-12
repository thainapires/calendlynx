import { Button, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { Form } from './styles'

export function ClaimUsernameForm() {
  return (
    <Form as="form">
      <TextInput size="sm" prefix="ignite.com/" placeholder="your-user" />
      <Button size="sm" type="submit">
        Book User
        <ArrowRight />
      </Button>
    </Form>
  )
}