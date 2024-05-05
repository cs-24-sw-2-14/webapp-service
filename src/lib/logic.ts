import type { CanvasMousePosition } from '$lib/types';
import { canvasView } from '$lib/stores/stateStore';

export function checkHexadecimal(input: string) {
    for (let i = 0; i < input.length; i++) {
        let charCode = input.charCodeAt(i);

        //check if char is between 0 and 9 or A and F
        if (!(charCode >= 48 && charCode <= 57) && !(charCode >= 65 && charCode <= 70)) {
            return false;
        }
    }

    return true;
}

export function mouseToSvgCoordinates(pos: CanvasMousePosition) {
    const canvasView = $canvasView;

    const tx = (pos.x - canvasView.width / 2) / (canvasView.scale / 100) + canvasView.position.x;
    const ty =
      (pos.y - canvasView.height / 2) / (canvasView.scale / 100) + canvasView.position.y;
    return { x: tx, y: ty };
}