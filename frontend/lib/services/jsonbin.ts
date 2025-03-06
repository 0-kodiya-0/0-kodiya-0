import { DatabaseSchema } from '@/models/project';
import { TestimonialsSchema } from '@/models/testimonial';

const API_URL = process.env.JSONBIN_API_URL;
// Try multiple environment variable formats
const MASTER_KEY = process.env.JSONBIN_MASTER_KEY;
const PROJECTS_BIN_ID = process.env.JSONBIN_PROJECTS_BIN_ID;
const TESTIMONIALS_BIN_ID = process.env.JSONBIN_TESTIMONIALS_BIN_ID;

const FORCE_SKIP = false;

// Default empty data structures
const DEFAULT_PROJECTS_DATA: DatabaseSchema = { projects: [] };
const DEFAULT_TESTIMONIALS_DATA: TestimonialsSchema = { testimonials: [] };

// Interface for fetch options
interface FetchOptions {
    revalidate?: number | false;
    tags?: string[];
    skipFetch?: boolean; // New flag to skip API fetch and return default data
}

// Generic function to fetch data from JSONBin.io
async function fetchFromJsonBin<T>(binId: string, defaultData: T, options?: FetchOptions): Promise<T> {
    // If skipFetch is true, return default data immediately without API call
    if (options?.skipFetch || FORCE_SKIP) {
        return defaultData;
    }

    if (!MASTER_KEY) {
        throw new Error('JSONBin master key is not configured');
    }

    if (!binId) {
        throw new Error('Bin ID is not configured');
    }

    // Default cache configuration
    const defaultCacheOptions = {
        // By default, revalidate every 30 seconds
        next: { revalidate: 30 }
    };

    // Override with custom options if provided
    const fetchOptions = {
        method: 'GET',
        headers: {
            'X-Master-Key': MASTER_KEY,
            'X-Bin-Meta': 'false'
        },
        ...options && options.revalidate !== undefined ? {
            next: {
                ...(options.revalidate !== undefined ? { revalidate: options.revalidate } : {}),
                ...(options.tags ? { tags: options.tags } : {})
            }
        } : defaultCacheOptions
    };

    const response = await fetch(`${API_URL}/b/${binId}/latest`, fetchOptions);

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch data: ${response.status} ${errorText}`);
    }

    return response.json() as Promise<T>;
}

// Generic function to update data in JSONBin.io
async function updateJsonBin<T>(binId: string, data: T, skipFetch?: boolean): Promise<T> {
    // If skipFetch is true, just return the data without updating
    if (skipFetch || FORCE_SKIP) {
        return data;
    }

    if (!MASTER_KEY) {
        throw new Error('JSONBin master key is not configured');
    }

    if (!binId) {
        throw new Error('Bin ID is not configured');
    }

    const response = await fetch(`${API_URL}/b/${binId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': MASTER_KEY,
            'X-Bin-Versioning': 'true'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update data: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    return result.record as T;
}

// Create a new bin if it doesn't exist
async function createBinIfNotExists<T>(name: string, defaultData: T): Promise<string> {
    if (!MASTER_KEY) {
        throw new Error('JSONBin master key is not configured');
    }

    try {
        const response = await fetch(`${API_URL}/b`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': MASTER_KEY,
                'X-Bin-Name': name
            },
            body: JSON.stringify(defaultData)
        });

        if (!response.ok) {
            throw new Error(`Failed to create bin: ${response.status}`);
        }

        const result = await response.json();
        return result.metadata.id;
    } catch (error) {
        console.error('Error creating bin:', error);
        throw error;
    }
}

// Projects specific functions
export const projectsService = {
    async getAll(options?: FetchOptions): Promise<DatabaseSchema> {
        try {
            return await fetchFromJsonBin<DatabaseSchema>(
                PROJECTS_BIN_ID as string,
                DEFAULT_PROJECTS_DATA,
                options
            );
        } catch (error) {
            console.error('Error fetching projects:', error);
            // Return empty data structure if bin doesn't exist yet
            return DEFAULT_PROJECTS_DATA;
        }
    },

    async update(data: DatabaseSchema, skipFetch?: boolean): Promise<DatabaseSchema> {
        try {
            return await updateJsonBin<DatabaseSchema>(PROJECTS_BIN_ID as string, data, skipFetch);
        } catch (error) {
            if (error instanceof Error && error.message.includes('404')) {
                // Bin doesn't exist, create it
                const binId = await createBinIfNotExists('projects', data);
                console.log(`Created new projects bin with ID: ${binId}`);
                // Now the bin exists, try updating again
                return await updateJsonBin<DatabaseSchema>(binId, data);
            }
            throw error;
        }
    }
};

// Testimonials specific functions
export const testimonialsService = {
    async getAll(options?: FetchOptions): Promise<TestimonialsSchema> {
        try {
            return await fetchFromJsonBin<TestimonialsSchema>(
                TESTIMONIALS_BIN_ID as string,
                DEFAULT_TESTIMONIALS_DATA,
                options
            );
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            // Return empty data structure if bin doesn't exist yet
            return DEFAULT_TESTIMONIALS_DATA;
        }
    },

    async update(data: TestimonialsSchema, skipFetch?: boolean): Promise<TestimonialsSchema> {
        try {
            return await updateJsonBin<TestimonialsSchema>(TESTIMONIALS_BIN_ID as string, data, skipFetch);
        } catch (error) {
            if (error instanceof Error && error.message.includes('404')) {
                // Bin doesn't exist, create it
                const binId = await createBinIfNotExists('testimonials', data);
                console.log(`Created new testimonials bin with ID: ${binId}`);
                // Now the bin exists, try updating again
                return await updateJsonBin<TestimonialsSchema>(binId, data);
            }
            throw error;
        }
    }
};