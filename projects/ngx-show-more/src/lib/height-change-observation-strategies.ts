export interface HeightChangeObservationStrategies {
    /**
     * Observe wether the content dimensions have been resized (e.g. window or an outer container got resized)
     */
    resizeObserver: boolean;
    /**
     * Observe wether the content or its children got mutated (attributes changed, new element added, element removed etc.)
     * Can be non-performant if the content is large
     */
    mutationObserver: boolean;
    /**
     * Check every {{ pollingIntervall }} ms if the scrollHeight of the content has changed
     * {{ pollingIntervall }} is the specified number that must be > 0
     * disabled if the value is false
     */
    polling: false | number;
}
