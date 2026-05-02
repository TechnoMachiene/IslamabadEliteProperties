/**
 * PropertyStoreContext
 *
 * All property data is fetched from Supabase via the serverless API layer.
 * React Query manages caching, background re-validation, and loading states.
 * The store interface is deliberately compatible with the old localStorage version
 * so no consuming components needed structural changes.
 */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { generatePropertySlug, type Property, properties as staticProperties } from "@/data/properties";
import { api } from "@/lib/api";

export const PROPERTIES_QUERY_KEY = ["properties"] as const;

// ─── Context type ─────────────────────────────────────────────────────────────
export interface PropertyStore {
  properties: Property[];
  isLoading: boolean;
  error: Error | null;
  addProperty:    (data: Omit<Property, "id">) => Promise<Property>;
  updateProperty: (id: string, updates: Omit<Property, "id">) => Promise<Property>;
  deleteProperty: (id: string) => Promise<void>;
  findBySlug:     (slug: string) => Property | undefined;
}

const PropertyStoreContext = createContext<PropertyStore | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export const PropertyStoreProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const { data: rawData, isLoading, error } = useQuery({
    queryKey: PROPERTIES_QUERY_KEY,
    queryFn:  async () => {
      try {
        const result = await api.properties.list();
        return result;
      } catch (err) {
        // Fallback to static properties if API fails (useful for dev mode without netlify dev)
        return staticProperties;
      }
    },
    staleTime: 5 * 60_000,
    gcTime:    10 * 60_000,
    retry: 1,
    throwOnError: false,
  });
  const properties = (Array.isArray(rawData) && rawData.length > 0) ? rawData : staticProperties;

  const invalidate = () => queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });

  const addMutation = useMutation({
    mutationFn: (data: Omit<Property, "id">) => api.properties.create(data),
    onSuccess: invalidate,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Omit<Property, "id"> }) =>
      api.properties.update(id, updates),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.properties.delete(id),
    onSuccess: invalidate,
  });

  const addProperty = useCallback(
    (data: Omit<Property, "id">) => addMutation.mutateAsync(data),
    [addMutation],
  );

  const updateProperty = useCallback(
    (id: string, updates: Omit<Property, "id">) =>
      updateMutation.mutateAsync({ id, updates }),
    [updateMutation],
  );

  const deleteProperty = useCallback(
    (id: string) => deleteMutation.mutateAsync(id),
    [deleteMutation],
  );

  const findBySlug = useCallback(
    (slug: string) => properties.find((p) => generatePropertySlug(p) === slug),
    [properties],
  );

  const value = useMemo<PropertyStore>(
    () => ({
      properties,
      isLoading,
      error: (error as Error | null),
      addProperty,
      updateProperty,
      deleteProperty,
      findBySlug,
    }),
    [properties, isLoading, error, addProperty, updateProperty, deleteProperty, findBySlug],
  );

  return (
    <PropertyStoreContext.Provider value={value}>
      {children}
    </PropertyStoreContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const usePropertyStore = (): PropertyStore => {
  const ctx = useContext(PropertyStoreContext);
  if (!ctx) throw new Error("usePropertyStore must be used inside <PropertyStoreProvider>");
  return ctx;
};
