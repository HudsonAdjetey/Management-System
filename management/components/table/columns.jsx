import StatusBadge from "../StatusBadge";

export const columns = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "firstName",
    Header: "First Name",
    cell: ({ row }) => {
      return <p className="text-14-medium">{row.firstName}</p>;
    },
  },

  {
    accessorKey: "lastName",
    Header: "Last Name",
    cell: ({ row }) => {
      return <p className="text-14-medium">{row.lastName}</p>;
    },
  },
  // admission id
  {
    accessorKey: "admissionId",
    Header: "Admission ID",
    cell: ({ row }) => {
      return <p className="text-14-medium">{row.admissionId}</p>;
    },
  },
  // status
  {
    accessorKey: "status",
    Header: "Status",
    cell: ({ row }) => {
      const rowStatus = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={rowStatus.status} />
        </div>
      );
    },
  },
  
];
