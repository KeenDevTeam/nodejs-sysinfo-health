/**
 * Health service interface
 */

interface IHealthService {

    /**
     * Get current health status
     * @param providers List of providers you want to retrieve data from (leave null/undefined to retrieve data from all the available providers)
     */
    status(providers: Array<string> | null): Promise<any>;
}

export default IHealthService;