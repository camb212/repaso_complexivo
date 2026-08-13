import { http } from "./http";

export type Vehicle = {
  id: number;
  plate: string;
  brand: string;
  daily_rate: number;
  is_available: boolean;
};

export async function listVehiclesApi() {
  const { data } = await http.get<Vehicle[]>("/api/vehicles/");
  return data;
}

export async function getVehicleApi(id: number) {
  const { data } = await http.get<Vehicle>(`/api/vehicles/${id}/`);
  return data;
}