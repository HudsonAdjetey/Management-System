export const columns = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium">{row?.index}</p>;
    },
  },
  {
    accessorKey: "students",
    header: "Students",
    cell: ({ row }) => {
      return <p className="text-14-medium">{row?.student?.name}</p>;
    },
  },
  {
    accessorKey: "course",
    header: "Course",
    cell: ({ row }) => {
      return <p className="text-14-medium">{row?.course?.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <p className="text-14-medium text-[#909294]">{row?.status}</p>;
    },
  },
];
