import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'
import icon from '../../assets/icon.svg'
import { setToken } from '../../helpers/token'
import { postSignup } from '../../services/postSignup'
import {
  FormError,
  Icon, LoginLink,
  Password,
  SignupContainer,
  SignupForm, SubmitBtn,
  Username
} from './styles'

const SingupUserSchema = z.object({
  username: z.string().min(3),
  password: z
    .string()
    .min(8)
    .regex(/.*[A-Z].*/)
    .regex(/.*\d.*/)
})

export type SignupFormData = z.infer<typeof SingupUserSchema>

export function Signup () {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<SignupFormData>({
    resolver: zodResolver(SingupUserSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  async function handleSignup (data: SignupFormData) {
    const { username, password } = data
    try {
      const { token } = await postSignup(username, password)
      setToken(token)
      navigate('/transactions')
    } catch (err) {
      reset()
      alert('Invalid username or password')
    }
  }

  return (
    <SignupContainer>
      <SignupForm onSubmit={handleSubmit(handleSignup)}>
        <Icon>
          <img src={icon} alt="" />
        </Icon>

        <Username>
          <input type="text" placeholder="Username" {...register('username')} />
        </Username>

        <FormError>
          {errors.username && 'Username must have at least 3 characters'}
        </FormError>

        <Password>
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
          />
        </Password>

        <FormError>
          {errors.password &&
            'Password must have at least 8 characters, one number and one uppercase letter'}
        </FormError>

        <SubmitBtn type="submit">Create Account</SubmitBtn>
        <LoginLink to="/login">Log In</LoginLink>
      </SignupForm>
    </SignupContainer>
  )
}
