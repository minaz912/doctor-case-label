type CaseDescriptionProps = {
  description: string;
};

export default function CaseDescription({ description }: CaseDescriptionProps) {
  return (
    <div className="flex-1 justify-items-center p-10">
      <h2 className="text-left text-xl font-semibold">
        Please review this case:
      </h2>
      <div className="border-gray-700 border-2 h-auto min-h-full w-full rounded-md p-1 text-lg">
        {description}
      </div>
    </div>
  );
}
