
// Basic type definitions for gpx-js to allow TypeScript compilation
// This might not be exhaustive but covers common use cases.
declare module 'gpx-js' {
    interface GPXPoint {
        lat?: number;
        lon?: number;
        ele?: number;
        time?: Date;
        fix?: string;
        hdop?: number;
        vdop?: number;
        pdop?: number;
        course?: number;
        speed?: number;
        // Add other properties if needed
    }

    interface GPXTrack {
        name?: string;
        points: GPXPoint[];
        // Add other properties like 'distance', 'elevation' if the library calculates them
    }
    
    interface GPXMetadata {
        name?: string;
        desc?: string;
        author?: string;
        time?: Date;
        // Add other metadata properties
    }

    class GPX {
        constructor(xml: string);
        metadata: GPXMetadata;
        waypoints: GPXPoint[];
        tracks: GPXTrack[];
        routes: any[]; // Define more specifically if routes are used

        // Methods if known (e.g., statistics calculation)
        // calculateDistance(): number; 
    }

    export default GPX;
}
