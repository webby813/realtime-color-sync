import { useState } from 'react'
import { 
  Container, 
  Box, 
  Button, 
  Typography, 
  Card, 
  CardContent,
  Stack 
} from '@mui/material'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// Import Firebase (initialized in firebase.ts)
import './firebase'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </Stack>
        
        <Typography variant="h2" component="h1" gutterBottom>
          Vite + React
        </Typography>
        
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => setCount((count) => count + 1)}
              sx={{ mb: 2 }}
            >
              count is {count}
            </Button>
            <Typography variant="body1" color="text.secondary">
              Edit <code>src/App.tsx</code> and save to test HMR
            </Typography>
          </CardContent>
        </Card>
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          Click on the Vite and React logos to learn more
        </Typography>
      </Box>
    </Container>
  )
}

export default App
