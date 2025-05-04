import { Client } from "../ts/types";
import { ClientCard } from "./ClientCard";

type ClientsGridProps = {
  clients: Client[];
};

export const ClientsGrid = ({ clients }: ClientsGridProps) => {
  return (
    <div className="w-full">
      {/* Grid de clientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <ClientCard key={client.client_ID} client={client} />
        ))}
      </div>
    </div>
  );
};