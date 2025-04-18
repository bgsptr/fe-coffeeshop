export const ButtonFilter = (props: { buttonName: string }) => {
  const { buttonName } = props;
  return (
    <button className="border-1 text-nn600 rounded-xl py-2 px-4 text-sm font-medium">
      {buttonName}
    </button>
  );
};
