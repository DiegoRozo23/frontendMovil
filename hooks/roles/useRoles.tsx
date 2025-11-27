import { GetRolesAsync } from "@/core/actions/get.roles.action";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useRoles = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const rolesPaginationQuery = useQuery({
    queryKey: ["roles", page, pageSize, searchTerm],
    queryFn: () => GetRolesAsync(page, pageSize, searchTerm),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    rolesPaginationQuery,
    page,
    setPage,
    pageSize,
    setPageSize,
    searchTerm,
    setSearchTerm,
  };
};
