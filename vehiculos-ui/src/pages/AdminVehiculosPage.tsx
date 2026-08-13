import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import {
  type Rental,
  type RentalStatus,
  listRentalsApi,
  createRentalApi,
} from "../api/rentals.api";

import {
  type Vehicle,
  listVehiclesApi,
} from "../api/vehicles.api";

export default function AdminRentalsPage() {
  const [items, setItems] = useState<Rental[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const [vehicle, setVehicle] = useState<number>(0);
  const [customerName, setCustomerName] = useState("");
  const [total, setTotal] = useState<number>(0);
  const [status, setStatus] =
    useState<RentalStatus>("RESERVED");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const loadVehicles = async () => {
    try {
      const data = await listVehiclesApi();
      setVehicles(data);

      const availableVehicle = data.find(
        (v) => v.is_available
      );

      if (availableVehicle) {
        setVehicle(availableVehicle.id);
      }
    } catch {
      setError("No se pudieron cargar los vehículos.");
    }
  };

  useEffect(() => {
    load();
    loadVehicles();
  }, []);

  const save = async () => {
    try {
      setError("");

      if (!vehicle) {
        return setError("Seleccione un vehículo.");
      }

      if (!customerName.trim()) {
        return setError("El nombre del cliente es requerido.");
      }

      if (total <= 0) {
        return setError("El total debe ser mayor que 0.");
      }

      await createRentalApi({
        vehicle,
        customer_name: customerName.trim(),
        total,
        status,
      });

      setCustomerName("");
      setTotal(0);
      setStatus("RESERVED");

      await load();
      await loadVehicles();
    } catch {
      setError("No se pudo crear el alquiler.");
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Gestión de Alquileres
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Stack spacing={2} sx={{ mb: 3 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
          >
            <FormControl sx={{ minWidth: 260 }}>
              <InputLabel id="vehicle-label">
                Vehiculo
              </InputLabel>

              <Select
                labelId="vehicle-label"
                label="Vehiculo"
                value={vehicle}
                onChange={(e) =>
                  setVehicle(Number(e.target.value))
                }
              >
                {vehicles
                  .filter((v) => v.is_available)
                  .map((v) => (
                    <MenuItem key={v.id} value={v.id}>
                      {v.plate} - {v.brand} ($
                      {Number(v.daily_rate).toFixed(2)}/día)
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <TextField
              label="Nombre del cliente"
              value={customerName}
              onChange={(e) =>
                setCustomerName(e.target.value)
              }
              fullWidth
            />

            <TextField
              label="Total"
              type="number"
              value={total}
              onChange={(e) =>
                setTotal(Number(e.target.value))
              }
              sx={{ width: 180 }}
            />
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
          >
            <FormControl sx={{ width: 220 }}>
              <InputLabel id="status-label">
                Estado
              </InputLabel>

              <Select
                labelId="status-label"
                label="Estado"
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as RentalStatus
                  )
                }
              >
                <MenuItem value="RESERVED">
                  RESERVED
                </MenuItem>

                <MenuItem value="ACTIVE">
                  ACTIVE
                </MenuItem>

                <MenuItem value="CLOSED">
                  CLOSED
                </MenuItem>

                <MenuItem value="CANCELLED">
                  CANCELLED
                </MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              onClick={save}
            >
              Crear Alquiler
            </Button>

            <Button
              variant="outlined"
              onClick={() => {
                setCustomerName("");
                setTotal(0);
                setStatus("RESERVED");
              }}
            >
              Limpiar
            </Button>

            <Button
              variant="outlined"
              onClick={() => {
                load();
                loadVehicles();
              }}
            >
              Refrescar
            </Button>
          </Stack>
        </Stack>

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
                <TableCell>Creado</TableCell>
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