const CheckItem = ({ check }) => {
  const statusConfig = {
    pass: {
      icon: "✓",
      iconClass: "bg-green-100 text-green-600",
    },

    fail: {
      icon: "×",
      iconClass: "bg-red-100 text-red-600",
    },

    warning: {
      icon: "!",
      iconClass: "bg-amber-100 text-amber-600",
    },
  };

  const config =
    statusConfig[check?.status] || statusConfig.warning;

  return (
    <div className="flex gap-3 border-b border-[#f0f1f3] py-4 last:border-0">

      {/* Status icon */}
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${config.iconClass}`}
      >
        {config.icon}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">

        <div className="flex flex-wrap items-center gap-2">

          <h4 className="text-sm font-semibold text-[#202124]">
            {check?.name}
          </h4>

          {check?.automated === false && (
            <span className="rounded-full bg-[#f1f2f4] px-2 py-0.5 text-[10px] font-medium text-[#737780]">
              Manual review
            </span>
          )}

        </div>

        <p className="mt-1 text-sm leading-6 text-[#737780]">
          {check?.message}
        </p>

        {/* Laws */}
        {check?.laws && check.laws.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">

            {check.laws.map((law, index) => (
              <span
                key={`${law}-${index}`}
                className="rounded-md bg-[#f5f6f7] px-2 py-1 text-[10px] font-medium text-[#60656d]"
              >
                {law}
              </span>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default CheckItem;