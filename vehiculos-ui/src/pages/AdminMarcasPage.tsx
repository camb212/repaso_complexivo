import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
  Button,
} from "@mui/material";

import {
  type Rental,
  listRentalsApi,
} from "../api/rentals.api";

export default function RentalsPage() {
  const [items, setItems] = useState<Rental[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setError("");
      setLoading(true);

      const data = await listRentalsApi();
      setItems(data);
    } catch {
      setError("No se pudieron cargar los alquileres.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Alquileres
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Button
          variant="outlined"
          onClick={load}
          sx={{ mb: 2 }}
        >
          Refrescar
        </Button>

        {loading ? (
          <Typography>
            Cargando alquileres...
          </Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Vehiculo</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Fecha</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {items.map((rental) => (
                <TableRow key={rental.id}>
                  <TableCell>
                    {rental.id}
                  </TableCell>

                  <TableCell>
                    {rental.vehicle}
                  </TableCell>

                  <TableCell>
                    {rental.customer_name}
                  </TableCell>

                  <TableCell>
                    ${Number(rental.total).toFixed(2)}
                  </TableCell>

                  <TableCell>
                    {rental.status}
                  </TableCell>

                  <TableCell>
                    {new Date(
                      rental.created_at
                    ).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Container>
  );
}