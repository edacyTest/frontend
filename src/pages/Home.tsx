import { useState } from 'react';
import Card from '../components/Card';
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from '../slice/security.slice';
import ConfirmationModal from '../components/Confirmation';
import UpdateModal from '../components/UpadateModal';
import { User } from '../model/User';

export default function Home() {
  const { data: users, error, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [user, setUser] = useState<User>({ id: 0, name: "", age: 0 });
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    const foundUser = users?.find((u) => u.id === id);
    if (foundUser) {
      setUser(foundUser);
      setSelectedUserId(id);
      setIsModalUpdateOpen(true);
    }
  };

  const handleDeleteClick = (id: number) => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  const handleConfirmUpdate = async (formData: { name: string; age: number }) => {
    if (selectedUserId !== null) {
      try {
        await updateUser({ id: selectedUserId, name: formData.name, age: formData.age }).unwrap();
        console.log('Utilisateur mis à jour avec succès');
        setIsModalUpdateOpen(false);
        setSelectedUserId(null);
      } catch (err) {
        console.error('Échec de la mise à jour de l’utilisateur', err);
      }
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedUserId !== null) {
      try {
        await deleteUser(selectedUserId).unwrap();
        console.log('Utilisateur supprimé avec succès');
      } catch (err) {
        console.error('Échec de la suppression de l’utilisateur', err);
      } finally {
        setIsModalOpen(false);
        setSelectedUserId(null);
      }
    }
  };

  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  const handleCloseModalUpdate = () => {
    setIsModalUpdateOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {users?.map((user) => (
          <Card
            key={user.id}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
      />

      <UpdateModal
        isOpen={isModalUpdateOpen}
        onClose={handleCloseModalUpdate}
        onConfirm={handleConfirmUpdate}
        username={user.name}
        defaultAge={user.age}
      />
    </div>
  );
}
