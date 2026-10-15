import { api } from "@/lib/api/client";

export type DocumentType =
  | "resource"
  | "academic"
  | "professional"
  | "institutional";

export interface RelatedRef {
  _id?: string;
  name?: string;
  code?: string;
}

export interface LibraryDocument {
  _id?: string;
  id?: string;
  name: string;
  url: string;
  type: DocumentType;
  course?: RelatedRef | string | null;
  unit?: RelatedRef | string | null;
  owner?: RelatedRef | string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface FindResourcesParams {
  courseId?: string;
  /** Free-text search forwarded to the backend (optional). */
  search?: string;
}

/**
 * GET /documents/resources
 *
 * Fetches all documents of type "resource".
 * Optionally filters by courseId (server-side) and/or search term.
 */
export async function getResourceDocuments(
  params: FindResourcesParams = {},
): Promise<LibraryDocument[]> {
  const query = new URLSearchParams();

  if (params.courseId) query.set("courseId", params.courseId);
  if (params.search) query.set("search", params.search);

  const qs = query.toString();
  const path = qs ? `/documents/resources?${qs}` : "/documents/resources";

  const result = await api.get<LibraryDocument[]>(path);
  return Array.isArray(result) ? result : [];
}

/**
 * GET /documents/user/:userId
 * Public documents (owner: null) when userId is not a valid ObjectId.
 */
export async function getPublicDocuments(): Promise<LibraryDocument[]> {
  const result = await api.get<LibraryDocument[]>("/documents/user/public");
  return Array.isArray(result) ? result : [];
}

/**
 * GET /documents/:id
 */
export async function getDocumentById(id: string): Promise<LibraryDocument> {
  return api.get<LibraryDocument>(`/documents/${id}`);
}