import { useEffect, useRef, useState } from 'react';

export type UseDropZoneErrorCode = 'MAX_FILES' | 'MAX_SIZE' | 'MIMETYPES';

/**
 * Return value shape for a DropZone hook or utility.
 *
 * This interface describes the object returned by a hook that provides
 * drag-and-drop and file-selection handling for a drop zone element.
 *
 * Semantics:
 * - `ref` should be attached to a <div> (or other container) that acts as the drop zone.
 * - `files` holds the current accepted files or `null` when none are present.
 * - `isOvered` reflects whether a drag operation is currently over the zone.
 * - `onChange` is a handler to be wired to an `<input type="file">` to reuse validation logic.
 */
export interface UseDropZoneReturn<T extends HTMLElement> {
    /**
     * React ref object to be assigned to the drop zone container element.
     *
     * Attach this ref to the DOM element that should receive drag events
     * (`dragenter`, `dragover`, `dragleave`, `drop`).
     */
    ref: React.RefObject<T | null>;

    /**
     * Array of accepted File objects, or `null` when no files have been selected/dropped.
     */
    files: Array<File> | null;

    /**
     * Boolean flag indicating whether a drag operation is currently over the drop zone.
     *
     * Typical usage:
     * - true  — a file is being dragged over the zone (use to apply visual highlight).
     * - false — no active drag-over (remove highlight).
     *
     * This flag is controlled by (`dragenter`, `dragover`, `dragleave`, `drop`) events
     */
    isOvered: boolean;

    /**
     * Event handler intended for use with an `<input type="file">` element.
     *
     * Responsibilities:
     * - Extract files from `event.target.files`.
     * - Reuse the same validation logic as the drop path (max files, max size, mimetypes).
     * - Update `files` state and/or invoke selection callbacks when validation passes.
     */
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Props for a DropZone component — an area for drag & drop / file uploads.
 *
 * Note: the `UseDropZoneErrorCode` type should be defined separately (for example as a string union or enum).
 */
export interface UseDropZoneProps {
    /**
     * Callback invoked when a validation/acceptance error occurs for files.
     *
     * @param code - error code (UseDropZoneErrorCode). Suggested codes:
     *   - 'MAX_FILES'         — exceeded allowed number of files (maxFiles)
     *   - "MAX_SIZE"          — a file or total size of files exceeds maxSize
     *   - "MIMETYPES"         — unsupported mimetype
     *
     * @param rejectedFiles - a Array<File> containing the items that were rejected.
     */
    onError?: (code: UseDropZoneErrorCode, rejectedFiles: Array<File>) => void;

    /**
     * Required callback — called when files are successfully dropped.
     *
     * @param event - the original DragEvent.
     * @param files - an array of accepted File objects.
     */
    onDrop?: (event: DragEvent, files: Array<File>) => void;

    /**
     * Called when the cursor with files enters the drop zone (`dragenter`).
     * Use for visual highlighting.
     */
    onEnter?: (event: DragEvent) => void;

    /**
     * Called when the cursor with files leaves the drop zone (`dragleave`).
     * Use to remove highlighting.
     */
    onLeave?: (event: DragEvent) => void;

    /**
     * Called on the `dragover` event. Often used to call `event.preventDefault()` to allow dropping.
     */
    onOver?: (event: DragEvent) => void;

    /**
     * Callback invoked when a file is selected from the `<input type="file">`.
     *
     * @param event - the original ChangeEvent.
     * @param files - an array of accepted File objects.
     */
    onSelect?: (event: React.ChangeEvent<HTMLInputElement>, files: Array<File>) => void;

    /**
     * Maximum allowed number of files in one drop. If omitted — no limit is applied.
     * @default 1
     *
     */
    maxFiles?: number;

    /**
     * The maximum file size in bytes.
     * If maxFiles is 1, validation applies to a single file. Otherwise, it applies to the total size of all files.
     * If omitted — no size limit is applied.
     *
     * Example: 5 * 1024 * 1024 = 5MB
     */
    maxSize?: number;

    /**
     * List of allowed mimetypes.
     * If omitted — all mimetypes are accepted.
     */
    mimetypes?: Array<string>;
}

/**
 * React hook for handling drag & drop or file input interactions.
 *
 * This hook simplifies working with file upload areas by providing
 * state management, validation (count, size, mimetypes), and event handling.
 *
 * @typeParam T - The type of the DOM element to attach the drop zone ref to (e.g., HTMLDivElement).
 *
 * @param props - Configuration object for the drop zone (see {@link DropZoneProps}).
 *
 * @returns {UseDropZoneReturn} An object with:
 * - `ref` — React ref to assign to the drop zone element.
 * - `files` — the current array of accepted files (or `null` if none).
 * - `isOvered` — boolean flag indicating whether a drag-over is active.
 * - `onChange` — event handler for `<input type="file">` to reuse validation logic.
 *
 * @example
 * ```tsx
 * const { ref, files, isOvered, onChange } = useDropZone<HTMLDivElement>({
 *   maxFiles: 2,
 *   maxSize: 10 * 1024 * 1024,
 *   mimetypes: ['image/png', 'image/jpeg'],
 *   onDrop: (_, files) => console.log('Dropped files:', files),
 *   onError: (code) => console.error('Validation failed:', code)
 * });
 *
 * return (
 *   <div ref={ref} className={isOvered ? 'highlight' : ''}>
 *     Drop your images here or
 *     <input type="file" multiple onChange={onChange} />
 *   </div>
 * );
 * ```
 */
export const useDropZone = <T extends HTMLElement>({
    maxFiles = 1,
    maxSize,
    mimetypes,
    onDrop,
    onError,
    onEnter,
    onLeave,
    onOver,
    onSelect
}: UseDropZoneProps): UseDropZoneReturn<T> => {
    const [files, setFiles] = useState<Array<File> | null>([]);
    const [isOvered, setIsOvered] = useState(false);

    const ref = useRef<T>(null);

    useEffect(() => {
        if (!ref.current) return;

        const controller = new AbortController();

        const onDragEvent = (event: DragEvent) => {
            event.preventDefault();

            if (!event.dataTransfer) return;

            const files = Array.from(event.dataTransfer.files);

            if (event.type === 'drop') {
                setIsOvered(false);

                if (!isValid(files)) return;

                onDrop?.(event, files);
                setFiles(files);

                return;
            }

            if (event.type === 'dragenter') {
                onEnter?.(event);
                setIsOvered(true);

                return;
            }

            if (event.type === 'dragleave') {
                onLeave?.(event);
                setIsOvered(false);

                return;
            }

            if (event.type === 'dragover') return onOver?.(event);
        };

        ref.current.addEventListener('dragenter', onDragEvent, { signal: controller.signal });
        ref.current.addEventListener('dragleave', onDragEvent, { signal: controller.signal });
        ref.current.addEventListener('dragover', onDragEvent, { signal: controller.signal });
        ref.current.addEventListener('drop', onDragEvent, { signal: controller.signal });

        return () => {
            controller.abort();
        };
    }, []);

    const isValid = (items: Array<File>) => {
        if (items.length > maxFiles) {
            onError?.('MAX_FILES', items);

            return false;
        }

        let size = 0;

        for (const file of items) {
            if (!file) continue;

            size += file.size;

            if (mimetypes?.length && !mimetypes.includes(file.type)) {
                onError?.('MIMETYPES', items);

                return false;
            }
        }

        if (maxSize && size > maxSize) {
            onError?.('MAX_SIZE', items);

            return false;
        }

        return true;
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.length) return;
        
        const files = Array.from(event.target.files);
        
        if (!isValid(files)) return;
        
        onSelect?.(event, files);
        setFiles(files);

        event.target.value = '';
    };

    return {
        ref,
        files,
        isOvered,
        onChange
    };
};