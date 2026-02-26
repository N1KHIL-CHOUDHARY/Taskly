import { useCallback, useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { toast } from '../utils/toast';

const DEFAULT_LIMIT = 10;

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: DEFAULT_LIMIT,
    total: 0,
    totalPages: 1
  });
  const [filters, setFilters] = useState({
    status: '',
    search: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadTasks = useCallback(
    async (options) => {
      setLoading(true);
      setError('');
      try {
        const params = {
          page: options?.page || pagination.page,
          limit: options?.limit || pagination.limit,
          status: options?.status ?? filters.status,
          search: options?.search ?? filters.search
        };

        const data = await fetchTasks(params);
        setTasks(data.data);
        setPagination(data.pagination);
        setFilters({
          status: params.status || '',
          search: params.search || ''
        });
      } catch (err) {
        setError(err.message);
        toast.error(err.message || 'Failed to load tasks');
      } finally {
        setLoading(false);
      }
    },
    [pagination.page, pagination.limit, filters.status, filters.search]
  );

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleCreate = useCallback(
    async (payload) => {
      await createTask(payload);
      toast.success('Task created');
      await loadTasks({ page: 1 });
    },
    [loadTasks]
  );

  const handleUpdate = useCallback(
    async (id, payload) => {
      await updateTask(id, payload);
      toast.success('Task updated');
      await loadTasks();
    },
    [loadTasks]
  );

  const handleDelete = useCallback(
    async (id) => {
      await deleteTask(id);
      toast.success('Task deleted');
      await loadTasks();
    },
    [loadTasks]
  );

  return {
    tasks,
    pagination,
    filters,
    loading,
    error,
    reload: loadTasks,
    createTask: handleCreate,
    updateTask: handleUpdate,
    deleteTask: handleDelete
  };
};

export default useTasks;
