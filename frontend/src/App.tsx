import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <h1>Asset Management System</h1>
        <p>Sistema em desenvolvimento...</p>
      </div>
    </ThemeProvider>
  );
}

export default App;

