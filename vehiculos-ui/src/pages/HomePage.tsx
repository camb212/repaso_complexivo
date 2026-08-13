import { Container, Paper, Typography, Stack } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

export default function HomePage() {
  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <DirectionsCarIcon />

          <Typography variant="h5">
            Sistema de Alquiler de Vehículos
          </Typography>
        </Stack>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Aplicación web desarrollada con React, TypeScript y
          Material UI para gestionar vehiculos y alquileres.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Flujo: Vehiculos → Alquileres → Registro de eventos
          operativos.
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          PostgreSQL: vehicles y rentals. MongoDB: fleet_logs y
          rental_events.
        </Typography>
      </Paper>
    </Container>
  );
}