type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminPostIdPage({
  params,
}: AdminPostIdPageProps) {
  const { id } = await params;

  return (
    <div>
      <h1 className="py-16 text-6xl">AdminPostIdPage {id}</h1>
    </div>
  );
}
