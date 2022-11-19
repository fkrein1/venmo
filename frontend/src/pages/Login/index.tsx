import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'
import icon from '../../assets/icon.svg'
import { setAuthToken } from '../../helpers/authToken'
import { useAuth } from '../../hooks/useAuth'
import { postLogin } from '../../services/postLogin'
import {
  FormError,
  Icon,
  LoginContainer,
  LoginForm,
  Password,
  SignupLink,
  SubmitBtn,
  Username
} from './styles'

const LoginUserSchema = z.object({
  username: z.string().min(3),
  password: z
    .string()
    .min(8)
    .regex(/.*[A-Z].*/)
    .regex(/.*\d.*/)
})

export type LoginFormData = z.infer<typeof LoginUserSchema>

export function Login () {
  const navigate = useNavigate()
  const { setLoggedIn } = useAuth()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  async function handleLogin (data: LoginFormData) {
    const { username, password } = data
    try {
      const { token } = await postLogin(username, password)
      setAuthToken(token)
      navigate('/transactions')
      setLoggedIn(true)
    } catch (err) {
      reset()
      alert('Invalid username or password')
    }
  }

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit(handleLogin)}>
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

        <SubmitBtn type="submit" disabled={isSubmitting}>
          {isSubmitting && 'Logging in...' }
          {!isSubmitting && 'Log In' }
          </SubmitBtn>
        <SignupLink to="/signup">Create Account</SignupLink>
      </LoginForm>
    </LoginContainer>
  )
}
