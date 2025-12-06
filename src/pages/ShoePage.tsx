import { useParams } from 'react-router-dom';

const ShoePage = () => {
  const { id } = useParams();
  
  return (
    <div className="p-8">
      <h1 className="text-4xl font-display font-bold">Shoe Details</h1>
      <p className="mt-4 text-gray-600">Shoe ID: {id}</p>
      <p className="mt-2 text-gray-600">Individual shoe page coming soon...</p>
    </div>
  );
};

export default ShoePage;