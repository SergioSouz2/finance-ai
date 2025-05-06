import { ReactNode } from "react";
interface PercentegeItemProps {
  icon: ReactNode;
  title: string;
  value: number;
}
const PercentegeItem = ({ icon, title, value }: PercentegeItemProps) => {
  return (
    <div className="flex items-center justify-between">
      {/*icone  */}
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-muted p-2">{icon}</div>
        <p className="text-[12px] text-muted-foreground">{title}</p>
      </div>
      <p className="text-[12px] font-bold">{value}%</p>
    </div>
  );
};
export default PercentegeItem;
