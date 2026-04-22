import React from 'react';
import { DataTable } from '@/components/ui/table';
import { useReservas } from '@/hooks/useReservas';

const ReservasPage = () => {
  const { data, isLoading, currentPage, totalPages, onPageChange } = useReservas();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestão de Reservas</h1>
      <DataTable
        data={data}
        loading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ReservasPage;