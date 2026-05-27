import { useState, useEffect, useMemo, useCallback } from "react";
import { fetchAircrafts, searchAircrafts } from "../api/aircraftService";

export const useFleetData = () => {
  const [aircraft, setAircraft] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const pageSize = 5;

  const mapAircraft = useCallback((data) => {
    return data.map((ac) => ({
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
      imageUrl: ac.imageUrl,
      prefix: ac.icaoCode || ac.name?.substring(0, 6).toUpperCase() || "N/A",
      model: ac.name,
      status: ac.sold ? "Sold" : "Active",
      lastInspection: ac.createdAt
        ? new Date(ac.createdAt).toISOString().split("T")[0]
        : "-",
    }));
  }, []);

  const loadAircrafts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAircrafts();
      const mapped = mapAircraft(data);
      setAircraft(mapped);
      setIsSearchMode(false);
      setSearchTerm("");
    } catch (err) {
      console.error("Erro ao carregar aeronaves:", err);
      setError(
        "Falha ao carregar a lista de aeronaves. Tente novamente mais tarde.",
      );
      setAircraft([]);
    } finally {
      setLoading(false);
    }
  }, [mapAircraft]);

  const performSearch = useCallback(
    async (params) => {
      try {
        setLoading(true);
        setError(null);
        const data = await searchAircrafts(params);
        const mapped = mapAircraft(data);
        setAircraft(mapped);
        setIsSearchMode(true);
        setSearchTerm("");
        setCurrentPage(1);
      } catch (err) {
        console.error("Erro na busca avançada:", err);
        setError("Falha na busca. Verifique sua conexão ou tente novamente.");
        setAircraft([]);
      } finally {
        setLoading(false);
      }
    },
    [mapAircraft],
  );

  const resetSearch = useCallback(() => {
    if (isSearchMode) {
      loadAircrafts();
    } else {
      loadAircrafts();
    }
  }, [isSearchMode, loadAircrafts]);

  useEffect(() => {
    loadAircrafts();
  }, []);

  const filteredAircraft = useMemo(() => {
    if (isSearchMode) return aircraft;
    if (!searchTerm.trim()) return aircraft;
    const term = searchTerm.toLowerCase();
    return aircraft.filter(
      (ac) =>
        ac.prefix.toLowerCase().includes(term) ||
        ac.model.toLowerCase().includes(term) ||
        ac.brand.toLowerCase().includes(term),
    );
  }, [aircraft, searchTerm, isSearchMode]);

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
    performSearch,
    resetSearch,
    isSearchMode,
    loading,
    error,
  };
};
