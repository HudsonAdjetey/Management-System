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
  
];
