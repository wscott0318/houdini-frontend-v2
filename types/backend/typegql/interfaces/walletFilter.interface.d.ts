export interface DBWalletsFilters {
    nickname?: string;
    created?: {
        $gte?: Date;
        $lte?: Date;
    };
    address?: {
        $in: string[];
    };
    roles?: {
        $in?: string[];
        $eq?: any;
    };
}
