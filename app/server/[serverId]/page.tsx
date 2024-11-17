interface ServerIdPageProps {
  params: {
    serverId: string;
  };
}
const ServerIdPage = ({ params }: ServerIdPageProps) => {
  return <div className="text-red-500">ID: {params.serverId}</div>;
};

export default ServerIdPage;
