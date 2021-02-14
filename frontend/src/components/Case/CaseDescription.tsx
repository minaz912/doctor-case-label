type CaseDescriptionProps = {
  description: string;
};

export default function CaseDescription({ description }: CaseDescriptionProps) {
  return (
    <div>
      <h2>Please review this case:</h2>
      <div>{description}</div>
    </div>
  );
}
