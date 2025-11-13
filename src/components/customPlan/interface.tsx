export interface PlanProps {
  item: {
    _id: string;
    name: string;
    quantity?: string;
    description?: string;
  };
  meals?: boolean;
  isLastItem: boolean;
}
