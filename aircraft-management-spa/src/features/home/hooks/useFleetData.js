import { useState, useEffect, useMemo } from "react";
import { fetchAircrafts } from "../../../services/aircraftService";

export const useFleetData = () => {
  const [aircraft, setAircraft] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const loadAircrafts = async () => {
    try {
      setLoading(true);
      const data = await fetchAircrafts();
      // Mapeia os campos do backend para o formato esperado pelos componentes
      const mapped = data.map((ac) => ({
        id: ac.id,
        name: ac.name,
        brand: ac.brand,
        year: ac.year,
        description: ac.description,
        sold: ac.sold,
        icaoCode: ac.icaoCode,
        fuelCapacity: ac.fuelCapacity,
        averageConsumption: ac.averageConsumption,
        range: ac.range,
        rangeCategory: ac.rangeCategory,
        createdAt: ac.createdAt,
        // Para compatibilidade com a tabela (prefixo pode ser o ICAO ou parte do nome)
        prefix: ac.icaoCode || ac.name.substring(0, 6).toUpperCase(),
        model: ac.name,
        status: ac.sold ? "Sold" : "Active",
        lastInspection: ac.createdAt
          ? new Date(ac.createdAt).toISOString().split("T")[0]
          : "-",
      }));
      setAircraft(mapped);
    } catch (error) {
      console.error("Erro ao carregar aeronaves:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAircrafts();
  }, []);

  const filteredAircraft = useMemo(() => {
    if (!searchTerm.trim()) return aircraft;
    const term = searchTerm.toLowerCase();
    return aircraft.filter(
      (ac) =>
        ac.prefix.toLowerCase().includes(term) ||
        ac.model.toLowerCase().includes(term) ||
        ac.brand.toLowerCase().includes(term),
    );
  }, [aircraft, searchTerm]);

  const totalPages = Math.ceil(filteredAircraft.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAircraft.slice(start, start + pageSize);
  }, [filteredAircraft, currentPage, pageSize]);

  const stats = useMemo(() => {
    const total = aircraft.length;
    const active = aircraft.filter((a) => !a.sold).length;
    const maintenance = 0;
    return { total, active, maintenance };
  }, [aircraft]);

  const resetPage = () => setCurrentPage(1);

  return {
    aircraft,
    loading,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    paginatedData,
    totalPages,
    filteredCount: filteredAircraft.length,
    stats,
    resetPage,
    pageSize,
    refresh: loadAircrafts,
  };
};
