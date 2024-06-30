import { IUser } from "@/types/IUser";

const apiUrl = "http://localhost:5001/ebuddy-backend-repo/asia-southeast2/api";

export const updateUserData = async (id: string, payload: Partial<IUser>) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/update-user-data/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const { data } = await response.json();

    return data as IUser;
  } catch (error) {
    throw error;
  }
};

export const fetchUserData = async () => {
  try {
    const response = await fetch(`${apiUrl}/fetch-user-data`);

    const { data } = await response.json();

    return data as IUser[];
  } catch (error) {
    throw error;
  }
};
