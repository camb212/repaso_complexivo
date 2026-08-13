import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function AboutPage() {
  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Sistema de Alquiler de Vehículos
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Endpoints utilizados:
        </Typography>

        <List dense>
          <ListItem>
            <ListItemText primary="GET /api/vehicles/ - Listar vehículos" />
          </ListItem>

          <ListItem>
            <ListItemText primary="GET /api/rentals/ - Listar alquileres" />
          </ListItem>

          <ListItem>
            <ListItemText primary="POST /api/rentals/ - Crear alquiler" />
          </ListItem>

          <ListItem>
            <ListItemText primary="GET /api/fleet-logs/ - Consultar bitácora de flota" />
          </ListItem>

          <ListItem>
            <ListItemText primary="GET /api/rental-events/ - Consultar eventos de alquileres" />
          </ListItem>
        </List>

        <Typography variant="body2" color="text.secondary">
          Base de datos SQL: PostgreSQL (vehicles y rentals)
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Base de datos NoSQL: MongoDB (fleet_logs y rental_events)
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Base URL: VITE_API_BASE_URL
        </Typography>
      </Paper>
    </Container>
  );
}