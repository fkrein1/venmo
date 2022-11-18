import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'
import icon from '../../assets/icon.svg'
import { setToken } from '../../helpers/token'
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
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
      setToken(token)
      navigate('/transactions')
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

        <SubmitBtn type="submit">Log In</SubmitBtn>
        <SignupLink to="/signup">Create Account</SignupLink>
      </LoginForm>
    </LoginContainer>
  )
}