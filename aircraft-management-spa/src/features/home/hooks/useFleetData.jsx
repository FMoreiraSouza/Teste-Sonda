import { useState, useMemo } from "react";

// Generate 42 realistic aircraft matching Active=38, Maintenance=3, Grounded=1
const generateFleetData = () => {
  const models = [
    "E195-E2",
    "Phenom 300E",
    "E190-E2",
    "Praetor 600",
    "E175",
    "Legacy 500",
    "E195",
    "Phenom 100",
    "Praetor 500",
    "E190",
  ];
  const prefixes = ["PR", "PT", "PS", "PU", "PP"];
  const aircraft = [];

  // status distribution: Active 38, Maintenance 3, Grounded 1
  const statuses = Array(38)
    .fill("Active")
    .concat(Array(3).fill("Maintenance"), Array(1).fill("Grounded"));

  for (let i = 0; i < 42; i++) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 10)}`;
    const registration = `${prefix}-${suffix}`;
    const model = models[Math.floor(Math.random() * models.length)];
    const status = statuses[i];
    const year = 2024;
    const month = Math.floor(Math.random() * 5) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    const lastInspection = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    aircraft.push({
      id: i,
      prefix: registration,
      model,
      status,
      lastInspection,
    });
  }
  // Ensure specific ones from screenshot are present for demo consistency
  const demoOverrides = [
    {
      prefix: "PR-XMA",
      model: "E195-E2",
      status: "Active",
      lastInspection: "2024-05-12",
    },
    {
      prefix: "PT-ZJF",
      model: "Phenom 300E",
      status: "Maintenance",
      lastInspection: "2024-03-28",
    },
    {
      prefix: "PS-AEB",
      model: "E190-E2",
      status: "Active",
      lastInspection: "2024-04-15",
    },
    {
      prefix: "PR-GTM",
      model: "Praetor 600",
      status: "Grounded",
      lastInspection: "2024-01-10",
    },
    {
      prefix: "PT-TUH",
      model: "E175",
      status: "Active",
      lastInspection: "2024-05-01",
    },
  ];
  demoOverrides.forEach((ac, idx) => {
    aircraft[idx] = { ...aircraft[idx], ...ac, id: idx };
  });
  return aircraft;
};

export const useFleetData = () => {
  const [aircraft, setAircraft] = useState(generateFleetData());
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

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
  };
};
