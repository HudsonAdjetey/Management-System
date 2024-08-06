const Columns = (FormatDateTime, StatusBadge) => {
  return [
    {
      header: "#",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.index + 1}</p>;
      },
    },
    {
      accessorKey: "firstName",
      header: "First Name",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.original.firstName}</p>;
      },
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.original.lastName}</p>;
      },
    },
    // admission id
    {
      accessorKey: "admissionId",
      header: "Admission ID",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.original.admissionId}</p>;
      },
    },
    // status
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const rowStatus = row.original;
        return (
          <div className="min-w-[115px]">
            <StatusBadge status={rowStatus.status} />
          </div>
        );
      },
    },
    // date issued
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const rowItems = row.original;

        return (
          <p className="text-14-regular min-w-[100px]">
            {FormatDateTime(rowItems.createdAt).dateTime}
          </p>
        );
      },
    },
  ];
};

export default Columns;
