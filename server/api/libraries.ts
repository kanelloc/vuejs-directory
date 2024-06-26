import libraries from '../../vuejs-libraries.json';
import { fetchLibs } from '~/utils/fetch-libs';

export default defineEventHandler(async event => {
  try {
    const query = getQuery(event);
    const search = query.search;
    const pageNumber = parseInt(query.pageNumber as string, 10) || 1; // Default to 1 if not provided
    const pageSize = Math.min(parseInt(query.pageSize as string, 10) || 10, 50); // Default to 10, max 50

    // Calculate skip value based on pageNumber and pageSize
    const skip = (pageNumber - 1) * pageSize;

    let filteredLibs = fetchLibs();

    if (search) {
      filteredLibs = filteredLibs.filter(lib => lib.githubUrl.includes(search as string));
    }

    const paginatedLibs = filteredLibs.slice(skip, skip + pageSize);
    return { libraries: paginatedLibs, librariesCount: libraries.length };
  } catch (e) {
    console.error('ERROR in Libs', e);
  }
});
