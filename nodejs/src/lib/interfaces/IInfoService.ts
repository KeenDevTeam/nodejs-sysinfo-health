/**
 * Information service interface
 */

interface IInfoService {

    /**
     * Identical name for the service
     */
    readonly name: string;

    /**
     * Retrieve information
     */
    retrieve(): Promise<any>;
};

export default IInfoService;