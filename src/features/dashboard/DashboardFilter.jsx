import FilterOperation from "../../ui/FilterOperation";

function DashboardFilter() {
  return (
    <FilterOperation
      field="last"
      options={[
        { query: "7", label: "Last 7 days" },
        { query: "30", label: "Last 30 days" },
        { query: "90", label: "Last 90 days" },
      ]}
    />
  );
}

export default DashboardFilter;
