export function StatusBadge({ status }: { status: string }) {
  let color = "green";

  switch (status.toUpperCase()) {
    case "QUOTE":
      color = "gray";
      break;
    case "ACCEPTED":
      color = "blue";
      break;
    case "WAITING":
      color = "yellow";
      break;
    case "IN_PROGRESS":
      color = "purple";
      break;
    case "SHIPPED":
      color = "indigo";
      break;
    case "COMPLETE":
      color = "green";
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-${color}-700 text-${color}-100`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}
