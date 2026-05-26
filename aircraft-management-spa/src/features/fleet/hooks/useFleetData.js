import { useState, useEffect, useMemo, useCallback } from "react";
import { fetchAircrafts } from "../api/aircraftService";

export const useFleetData = () => {
  const [aircraft, setAircraft] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const loadAircrafts = useCallback(async () => {
    try {
      setLoading(true);
      console.log("🔄 Buscando aeronaves do backend...");

      const data = await fetchAircrafts();

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
        prefix: ac.icaoCode || ac.name?.substring(0, 6).toUpperCase() || "N/A",
        model: ac.name,
        status: ac.sold ? "Sold" : "Active",
        lastInspection: ac.createdAt
          ? new Date(ac.createdAt).toISOString().split("T")[0]
          : "-",
      }));

      console.log(`✅ ${mapped.length} aeronaves carregadas`);
      setAircraft(mapped);
    } catch (error) {
      console.error("❌ Erro ao carregar aeronaves:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAircrafts();
  }, [loadAircrafts]);

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
    loading,
  };
};
