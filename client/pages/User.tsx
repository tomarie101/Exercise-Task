import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import axios from "axios";

// Define types for user data
interface User {
  id: number | null; // Corrected type
  userName: string;
  email: string;
  password: string; // Corrected type
}

const User = () => {
  const [data, setData] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch users: ", error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      setData(data.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Failed to delete user: ", error);
    }
  };

  const handleEditUser = async (updatedUser: User) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/${updatedUser.id}`,
        updatedUser
      );
      setData(
        data.map((user) => (user.id === updatedUser.id ? response.data : user))
      );
      setIsDialogOpen(false); // Close the dialog after successful update
    } catch (error) {
      console.error("Failed to update user: ", error);
    }
  };

  const handleFetchOneUser = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${id}`);
      setSelectedUser(response.data);
      setIsDialogOpen(true); // Open dialog when user data is fetched
    } catch (error) {
      console.error("Failed to fetch user: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      await handleEditUser(selectedUser);
      setSelectedUser(null);
    }
  };

  // Define columns for DataTable
  const columns = [
    {
      accessorKey: "userName",
      header: "User Name",
    },
    {
      accessorKey: "email",
      header: ({ column }: { column: any }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "password",
      header: "Password",
    },
    {
      id: "actions",
      cell: ({ row }: { row: any }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleFetchOneUser(user.id)}>
                Edit User
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteUser(user.id)}>
                Delete User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => setIsDialogOpen(open)}
      >
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update the user details below.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={selectedUser.userName}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    userName: e.target.value,
                  })
                }
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    email: e.target.value,
                  })
                }
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="bg-gray-300 text-gray-800 hover:bg-gray-400"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  Save
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default User;
