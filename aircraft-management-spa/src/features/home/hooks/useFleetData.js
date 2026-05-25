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
      const mapped = data.map((ac) => ({
        id: ac.id,
        prefix: ac.icaoCode || ac.name.substring(0, 6).toUpperCase(),
        model: ac.name,
        status: ac.sold ? "Sold" : "Active",
        lastInspection: new Date(ac.createdAt).toISOString().split("T")[0],
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
        ac.model.toLowerCase().includes(term),
    );
  }, [aircraft, searchTerm]);

  const totalPages = Math.ceil(filteredAircraft.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAircraft.slice(start, start + pageSize);
  }, [filteredAircraft, currentPage, pageSize]);

  const stats = useMemo(() => {
    const active = aircraft.filter((a) => a.status === "Active").length;
    const maintenance = aircraft.filter(
      (a) => a.status === "Maintenance",
    ).length;
    const grounded = aircraft.filter((a) => a.status === "Grounded").length;
    return { total: aircraft.length, active, maintenance, grounded };
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
