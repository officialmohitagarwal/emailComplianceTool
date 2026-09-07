const jurisdictions = [
  "CAN-SPAM",
  "GDPR",
  "CASL",
];

const JurisdictionSelector = ({
  selected = [],
  onChange,
}) => {

  const toggle = (jurisdiction) => {

    if (selected.includes(jurisdiction)) {

      onChange(
        selected.filter(
          (item) => item !== jurisdiction
        )
      );

    } else {

      onChange([
        ...selected,
        jurisdiction,
      ]);
    }
  };


  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-[#30343a]">
        Compliance jurisdictions
      </label>

      <div className="flex flex-wrap gap-2">

        {jurisdictions.map((jurisdiction) => {

          const isSelected =
            selected.includes(jurisdiction);

          return (

            <button
              type="button"
              key={jurisdiction}
              onClick={() =>
                toggle(jurisdiction)
              }
              className={`flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition ${
                isSelected
                  ? "border-[#17181a] bg-[#f5f6f7] text-[#17181a]"
                  : "border-[#dfe2e7] bg-white text-[#555a62] hover:border-[#bfc4cb]"
              }`}
            >

              <span
                className={`flex h-[17px] w-[17px] items-center justify-center rounded-[4px] border text-[11px] ${
                  isSelected
                    ? "border-[#17181a] bg-[#17181a] text-white"
                    : "border-[#cdd1d7]"
                }`}
              >
                {isSelected && "✓"}
              </span>

              {jurisdiction}

            </button>
          );
        })}

      </div>
    </div>
  );
};

export default JurisdictionSelector;