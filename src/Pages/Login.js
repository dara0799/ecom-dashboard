import React, { useContext, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { Alert, CircularProgress } from '@mui/material'
// other files
import Header from '../Components/Header'
import { UserContext } from '../Contexts/UserContext'

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

const Login = () => {
  // state
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const history = useNavigate()
  const [_emailHelper, _setEmailHelper] = useState({
    helperTextEmail: '',
    errorEmail: false,
  })
  const [_passwordHelper, _setPasswordHelper] = useState({
    helperTextPassword: '',
    errorPassword: false,
  })

  // context
  const { isAuthenticated, userLogin, login } = useContext(UserContext)
  const { loading, error } = userLogin

  // validation
  const valid = () => {
    if (email.length === 0) {
      _setEmailHelper({
        ..._emailHelper,
        helperTextEmail: 'Harap Masukkan Email Lengkap',
        errorEmail: true,
      })
    } else {
      _setEmailHelper({
        ..._emailHelper,
        helperTextEmail: '',
        errorEmail: false,
      })
    }
    if (password.length === 0) {
      _setPasswordHelper({
        ..._passwordHelper,
        helperTextPassword: 'Harap Masukkan Password Lengkap',
        errorPassword: true,
      })
    } else {
      _setPasswordHelper({
        ..._passwordHelper,
        helperTextPassword: '',
        errorPassword: false,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    valid()
    if (email && password) {
      let dataUser = {
        email,
        password,
      }
      await login(dataUser)
      console.log(dataUser)
    } else {
      console.log('Harap Masukkan Data!')
    }
  }

  useEffect(() => {
    if (isAuthenticated || localStorage.getItem('token')) {
      history('/product')
    }
  }, [history, isAuthenticated])

  return (
    <>
      <Header />
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {error && (
              <Alert
                variant='filled'
                severity='error'
                style={{ marginBottom: 8, marginTop: 8 }}
              >
                <b>Peringatan!</b> Alamat Email atau Kata Sandi Anda Salah!
              </Alert>
            )}
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Login
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    helperText={_emailHelper.helperTextEmail}
                    error={_emailHelper.errorEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='new-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    helperText={_passwordHelper.helperTextPassword}
                    error={_passwordHelper.errorPassword}
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? (
                  <CircularProgress style={{ color: '#fff' }} />
                ) : (
                  'Login'
                )}
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  )
}

export default Login
