import React from 'react';
import { DataTable } from '@/components/ui/table';
import { useCheckInCheckOut } from '@/hooks/useCheckInCheckOut';

const CheckInCheckOutPage = () => {
  const { data, isLoading, currentPage, totalPages, onPageChange } = useCheckInCheckOut();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestão de Check-in/Check-out</h1>
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

export default CheckInCheckOutPage;