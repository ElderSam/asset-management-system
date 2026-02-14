import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Layout principal da aplicação
 * - AppBar com título
 * - Container responsivo para o conteúdo
 */
export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      {/* AppBar */}
      <AppBar position="static">
        <Toolbar className={styles.toolbar}>
          <BusinessCenterIcon className={styles.logo} />
          <Typography variant="h6" component="div" className={styles.title}>
            Asset Management System
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Conteúdo principal */}
      <Container maxWidth="xl" className={styles.container}>
        {children}
      </Container>

      {/* Footer */}
      <footer className={styles.footer}>
        <Container maxWidth="xl">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Asset Management System - Todos os direitos reservados
          </Typography>
        </Container>
      </footer>
    </div>
  );
}
