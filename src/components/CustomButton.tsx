import useDialog from "../hooks/useDialog";

export const CustomButton = (props: { name: string, url: string }) => {
  const { openDialog } = useDialog();

  return (
    <button onClick={() => openDialog({
      url: props.url,
      qrString: "sa",
      isClosed: false
    })} className="text-sm font-medium px-10 py-[0.5rem] border-1 rounded-lg bg-ggb00 hover:bg-hggb00 text-white">
      {props.name}
    </button>
  );
};
