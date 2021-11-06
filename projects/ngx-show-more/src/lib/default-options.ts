import { HeightChangeObservationStrategies } from './height-change-observation-strategies';

/**
 * Default options for the show more component
 * You can change them to customize the default component.
 * Be aware to do this before any NGXShowMoreComponent is initialized.
 */
export let defaultOptions = {
    /**
     * The classes applied to the "Show more"- and "Show less"-buttons
     */
    btnClasses: '',
    /**
     * If the scrollHeight of the content changes, we could want to change wether the "Show more"-button is shown or not
     * Currently there seems to be no way to observe the scrollHeight of the content (https://stackoverflow.com/questions/44428370/detect-scrollheight-change-with-mutationobserver).
     * Therefore you can specify here which strategies you want to use.
     */
    heightChangeObservationStrategies: {
        polling: false,
        resizeObserver: true,
        mutationObserver: true,
    } as HeightChangeObservationStrategies,
    translations: {
        showLess: 'Show less',
        showMore: 'Show more',
    },
};
