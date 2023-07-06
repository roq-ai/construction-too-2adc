const mapping: Record<string, string> = {
  companies: 'company',
  customers: 'customer',
  outlets: 'outlet',
  'rental-transactions': 'rental_transaction',
  tools: 'tool',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
