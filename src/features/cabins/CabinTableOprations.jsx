import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

export default function CabinTableOprations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "No_Discount", label: "No Discount" },
          { value: "With_Discount", label: "With Discount" },
        ]}
      />
    </TableOperations>
  );
}
