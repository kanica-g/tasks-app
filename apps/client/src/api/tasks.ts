export type Task = {
    id: number;
    title: string;
    done: boolean;
    createdAt: string;
};

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchTasks(): Promise<Task[]> {
    const res = await fetch(`${API_URL}/api/v1/tasks`);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json().then((res) => res.data);
}

export async function createTask(title: string): Promise<Task> {
    const res = await fetch(`${API_URL}/api/v1/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
    });

    if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create task");
    }

    return (await res.json()).data[0];
}

export async function updateTaskDone(id: number, done: boolean): Promise<void> {
    const res = await fetch(`${API_URL}/api/v1/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done }),
    });

    if (!res.ok) throw new Error("Failed to update task");
}

export async function deleteTask(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/api/v1/tasks/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete task");
}
